import { createVirtualWindow } from "./virtual-window";
import { isCompositionKey } from "./composition-key";

export interface VirtualGridOptions {
  rowKeys: readonly string[];
  columnKeys: readonly string[];
  /** 行高与列宽是布局契约；可按稳定键返回不同尺寸。 */
  rowSize?: number | ((key: string, index: number) => number);
  columnSize?: number | ((key: string, index: number) => number);
  height?: number;
  width?: number;
  overscan?: number;
  scrollToRow?: number;
  scrollToColumn?: number;
  label?: string;
  dir?: "ltr" | "rtl";
}
export interface VirtualGridCellDetails {
  readonly rowKey: string;
  readonly columnKey: string;
  readonly rowIndex: number;
  readonly columnIndex: number;
}
const positive = (value: number | undefined, fallback: number) =>
  Number.isFinite(value) && value! > 0 ? value! : fallback;
const size = (
  option: number | ((key: string, index: number) => number) | undefined,
  key: string,
  index: number,
  fallback: number,
) =>
  positive(
    typeof option === "function" ? option(key, index) : option,
    fallback,
  );
export function createVirtualGrid(
  initial: VirtualGridOptions,
  notify: () => void,
) {
  let ready = false,
    props = { ...initial };
  const axis = (
    keys: readonly string[],
    height: number,
    scrollToIndex?: number,
  ) => ({ keys, height, overscan: props.overscan ?? 1, scrollToIndex });
  const rows = createVirtualWindow(
    axis(props.rowKeys, positive(props.height, 320), props.scrollToRow),
    () => {
      if (ready) notify();
    },
  );
  const columns = createVirtualWindow(
    axis(props.columnKeys, positive(props.width, 640), props.scrollToColumn),
    () => {
      if (ready) notify();
    },
  );
  let cursor: Readonly<{
    rowKey: string | undefined;
    columnKey: string | undefined;
  }> = Object.freeze({
    rowKey: rows.state.entries[0]?.key,
    columnKey: columns.state.entries[0]?.key,
  });
  const setCursor = (
    rowKey: string | undefined,
    columnKey: string | undefined,
  ) => {
    if (cursor.rowKey === rowKey && cursor.columnKey === columnKey) return;
    cursor = Object.freeze({ rowKey, columnKey });
    if (ready) notify();
  };
  const sync = (next: VirtualGridOptions) => {
    const previous = props;
    props = { ...next };
    rows.setOptions(
      axis(
        props.rowKeys,
        props.height !== previous.height
          ? positive(props.height, 320)
          : rows.state.height,
        props.scrollToRow,
      ),
    );
    columns.setOptions(
      axis(
        props.columnKeys,
        props.width !== previous.width
          ? positive(props.width, 640)
          : columns.state.height,
        props.scrollToColumn,
      ),
    );
    rows.measure(
      props.rowKeys.map((key, index) => ({
        key,
        size: size(props.rowSize, key, index, 48),
      })),
    );
    columns.measure(
      props.columnKeys.map((key, index) => ({
        key,
        size: size(props.columnSize, key, index, 160),
      })),
    );
    setCursor(
      props.rowKeys.includes(cursor.rowKey!)
        ? cursor.rowKey
        : rows.state.entries[0]?.key,
      props.columnKeys.includes(cursor.columnKey!)
        ? cursor.columnKey
        : columns.state.entries[0]?.key,
    );
  };
  sync(initial);
  if (props.scrollToRow !== undefined) rows.scrollToIndex(props.scrollToRow);
  if (props.scrollToColumn !== undefined)
    columns.scrollToIndex(props.scrollToColumn);
  setCursor(rows.state.entries[0]?.key, columns.state.entries[0]?.key);
  ready = true;
  return {
    get cursor() {
      return cursor;
    },
    setCursor,
    rows,
    columns,
    sync,
    get options() {
      return props;
    },
    dispose() {
      rows.dispose();
      columns.dispose();
    },
  };
}

