export interface VirtualizationOptions {
  /** 可视滚动高度与估算行高，单位 px；测量后按真实高度修正。 */
  height: number;
  estimateSize?: number;
  overscan?: number;
  initialOffset?: number;
  scrollToIndex?: number;
}
export interface VirtualWindowOptions extends VirtualizationOptions {
  keys: readonly string[];
  followEnd?: boolean;
  contextKey?: string;
}
export interface VirtualWindowEntry {
  key: string;
  index: number;
  offset: number;
  size: number;
  gap: number;
}
export interface VirtualWindowState {
  entries: VirtualWindowEntry[];
  after: number;
  total: number;
  count: number;
  offset: number;
  height: number;
  start: number;
  end: number;
  atBottom: boolean;
}
const positive = (value: number | undefined, fallback: number) =>
  value !== undefined && Number.isFinite(value) && value > 0 ? value : fallback;
export const virtualViewportHeight = (options?: VirtualizationOptions) =>
  positive(options?.height, 320);
export interface VirtualRenderDetails {
  readonly key: string;
  readonly index: number;
}
/** 可变高度共享窗口，不访问 DOM；同一键保持测量和阅读锚点。 */
export function createVirtualWindow(
  initial: VirtualWindowOptions,
  notify: (state: VirtualWindowState) => void,
) {
  let options = { ...initial, keys: [...initial.keys] },
    offset = Math.max(
      0,
      Number.isFinite(initial.initialOffset) ? initial.initialOffset! : 0,
    ),
    height = positive(initial.height, 320),
    focusKey: string | undefined;
  const measured = new Map<string, number>(),
    listeners = new Set<() => void>();
  let positions: number[] = [],
    sizes: number[] = [],
    state: VirtualWindowState;
  const geometry = () => {
    if (
      options.keys.some((key) => !key) ||
      new Set(options.keys).size !== options.keys.length
    )
      throw Error("Virtualization requires unique non-empty keys");
    const available = new Set(options.keys);
    for (const key of measured.keys())
      if (!available.has(key)) measured.delete(key);
    positions = [0];
    sizes = options.keys.map(
      (key) => measured.get(key) ?? positive(options.estimateSize, 48),
    );
    for (const size of sizes)
      positions.push(positions[positions.length - 1]! + size);
  };
  const locate = (value: number) => {
    let low = 0,
      high = sizes.length;
    while (low < high) {
      const middle = (low + high) >>> 1;
      if (positions[middle + 1] <= value) low = middle + 1;
      else high = middle;
    }
    return Math.min(low, Math.max(0, sizes.length - 1));
  };
  const calculate = () => {
    const total = positions[positions.length - 1] ?? 0,
      count = sizes.length;
    offset = Math.max(
      0,
      Math.min(
        Number.isFinite(offset) ? offset : 0,
        Math.max(0, total - height),
      ),
    );
    const overscan = Math.min(
      50,
      Math.max(
        0,
        Math.floor(Number.isFinite(options.overscan) ? options.overscan! : 3),
      ),
    );
    const start = count ? Math.max(0, locate(offset) - overscan) : 0,
      end = count ? Math.min(count, locate(offset + height) + overscan + 1) : 0;
    const indexes = new Set(
      Array.from({ length: end - start }, (_, index) => start + index),
    );
    const focused =
      focusKey === undefined ? -1 : options.keys.indexOf(focusKey);
    if (focused >= 0) indexes.add(focused);
    let previous = 0;
    const entries = [...indexes]
      .sort((a, b) => a - b)
      .map((index) => {
        const entry = {
          key: options.keys[index],
          index,
          offset: positions[index],
          size: sizes[index],
          gap: Math.max(0, positions[index] - previous),
        };
        previous = positions[index + 1];
        return entry;
      });
    return {
      entries,
      after: Math.max(0, total - previous),
      total,
      count,
      offset,
      height,
      start,
      end,
      atBottom: total - height - offset <= 4,
    };
  };
  const emit = () => {
    const next = calculate();
    if (JSON.stringify(next) === JSON.stringify(state)) return;
    state = next;
    notify(state);
    for (const listener of listeners) listener();
  };
  const anchor = () => {
    const index = locate(offset);
    return {
      key: options.keys[index],
      nextKey: options.keys[index + 1],
      previousKey: options.keys[index - 1],
      inset: offset - positions[index],
      atBottom: state.atBottom,
    };
  };
  const restore = (reading: ReturnType<typeof anchor>) => {
    const index = options.keys.indexOf(reading.key);
    if (options.followEnd && reading.atBottom)
      offset = Math.max(0, positions[positions.length - 1]! - height);
    else if (index >= 0) offset = positions[index] + reading.inset;
    else {
      const next = options.keys.indexOf(reading.nextKey),
        previous = options.keys.indexOf(reading.previousKey);
      offset =
        next >= 0 ? positions[next] : previous >= 0 ? positions[previous] : 0;
    }
  };
  geometry();
  if (initial.followEnd && initial.initialOffset === undefined)
    offset = positions[positions.length - 1]! - height;
  if (initial.scrollToIndex !== undefined)
    offset =
      positions[
        Math.max(
          0,
          Math.min(sizes.length - 1, Math.floor(initial.scrollToIndex)),
        )
      ] ?? 0;
  state = calculate();
  return {
    get state() {
      return state;
    },
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    setOptions(next: VirtualWindowOptions) {
      const reading = anchor(),
        command = next.scrollToIndex !== options.scrollToIndex,
        reset = next.contextKey !== options.contextKey,
        resized = next.height !== options.height;
      options = { ...next, keys: [...next.keys] };
      if (resized) height = positive(next.height, 320);
      geometry();
      restore(reading);
      if (reset) offset = 0;
      if (command && next.scrollToIndex !== undefined)
        offset =
          positions[
            Math.max(
              0,
              Math.min(sizes.length - 1, Math.floor(next.scrollToIndex)),
            )
          ] ?? 0;
      emit();
    },
    setViewport(nextOffset: number, nextHeight = height) {
      offset = nextOffset;
      height = positive(nextHeight, height);
      emit();
    },
    measure(entries: readonly { key: string; size: number }[]) {
      const reading = anchor();
      let changed = false;
      for (const entry of entries)
        if (
          options.keys.includes(entry.key) &&
          Number.isFinite(entry.size) &&
          entry.size > 0 &&
          Math.abs(
            (measured.get(entry.key) ?? positive(options.estimateSize, 48)) -
              entry.size,
          ) > 0.5
        ) {
          measured.set(entry.key, entry.size);
          changed = true;
        }
      if (changed) {
        geometry();
        restore(reading);
        emit();
      }
    },
    focus(key?: string) {
      if (key === focusKey) return;
      focusKey = key;
      emit();
    },
    scrollToIndex(index: number, align: "start" | "end" = "start") {
      const target = Math.max(0, Math.min(sizes.length - 1, Math.floor(index)));
      offset =
        align === "end" ? positions[target + 1] - height : positions[target];
      emit();
    },
    dispose() {
      listeners.clear();
      measured.clear();
      focusKey = undefined;
    },
  };
}
/** 渲染属于适配层；本函数只测量可见行并管理滚动、焦点和观察器。 */
export function mountVirtualWindow(
  viewport: HTMLElement,
  model: ReturnType<typeof createVirtualWindow>,
  content: () => HTMLElement | null,
  inset: () => number = () => 0,
) {
  const win = viewport.ownerDocument.defaultView;
  if (!win) return () => {};
  const previous = viewport.style.overflowAnchor;
  viewport.style.overflowAnchor = "none";
  let disposed = false,
    frame = 0,
    userScroll = false;
  const observed = new Set<HTMLElement>();
  const schedule = () => {
    if (frame || disposed) return;
    frame = win.requestAnimationFrame(() => {
      frame = 0;
      sync();
      restoreMovedFocus();
    });
  };
  const measure = () => {
    const rows = Array.from(
      content()?.querySelectorAll<HTMLElement>("[data-virtual-key]") ?? [],
    );
    for (const element of observed)
      if (!rows.includes(element)) {
        resize?.unobserve(element);
        observed.delete(element);
      }
    for (const row of rows)
      if (!observed.has(row)) {
        resize?.observe(row);
        observed.add(row);
      }
    model.measure(
      rows.map((row) => ({
        key: row.dataset.virtualKey!,
        size: row.getBoundingClientRect().height,
      })),
    );
  };
  const sync = () => {
    if (disposed || !viewport.isConnected) return;
    if (userScroll) {
      userScroll = false;
      model.setViewport(
        Math.max(0, viewport.scrollTop),
        Math.max(1, viewport.clientHeight - inset()),
      );
    }
    model.setViewport(
      model.state.offset,
      Math.max(1, viewport.clientHeight - inset()),
    );
    measure();
    const desired = model.state.offset;
    if (Math.abs(viewport.scrollTop - desired) > 0.5)
      viewport.scrollTop = desired;
  };
  const resize =
    typeof win.ResizeObserver === "function"
      ? new win.ResizeObserver(schedule)
      : undefined;
  resize?.observe(viewport);
  let focusedNode: HTMLElement | undefined;
  let movedFocusedNode = false;
  const inspectMutations = (records: MutationRecord[]) => {
    if (
      focusedNode &&
      records.some((record) =>
        Array.from(record.removedNodes).some(
          (node) => node === focusedNode || node.contains(focusedNode!),
        ),
      )
    )
      movedFocusedNode = true;
  };
  const mutation = new win.MutationObserver((records) => {
    inspectMutations(records);
    schedule();
  });
  const target = content();
  if (target)
    mutation.observe(target, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  const stop = model.subscribe(schedule);
  const scroll = () => {
    userScroll = true;
    schedule();
  };
  const focus = () => {
    movedFocusedNode = false;
    const active = viewport.ownerDocument.activeElement;
    focusedNode =
      active instanceof win.HTMLElement && viewport.contains(active)
        ? active
        : undefined;
    model.focus(
      active instanceof win.Element && viewport.contains(active)
        ? active.closest<HTMLElement>("[data-virtual-key]")?.dataset.virtualKey
        : undefined,
    );
  };
  const restoreMovedFocus = () => {
    inspectMutations(mutation.takeRecords());
    if (
      movedFocusedNode &&
      focusedNode?.isConnected &&
      viewport.contains(focusedNode) &&
      viewport.ownerDocument.activeElement === viewport.ownerDocument.body
    )
      focusedNode.focus({ preventScroll: true });
  };
  const blur = (event: FocusEvent) => {
    if (
      event.relatedTarget &&
      event.relatedTarget !== viewport.ownerDocument.body
    ) {
      focus();
      return;
    }
    const previousFocus = focusedNode;
    queueMicrotask(() => {
      if (disposed) return;
      inspectMutations(mutation.takeRecords());
      schedule();
      // 保留移动中的焦点意图，后续框架提交/RAF 才可能重新插入节点。
      if (movedFocusedNode && previousFocus === focusedNode)
        restoreMovedFocus();
      else focus();
    });
  };
  const pointer = (event: Event) => {
    if (
      event.target instanceof win.Element &&
      !viewport.contains(event.target)
    ) {
      focusedNode = undefined;
      movedFocusedNode = false;
      model.focus(undefined);
    }
  };
  const externalFocus = (event: Event) => {
    if (event.target !== viewport.ownerDocument.body) pointer(event);
  };
  viewport.addEventListener("scroll", scroll, { passive: true });
  viewport.addEventListener("focusin", focus);
  viewport.addEventListener("focusout", blur);
  viewport.ownerDocument.addEventListener("pointerdown", pointer, true);
  viewport.ownerDocument.addEventListener("focusin", externalFocus, true);
  schedule();
  return () => {
    disposed = true;
    stop();
    win.cancelAnimationFrame(frame);
    mutation.disconnect();
    resize?.disconnect();
    observed.clear();
    viewport.removeEventListener("scroll", scroll);
    viewport.removeEventListener("focusin", focus);
    viewport.removeEventListener("focusout", blur);
    viewport.ownerDocument.removeEventListener("pointerdown", pointer, true);
    viewport.ownerDocument.removeEventListener("focusin", externalFocus, true);
    focusedNode = undefined;
    if (viewport.style.overflowAnchor === "none")
      viewport.style.overflowAnchor = previous;
    model.dispose();
  };
}