export interface VirtualMasonryOptions {
  keys: readonly string[];
  height?: number;
  /** SSR 初始宽度；挂载后采用滚动区域实际宽度。 */
  width?: number;
  minColumnWidth?: number;
  maxColumns?: number;
  /** 列与项目间距，单位 px；默认 16。 */
  gap?: number;
  estimateSize?: number | ((key: string, index: number) => number);
  /** 可视区域外额外保留的像素距离。 */
  overscan?: number;
  scrollToIndex?: number;
  label?: string;
  dir?: "ltr" | "rtl";
}
export interface VirtualMasonryEntry {
  readonly key: string;
  readonly index: number;
  readonly top: number;
  readonly inlineStart: number;
  readonly width: number;
  readonly height: number;
  readonly column: number;
}
export interface VirtualMasonryState {
  entries: VirtualMasonryEntry[];
  offset: number;
  height: number;
  width: number;
  columnWidth: number;
  columns: number;
  total: number;
  count: number;
}
/** 最短列放置、按列二分查找可见项；滚动不扫描或生成完整 DOM。 */
export function createVirtualMasonry(
  initial: VirtualMasonryOptions,
  notify: () => void,
) {
  let props = { ...initial },
    width = positive(initial.width, 640),
    height = positive(initial.height, 320),
    offset = 0,
    focused: string | undefined;
  let byKey = new Map<string, VirtualMasonryEntry>();
  let all: VirtualMasonryEntry[] = [],
    lanes: VirtualMasonryEntry[][] = [],
    state: VirtualMasonryState;
  const measurements = new Map<string, number>(),
    listeners = new Set<() => void>();
  let columns = 1,
    columnWidth = width,
    total = 0;
  const geometry = () => {
    if (
      props.keys.some((key) => !key) ||
      new Set(props.keys).size !== props.keys.length
    )
      throw Error("Virtual masonry requires unique non-empty keys");
    const gap = Math.max(0, Number.isFinite(props.gap) ? props.gap! : 16);
    columns = Math.max(
      1,
      Math.min(
        Math.floor(positive(props.maxColumns, 20)),
        Math.floor((width + gap) / (positive(props.minColumnWidth, 220) + gap)),
      ),
    );
    columnWidth = Math.max(1, (width - gap * (columns - 1)) / columns);
    const available = new Set(props.keys);
    for (const key of measurements.keys())
      if (!available.has(key)) measurements.delete(key);
    lanes = Array.from({ length: columns }, () => []);
    const bottoms = Array(columns).fill(0) as number[];
    all = props.keys.map((key, index) => {
      let column = 0;
      for (let c = 1; c < columns; c++)
        if (bottoms[c] < bottoms[column]) column = c;
      const entry = Object.freeze({
        key,
        index,
        column,
        top: bottoms[column],
        inlineStart: column * (columnWidth + gap),
        width: columnWidth,
        height:
          measurements.get(key) ?? size(props.estimateSize, key, index, 180),
      });
      bottoms[column] += entry.height + gap;
      lanes[column].push(entry);
      return entry;
    });
    byKey = new Map(all.map((entry) => [entry.key, entry]));
    total = Math.max(0, ...bottoms.map((v) => (v ? v - gap : 0)));
  };
  const calculate = () => {
    offset = Math.max(
      0,
      Math.min(
        Number.isFinite(offset) ? offset : 0,
        Math.max(0, total - height),
      ),
    );
    const overscan = Math.max(
        0,
        Number.isFinite(props.overscan) ? props.overscan! : 200,
      ),
      entries = new Map<number, VirtualMasonryEntry>();
    for (const lane of lanes) {
      let low = 0,
        high = lane.length;
      while (low < high) {
        const middle = (low + high) >>> 1;
        if (lane[middle].top + lane[middle].height < offset - overscan)
          low = middle + 1;
        else high = middle;
      }
      for (
        let index = low;
        index < lane.length && lane[index].top <= offset + height + overscan;
        index++
      )
        entries.set(lane[index].index, lane[index]);
    }
    const pinned = focused ? byKey.get(focused) : undefined;
    if (pinned) entries.set(pinned.index, pinned);
    return {
      entries: [...entries.values()].sort((a, b) => a.index - b.index),
      offset,
      height,
      width,
      columnWidth,
      columns,
      total,
      count: all.length,
    };
  };
  const emit = () => {
    const next = calculate();
    if (JSON.stringify(next) === JSON.stringify(state)) return;
    state = next;
    notify();
    for (const fn of listeners) fn();
  };
  const anchor = () => {
    const entry = (state?.entries ?? all)
      .filter((entry) => entry.top + entry.height > offset)
      .sort((a, b) => a.top - b.top || a.index - b.index)[0];
    return {
      key: entry?.key,
      inset: offset - (entry?.top ?? 0),
      index: entry?.index ?? 0,
    };
  };
  const restore = (old: ReturnType<typeof anchor>) => {
    const entry =
      (old.key ? byKey.get(old.key) : undefined) ??
      all[Math.min(old.index, all.length - 1)];
    offset = (entry?.top ?? 0) + old.inset;
  };
  geometry();
  if (initial.scrollToIndex !== undefined)
    offset =
      all[
        Math.max(0, Math.min(all.length - 1, Math.floor(initial.scrollToIndex)))
      ]?.top ?? 0;
  state = calculate();
  return {
    get state() {
      return state;
    },
    subscribe(fn: () => void) {
      listeners.add(fn);
      return () => {
        listeners.delete(fn);
      };
    },
    setOptions(next: VirtualMasonryOptions) {
      const old = anchor(),
        command = next.scrollToIndex !== props.scrollToIndex;
      if (next.height !== props.height) height = positive(next.height, 320);
      props = { ...next };
      geometry();
      restore(old);
      if (command && next.scrollToIndex !== undefined)
        offset =
          all[
            Math.max(
              0,
              Math.min(all.length - 1, Math.floor(next.scrollToIndex)),
            )
          ]?.top ?? 0;
      emit();
    },
    setViewport(nextOffset: number, nextWidth = width, nextHeight = height) {
      const resized = Math.abs(nextWidth - width) > 0.5;
      height = positive(nextHeight, height);
      if (resized) {
        const old = anchor();
        width = positive(nextWidth, width);
        measurements.clear();
        geometry();
        restore(old);
      } else offset = nextOffset;
      emit();
    },
    measure(entries: readonly { key: string; height: number }[]) {
      const old = anchor(),
        available = new Set(props.keys);
      let changed = false;
      for (const entry of entries)
        if (
          available.has(entry.key) &&
          Number.isFinite(entry.height) &&
          entry.height > 0 &&
          Math.abs(
            (measurements.get(entry.key) ??
              byKey.get(entry.key)?.height ??
              180) - entry.height,
          ) > 0.5
        ) {
          measurements.set(entry.key, entry.height);
          changed = true;
        }
      if (changed) {
        geometry();
        restore(old);
        emit();
      }
    },
    focus(key?: string) {
      if (key === focused) return;
      focused = key;
      emit();
    },
    scrollToIndex(index: number) {
      offset =
        all[Math.max(0, Math.min(all.length - 1, Math.floor(index)))]?.top ?? 0;
      emit();
    },
    dispose() {
      listeners.clear();
      measurements.clear();
      focused = undefined;
    },
  };
}

/** 只管理定位、键盘和观察器；可见内容由各框架原生渲染。 */
export function mountVirtualGrid(
  root: HTMLElement,
  model: ReturnType<typeof createVirtualGrid>,
) {
  const win = root.ownerDocument.defaultView!;
  let activeRow = model.rows.state.entries[0]?.key,
    activeColumn = model.columns.state.entries[0]?.key,
    pending = false,
    interacting = false,
    enterRequested = false;
  const nativeControls = new Map<HTMLElement, string | null>();
  let ownedFocus: { node: Element; row: string; column: string } | undefined;
  const controls = (cell: HTMLElement) =>
    Array.from(
      cell.querySelectorAll<HTMLElement>(
        'input,textarea,select,button,a[href],[contenteditable="true"]',
      ),
    ).filter((node) => {
      // 自定义复合控件负责自己的内部游标，不能改写其子控件的键盘契约。
      const composite = node.closest(
        '[role="grid"],[role="tree"],[role="listbox"],[role="menu"]',
      );
      return !composite || composite === root;
    });
  const restoreNative = (node: HTMLElement, original: string | null) => {
    if (original === null) node.removeAttribute("tabindex");
    else node.setAttribute("tabindex", original);
  };
  const editable = (cell: HTMLElement) =>
    controls(cell).find(
      (node) =>
        nativeControls.has(node) &&
        !node.matches(":disabled,[hidden]") &&
        node.getClientRects().length,
    );
  const cells = () =>
    Array.from(
      root.querySelectorAll<HTMLElement>(
        ':scope > [data-part="canvas"] > [data-part="row"] > [data-part="cell"]',
      ),
    );
  const restore = () => {
    const actual = root.ownerDocument.activeElement;
    if (
      ownedFocus &&
      !ownedFocus.node.isConnected &&
      (!actual ||
        actual === root.ownerDocument.body ||
        actual === root.ownerDocument.documentElement)
    ) {
      enterRequested =
        interacting &&
        model.options.rowKeys.includes(ownedFocus.row) &&
        model.options.columnKeys.includes(ownedFocus.column);
      interacting = false;
      pending = true;
      ownedFocus = undefined;
    }
    if (!model.options.rowKeys.includes(activeRow))
      activeRow = model.rows.state.entries[0]?.key;
    if (!model.options.columnKeys.includes(activeColumn))
      activeColumn = model.columns.state.entries[0]?.key;
    model.setCursor(activeRow, activeColumn);
    for (const [node, original] of nativeControls) {
      if (!root.contains(node)) {
        restoreNative(node, original);
        nativeControls.delete(node);
      }
    }
    for (const cell of cells()) {
      const active =
        cell.dataset.rowKey === activeRow &&
        cell.dataset.columnKey === activeColumn;
      cell.tabIndex = active && !interacting ? 0 : -1;
      for (const node of controls(cell)) {
        if (!nativeControls.has(node)) {
          const original = node.getAttribute("tabindex");
          if (original !== null && Number(original) < 0) continue;
          nativeControls.set(node, original);
        }
        if (active && interacting)
          restoreNative(node, nativeControls.get(node)!);
        else node.tabIndex = -1;
      }
    }
    if (pending) {
      const target = cells().find((cell) => cell.tabIndex === 0);
      if (target) {
        pending = false;
        const field = enterRequested ? editable(target) : undefined;
        enterRequested = false;
        if (field) {
          interacting = true;
          restore();
        }
        (field ?? target).focus({ preventScroll: true });
      }
    }
  };
  const keydown = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement;
    if (isCompositionKey(event) || event.defaultPrevented) return;
    const owner = cells().find((cell) => cell.contains(target));
    if (
      pending &&
      enterRequested &&
      owner === target &&
      event.key === "Escape"
    ) {
      event.preventDefault();
      enterRequested = false;
      return;
    }
    if (
      interacting &&
      owner &&
      nativeControls.has(target) &&
      ["Escape", "F2"].includes(event.key)
    ) {
      event.preventDefault();
      interacting = false;
      owner.focus({ preventScroll: true });
      return;
    }
    if (
      owner === target &&
      ["Enter", "F2"].includes(event.key) &&
      !event.altKey &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.shiftKey
    ) {
      if (pending) {
        event.preventDefault();
        enterRequested = true;
        schedule();
        return;
      }
      const field = editable(owner);
      if (field) {
        event.preventDefault();
        interacting = true;
        restore();
        field.focus({ preventScroll: true });
      }
      return;
    }
    if (
      target.dataset.part !== "cell" ||
      !cells().includes(target) ||
      event.altKey ||
      (event.metaKey && !["Home", "End"].includes(event.key))
    )
      return;
    const props = model.options,
      // 目标尚未渲染或聚焦时，从已请求位置累计，而不是反复消费旧 DOM 游标。
      row = props.rowKeys.indexOf(pending ? activeRow : target.dataset.rowKey!),
      column = props.columnKeys.indexOf(
        pending ? activeColumn : target.dataset.columnKey!,
      );
    let nextRow = row,
      nextColumn = column;
    const rtl = win.getComputedStyle(root).direction === "rtl";
    switch (event.key) {
      case "ArrowDown":
        nextRow++;
        break;
      case "ArrowUp":
        nextRow--;
        break;
      case "ArrowRight":
        nextColumn += rtl ? -1 : 1;
        break;
      case "ArrowLeft":
        nextColumn += rtl ? 1 : -1;
        break;
      case "Home":
        nextColumn = 0;
        if (event.ctrlKey || event.metaKey) nextRow = 0;
        break;
      case "End":
        nextColumn = props.columnKeys.length - 1;
        if (event.ctrlKey || event.metaKey) nextRow = props.rowKeys.length - 1;
        break;
      case "PageDown":
        nextRow += Math.max(
          1,
          model.rows.state.end - model.rows.state.start - 2,
        );
        break;
      case "PageUp":
        nextRow -= Math.max(
          1,
          model.rows.state.end - model.rows.state.start - 2,
        );
        break;
      default:
        return;
    }
    event.preventDefault();
    nextRow = Math.max(0, Math.min(props.rowKeys.length - 1, nextRow));
    nextColumn = Math.max(0, Math.min(props.columnKeys.length - 1, nextColumn));
    activeRow = props.rowKeys[nextRow];
    activeColumn = props.columnKeys[nextColumn];
    pending = true;
    enterRequested = false;
    model.setCursor(activeRow, activeColumn);
    // 继续保留当前实际聚焦单元格，直到新游标接管焦点；否则跨窗口时节点
    // 被移除，后续可信按键落到 body，连按序列会在窗口边缘提前结束。
    const reveal = (axis: typeof model.rows, index: number) => {
      const entry = axis.state.entries.find((item) => item.index === index);
      if (!entry || entry.offset < axis.state.offset) axis.scrollToIndex(index);
      else if (
        entry.offset + entry.size >
        axis.state.offset + axis.state.height
      )
        axis.scrollToIndex(index, "end");
    };
    reveal(model.rows, nextRow);
    reveal(model.columns, nextColumn);
    schedule();
  };
  const focus = () => {
    const target = root.ownerDocument.activeElement;
    const cell =
      target instanceof win.Element && root.contains(target)
        ? (cells().find((cell) => cell.contains(target)) ?? null)
        : null;
    if (cell) {
      pending = false;
      enterRequested = false;
      interacting =
        target !== cell &&
        target instanceof win.HTMLElement &&
        (nativeControls.has(target) ||
          (controls(cell).includes(target) && target.tabIndex >= 0));
      ownedFocus = {
        node: target!,
        row: cell.dataset.rowKey!,
        column: cell.dataset.columnKey!,
      };
      activeRow = cell.dataset.rowKey!;
      activeColumn = cell.dataset.columnKey!;
      model.setCursor(activeRow, activeColumn);
      model.rows.focus(activeRow);
      model.columns.focus(activeColumn);
      restore();
    }
  };
  const external = (event: Event) => {
    if (
      event.target instanceof win.Node &&
      !root.contains(event.target) &&
      event.target !== root.ownerDocument.body
    ) {
      pending = false;
      interacting = false;
      enterRequested = false;
      ownedFocus = undefined;
      restore();
      model.rows.focus(activeRow);
      model.columns.focus(activeColumn);
    }
  };
  let frame = 0,
    initialized = false,
    userScroll = false,
    modelMoved = false,
    syncing = false,
    lastTop = model.rows.state.offset,
    lastLeft = model.columns.state.offset,
    lastDirection = win.getComputedStyle(root).direction;
  const schedule = () => {
    if (!frame) frame = win.requestAnimationFrame(sync);
  };
  const sync = () => {
    frame = 0;
    if (!root.isConnected) return;
    const direction = win.getComputedStyle(root).direction,
      rtl = direction === "rtl";
    if (direction !== lastDirection) userScroll = false;
    lastDirection = direction;
    syncing = true;
    model.rows.setViewport(
      initialized && userScroll && !modelMoved
        ? root.scrollTop
        : model.rows.state.offset,
      root.clientHeight,
    );
    model.columns.setViewport(
      initialized && userScroll && !modelMoved
        ? rtl
          ? -root.scrollLeft
          : root.scrollLeft
        : model.columns.state.offset,
      root.clientWidth,
    );
    syncing = false;
    initialized = true;
    userScroll = false;
    if (Math.abs(root.scrollTop - model.rows.state.offset) > 0.5)
      root.scrollTop = model.rows.state.offset;
    if (
      Math.abs(
        (rtl ? -root.scrollLeft : root.scrollLeft) - model.columns.state.offset,
      ) > 0.5
    )
      root.scrollLeft = rtl
        ? -model.columns.state.offset
        : model.columns.state.offset;
    modelMoved =
      Math.abs(root.scrollTop - model.rows.state.offset) > 0.5 ||
      Math.abs(
        (rtl ? -root.scrollLeft : root.scrollLeft) - model.columns.state.offset,
      ) > 0.5;
    if (modelMoved) schedule();
    restore();
  };
  const changed = () => {
    if (
      !syncing &&
      (lastTop !== model.rows.state.offset ||
        lastLeft !== model.columns.state.offset)
    ) {
      userScroll = false;
      modelMoved = true;
    }
    lastTop = model.rows.state.offset;
    lastLeft = model.columns.state.offset;
    schedule();
  };
  const stops = [
    model.rows.subscribe(changed),
    model.columns.subscribe(changed),
  ];
  const resize = new win.ResizeObserver(schedule);
  resize.observe(root);
  const mutation = new win.MutationObserver(schedule);
  mutation.observe(root, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["dir"],
  });
  const scroll = () => {
    if (!modelMoved) userScroll = true;
    schedule();
  };
  root.addEventListener("scroll", scroll, { passive: true });
  root.addEventListener("keydown", keydown);
  root.addEventListener("focusin", focus);
  root.ownerDocument.addEventListener("focusin", external, true);
  root.ownerDocument.addEventListener("pointerdown", external, true);
  restore();
  schedule();
  return () => {
    win.cancelAnimationFrame(frame);
    resize.disconnect();
    mutation.disconnect();
    stops.forEach((stop) => stop());
    root.removeEventListener("scroll", scroll);
    root.removeEventListener("keydown", keydown);
    root.removeEventListener("focusin", focus);
    root.ownerDocument.removeEventListener("focusin", external, true);
    root.ownerDocument.removeEventListener("pointerdown", external, true);
    for (const [node, original] of nativeControls)
      restoreNative(node, original);
    nativeControls.clear();
    ownedFocus = undefined;
    model.dispose();
  };
}
export function mountVirtualMasonry(
  root: HTMLElement,
  model: ReturnType<typeof createVirtualMasonry>,
) {
  const win = root.ownerDocument.defaultView!;
  let frame = 0,
    initialized = false,
    userScroll = false,
    modelMoved = false,
    syncing = false,
    lastOffset = model.state.offset;
  const observed = new Set<HTMLElement>();
  const schedule = () => {
    if (!frame) frame = win.requestAnimationFrame(sync);
  };
  const sync = () => {
    frame = 0;
    if (!root.isConnected) return;
    syncing = true;
    model.setViewport(
      initialized && userScroll && !modelMoved
        ? root.scrollTop
        : model.state.offset,
      root.clientWidth,
      root.clientHeight,
    );
    syncing = false;
    initialized = true;
    userScroll = false;
    const items = Array.from(
      root.querySelectorAll<HTMLElement>(
        ':scope > [data-part="canvas"] > [data-part="item"][data-virtual-key]',
      ),
    );
    for (const item of observed)
      if (!items.includes(item)) {
        resize.unobserve(item);
        observed.delete(item);
      }
    for (const item of items)
      if (!observed.has(item)) {
        resize.observe(item);
        observed.add(item);
      }
    syncing = true;
    model.measure(
      items.map((item) => ({
        key: item.dataset.virtualKey!,
        height: item.getBoundingClientRect().height,
      })),
    );
    syncing = false;
    if (Math.abs(root.scrollTop - model.state.offset) > 0.5)
      root.scrollTop = model.state.offset;
    modelMoved = Math.abs(root.scrollTop - model.state.offset) > 0.5;
    if (modelMoved) schedule();
  };
  const resize = new win.ResizeObserver(schedule);
  resize.observe(root);
  const mutation = new win.MutationObserver(schedule);
  mutation.observe(root, {
    childList: true,
    subtree: true,
    characterData: true,
  });
  const stop = model.subscribe(() => {
    if (!syncing && lastOffset !== model.state.offset) {
      userScroll = false;
      modelMoved = true;
    }
    lastOffset = model.state.offset;
    schedule();
  });
  const scroll = () => {
    if (!modelMoved) userScroll = true;
    schedule();
  };
  const focus = () => {
    const active = root.ownerDocument.activeElement;
    model.focus(
      active instanceof win.Element && root.contains(active)
        ? Array.from(
            root.querySelectorAll<HTMLElement>(
              ':scope > [data-part="canvas"] > [data-part="item"][data-virtual-key]',
            ),
          ).find((item) => item.contains(active))?.dataset.virtualKey
        : undefined,
    );
  };
  const external = (event: Event) => {
    if (
      event.target instanceof win.Node &&
      !root.contains(event.target) &&
      event.target !== root.ownerDocument.body
    )
      model.focus(undefined);
  };
  root.addEventListener("scroll", scroll, { passive: true });
  root.addEventListener("focusin", focus);
  root.ownerDocument.addEventListener("focusin", external, true);
  root.ownerDocument.addEventListener("pointerdown", external, true);
  schedule();
  return () => {
    win.cancelAnimationFrame(frame);
    stop();
    resize.disconnect();
    mutation.disconnect();
    observed.clear();
    root.removeEventListener("scroll", scroll);
    root.removeEventListener("focusin", focus);
    root.ownerDocument.removeEventListener("focusin", external, true);
    root.ownerDocument.removeEventListener("pointerdown", external, true);
    model.dispose();
  };
}
