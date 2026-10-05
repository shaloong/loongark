import type { DataColumn } from "./data-models";
import { GripVertical, MoveHorizontal } from "lucide";
import type { IconNode } from "lucide";

export interface DataColumnGeometry {
  /** 列内容的最小/最大像素宽度；默认 80/1200，不改变主题控件尺寸。 */
  minWidth?: number;
  maxWidth?: number;
}
export interface DataTableColumnLabels {
  moveColumn: (column: string) => string;
  resizeColumn: (column: string) => string;
  moveColumnHint: string;
  resizeColumnHint: string;
  columnMoved: (column: string, position: number, count: number) => string;
  columnResized: (column: string, width: number) => string;
  columnMoveState: (
    column: string,
    state: "started" | "finished" | "cancelled",
  ) => string;
}
export interface DataTableColumnOptions {
  columns: readonly DataColumn[];
  columnKeys?: readonly string[];
  pinnedColumns?: { start?: readonly string[]; end?: readonly string[] };
  columnWidths?: Readonly<Record<string, number>>;
  columnReorderable?: boolean;
  columnResizable?: boolean;
  loading?: boolean;
  labels?: Partial<DataTableColumnLabels>;
}
export const dataColumnBounds = (column: DataColumnGeometry) => {
  const positive = (value: number | undefined, fallback: number) =>
    value !== undefined && Number.isFinite(value) && value > 0
      ? Math.max(1, Math.min(100000, Math.round(value)))
      : fallback;
  const min = Math.max(1, positive(column.minWidth, 80));
  return { min, max: Math.max(min, positive(column.maxWidth, 1200)) };
};
export const dataColumnWidth = (
  column: DataColumn,
  widths?: Readonly<Record<string, number>>,
) => {
  const { min, max } = dataColumnBounds(column);
  const requested =
    widths && Object.prototype.hasOwnProperty.call(widths, column.key)
      ? widths[column.key]
      : undefined;
  return Math.min(
    max,
    Math.max(
      min,
      requested !== undefined && Number.isFinite(requested)
        ? Math.round(requested)
        : 160,
    ),
  );
};
export const normalizeDataColumnWidths = (options: DataTableColumnOptions) =>
  Object.fromEntries(
    options.columns.map((column) => [
      column.key,
      dataColumnWidth(column, options.columnWidths),
    ]),
  );
/** 非受控顺序随结构更新清理旧列，新列加入末尾，不在渲染中通知调用方。 */
export function reconcileDataColumnOrder(
  keys: readonly string[] | undefined,
  columns: readonly DataColumn[],
) {
  if (keys === undefined) return keys;
  const known = new Set(columns.map((column) => column.key));
  const next = [...new Set(keys)].filter((key) => known.has(key));
  const seen = new Set(next);
  for (const column of columns)
    if (!seen.has(column.key)) {
      seen.add(column.key);
      next.push(column.key);
    }
  return next.length === keys.length &&
    next.every((key, index) => key === keys[index])
    ? keys
    : next;
}
export function reconcileDataColumnWidths(
  widths: Readonly<Record<string, number>> | undefined,
  columns: readonly DataColumn[],
) {
  if (widths === undefined) return widths;
  const known = new Set(columns.map((column) => column.key));
  const entries = Object.entries(widths).filter(([key]) => known.has(key));
  return entries.length === Object.keys(widths).length
    ? widths
    : Object.fromEntries(entries);
}
export const dataColumnOrder = (options: DataTableColumnOptions) => {
  const known = new Set(options.columns.map((column) => column.key));
  const keys =
    options.columnKeys ?? options.columns.map((column) => column.key);
  const visible = [...new Set(keys)].filter((key) => known.has(key));
  const start = new Set(options.pinnedColumns?.start),
    end = new Set(options.pinnedColumns?.end);
  return [
    ...visible.filter((key) => start.has(key)),
    ...visible.filter((key) => !start.has(key) && !end.has(key)),
    ...visible.filter((key) => !start.has(key) && end.has(key)),
  ];
};
/** 列拖动只改变同一冻结区域内的顺序；隐藏列与外部冻结配置保持由调用方决定。 */
export function moveDataColumn(
  options: DataTableColumnOptions,
  source: string,
  target: string,
) {
  const keys = dataColumnOrder(options),
    from = keys.indexOf(source),
    to = keys.indexOf(target);
  const group = (key: string) =>
    options.pinnedColumns?.start?.includes(key)
      ? "start"
      : options.pinnedColumns?.end?.includes(key)
        ? "end"
        : "body";
  if (from < 0 || to < 0 || from === to || group(source) !== group(target))
    return keys;
  const moved = [...keys];
  moved.splice(from, 1);
  moved.splice(to, 0, source);
  return moved;
}
export const dataColumnLabels = (
  labels?: Partial<DataTableColumnLabels>,
): DataTableColumnLabels => ({
  moveColumn: labels?.moveColumn ?? ((column) => `Move ${column} column`),
  resizeColumn: labels?.resizeColumn ?? ((column) => `Resize ${column} column`),
  moveColumnHint:
    labels?.moveColumnHint ??
    "Drag to reorder. Enter/Space picks up or finishes; Escape restores the starting order. ArrowLeft/ArrowRight moves within the same pinned group; Home/End moves to its boundary.",
  resizeColumnHint:
    labels?.resizeColumnHint ??
    "Drag to resize. ArrowLeft/ArrowRight adjusts by 10 pixels, Shift by 50; Home/End uses the minimum/maximum.",
  columnMoved:
    labels?.columnMoved ??
    ((column, position, count) =>
      `${column} column, position ${position} of ${count}`),
  columnResized:
    labels?.columnResized ??
    ((column, width) => `${column} column, ${width} pixels wide`),
  columnMoveState:
    labels?.columnMoveState ??
    ((column, state) => `${column} column move ${state}`),
});
const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );
const icon = (nodes: IconNode) =>
  `<svg data-scope="icon" data-part="root" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="--lk-icon-size:var(--lk-control-icon-sm)">${nodes
    .map(
      ([tag, attrs]) =>
        `<${tag} ${Object.entries(attrs)
          .filter(([key]) => key !== "key")
          .map(([key, value]) => `${key}="${escape(String(value))}"`)
          .join(" ")}/>`,
    )
    .join("")}</svg>`;
/** 标记由适配层渲染；手势、原生键盘和 DOM 生命周期由共享挂载函数处理。 */
export function renderDataColumnControls(
  options: DataTableColumnOptions,
  column: DataColumn,
) {
  const labels = dataColumnLabels(options.labels),
    { min, max } = dataColumnBounds(column);
  return (
    (options.columnReorderable
      ? `<button type="button" data-part="column-move" data-column-key="${escape(column.key)}" aria-label="${escape(labels.moveColumn(column.label))}" aria-description="${escape(labels.moveColumnHint)}" aria-pressed="false" ${options.loading ? "disabled" : ""}>${icon(GripVertical)}</button>`
      : "") +
    (options.columnResizable
      ? `<span data-part="column-resize" data-column-key="${escape(column.key)}" role="separator" aria-orientation="vertical" aria-label="${escape(labels.resizeColumn(column.label))}" aria-description="${escape(labels.resizeColumnHint)}" aria-valuemin="${min}" aria-valuemax="${max}" aria-valuenow="${dataColumnWidth(column, options.columnWidths)}" tabindex="${options.loading ? -1 : 0}" ${options.loading ? 'aria-disabled="true"' : ""}>${icon(MoveHorizontal)}</span>`
      : "")
  );
}
export function dataColumnTableStyle(options: DataTableColumnOptions) {
  if (!options.columnResizable && !options.columnWidths) return {};
  const keys = dataColumnOrder(options),
    widths = normalizeDataColumnWidths(options);
  return {
    tableLayout: "fixed" as const,
    width: `calc(var(--lk-control-height-sm) + var(--lk-space-component-sm) * 2 + ${keys.reduce((sum, key) => sum + widths[key], 0)}px)`,
  };
}

/** 原生 Pointer Events 同时支持鼠标/触摸；拖动期间只预览，释放后一次提交。 */
export function mountDataColumnControls(
  region: HTMLElement,
  options: () => DataTableColumnOptions,
  changeOrder: (keys: string[]) => void,
  changeWidths: (widths: Record<string, number>) => void,
) {
  const win = region.ownerDocument.defaultView;
  const table = region.querySelector<HTMLTableElement>(":scope > table");
  if (!win || !table) return () => {};
  const root = region.closest('[data-scope="data-table"][data-part="root"]');
  let disposed = false,
    frame = 0,
    dragFrame = 0;
  let pending:
    { part: string; key: string; keys?: string[]; width?: number } | undefined;
  type Gesture = {
    pointer: number;
    part: string;
    key: string;
    handle: HTMLElement;
    x: number;
    lastX: number;
    lastY: number;
    width: number;
    nextWidth: number;
    rtl: boolean;
    stamp: string;
    candidate?: string;
    selection: string;
  };
  let gesture: Gesture | undefined;
  let keyboardMove:
    | { key: string; keys: string[]; expectedKeys: string[]; structure: string }
    | undefined;
  const structure = () =>
    JSON.stringify([
      options().columns.map((column) => column.key),
      options().pinnedColumns,
    ]);
  const stamp = () =>
    JSON.stringify([
      dataColumnOrder(options()),
      normalizeDataColumnWidths(options()),
      options().pinnedColumns,
      options().loading,
      options().columnReorderable,
      options().columnResizable,
    ]);
  const handles = () =>
    Array.from(
      region.querySelectorAll<HTMLElement>(
        '[data-part="column-move"],[data-part="column-resize"]',
      ),
    );
  const handleFor = (key: string, part: string) =>
    handles().find(
      (handle) =>
        handle.dataset.columnKey === key && handle.dataset.part === part,
    );
  const geometry = (widths = normalizeDataColumnWidths(options())) => {
    if (!options().columnResizable && !options().columnWidths) return;
    const keys = dataColumnOrder(options());
    table.style.tableLayout = "fixed";
    table.style.width = `calc(var(--lk-control-height-sm) + var(--lk-space-component-sm) * 2 + ${keys.reduce((total, key) => total + widths[key], 0)}px)`;
    for (const col of Array.from(
      table.querySelectorAll<HTMLElement>("col[data-column-key]"),
    )) {
      const width = widths[col.dataset.columnKey!];
      if (width !== undefined) col.style.width = `${width}px`;
    }
    for (const handle of handles())
      if (handle.dataset.part === "column-resize")
        handle.setAttribute(
          "aria-valuenow",
          String(widths[handle.dataset.columnKey!]),
        );
  };
  const clearTarget = () => {
    for (const header of Array.from(
      table.querySelectorAll("[data-column-drop]"),
    ))
      header.removeAttribute("data-column-drop");
  };
  const markMoving = () => {
    for (const handle of handles())
      if (handle.dataset.part === "column-move")
        handle.setAttribute(
          "aria-pressed",
          String(
            handle.dataset.columnKey ===
              (keyboardMove?.key ??
                (gesture?.part === "column-move" ? gesture.key : undefined)),
          ),
        );
  };
  const finishKeyboard = (state: "finished" | "cancelled", restore = false) => {
    const previous = keyboardMove;
    keyboardMove = undefined;
    if (!previous) return;
    markMoving();
    const column = options().columns.find(
      (column) => column.key === previous.key,
    );
    const status = root?.querySelector('[data-part="column-status"]');
    if (status && column)
      status.textContent = dataColumnLabels(options().labels).columnMoveState(
        column.label,
        state,
      );
    if (
      restore &&
      previous.structure === structure() &&
      !options().loading &&
      JSON.stringify(previous.keys) !==
        JSON.stringify(dataColumnOrder(options()))
    ) {
      pending = {
        part: "column-move",
        key: previous.key,
        keys: [...previous.keys],
      };
      changeOrder([...previous.keys]);
      schedule();
    }
  };
  const end = () => {
    if (!gesture) return;
    const old = gesture;
    gesture = undefined;
    win.cancelAnimationFrame(dragFrame);
    dragFrame = 0;
    if (old.handle.hasPointerCapture(old.pointer))
      old.handle.releasePointerCapture(old.pointer);
    region.style.userSelect = old.selection;
    clearTarget();
    markMoving();
    geometry();
  };
  const sync = () => {
    frame = 0;
    if (disposed) return;
    if (
      keyboardMove &&
      (keyboardMove.structure !== structure() ||
        JSON.stringify(keyboardMove.expectedKeys) !==
          JSON.stringify(dataColumnOrder(options())) ||
        options().loading ||
        !options().columnReorderable)
    )
      finishKeyboard("cancelled");
    if (gesture && gesture.stamp !== stamp()) end();
    markMoving();
    if (!gesture) geometry();
    if (!pending) return;
    const opts = options(),
      keys = dataColumnOrder(opts);
    if (
      opts.loading ||
      !keys.includes(pending.key) ||
      (pending.part === "column-move"
        ? !opts.columnReorderable
        : !opts.columnResizable)
    ) {
      pending = undefined;
      return;
    }
    const ready = pending.keys
      ? JSON.stringify(keys) === JSON.stringify(pending.keys)
      : dataColumnWidth(
          opts.columns.find((column) => column.key === pending!.key) ?? {
            key: pending.key,
            label: "",
          },
          opts.columnWidths,
        ) === pending.width;
    if (!ready) return;
    const target = handleFor(pending.key, pending.part),
      active = region.ownerDocument.activeElement;
    const owned =
      active === region.ownerDocument.body ||
      (active instanceof win.HTMLElement &&
        active.dataset.part === pending.part &&
        active.dataset.columnKey === pending.key);
    if (target && owned) {
      target.focus({ preventScroll: true });
      // 同一按钮重排时可能仍保持焦点，不会再次触发 focusin；只滚动表格区域。
      const bounds = region.getBoundingClientRect(),
        rect = target.getBoundingClientRect();
      const left = bounds.left + region.clientLeft,
        right = left + region.clientWidth;
      if (rect.left < left) region.scrollLeft += rect.left - left;
      else if (rect.right > right) region.scrollLeft += rect.right - right;
    }
    const column = opts.columns.find((column) => column.key === pending!.key),
      status = root?.querySelector('[data-part="column-status"]');
    if (status && column) {
      const labels = dataColumnLabels(opts.labels);
      status.textContent = pending.keys
        ? labels.columnMoved(
            column.label,
            keys.indexOf(column.key) + 1,
            keys.length,
          )
        : labels.columnResized(column.label, pending.width!);
    }
    pending = undefined;
  };
  const schedule = () => {
    if (!frame && !disposed) frame = win.requestAnimationFrame(sync);
  };
  const observer = new win.MutationObserver(schedule);
  observer.observe(table, { childList: true, subtree: true });
  const commitOrder = (key: string, target: string) => {
    const keys = moveDataColumn(options(), key, target);
    if (JSON.stringify(keys) === JSON.stringify(dataColumnOrder(options())))
      return;
    pending = { part: "column-move", key, keys: [...keys] };
    if (keyboardMove) keyboardMove.expectedKeys = [...keys];
    changeOrder([...keys]);
    schedule();
  };
  const commitWidth = (key: string, value: number) => {
    const column = options().columns.find((column) => column.key === key);
    if (!column) return;
    const widths = normalizeDataColumnWidths(options());
    const width = dataColumnWidth(column, { [key]: value });
    if (width === widths[key]) {
      geometry();
      return;
    }
    pending = { part: "column-resize", key, width };
    changeWidths({ ...widths, [key]: width });
    schedule();
  };
  const find = (event: Event) =>
    event.target instanceof win.Element
      ? event.target.closest<HTMLElement>(
          '[data-part="column-move"],[data-part="column-resize"]',
        )
      : null;
  const down = (event: PointerEvent) => {
    const handle = find(event),
      opts = options();
    if (
      !handle ||
      !region.contains(handle) ||
      opts.loading ||
      event.button !== 0 ||
      !event.isPrimary
    )
      return;
    const part = handle.dataset.part!,
      key = handle.dataset.columnKey!,
      column = opts.columns.find((column) => column.key === key);
    if (
      !column ||
      (part === "column-move" ? !opts.columnReorderable : !opts.columnResizable)
    )
      return;
    end();
    finishKeyboard("finished");
    pending = undefined;
    event.preventDefault();
    handle.focus({ preventScroll: true });
    const width = dataColumnWidth(column, opts.columnWidths);
    gesture = {
      pointer: event.pointerId,
      part,
      key,
      handle,
      x: event.clientX,
      lastX: event.clientX,
      lastY: event.clientY,
      width,
      nextWidth: width,
      rtl: win.getComputedStyle(region).direction === "rtl",
      stamp: stamp(),
      selection: region.style.userSelect,
    };
    region.style.userSelect = "none";
    handle.setPointerCapture(event.pointerId);
    markMoving();
  };
  const dragTarget = () => {
    if (!gesture || gesture.part !== "column-move") return;
    clearTarget();
    const header = region.ownerDocument
      .elementFromPoint(gesture.lastX, gesture.lastY)
      ?.closest<HTMLElement>("th[data-column-key]");
    const key =
      header && table.contains(header) ? header.dataset.columnKey : undefined;
    gesture.candidate =
      key &&
      Math.abs(gesture.lastX - gesture.x) >= 4 &&
      JSON.stringify(moveDataColumn(options(), gesture.key, key)) !==
        JSON.stringify(dataColumnOrder(options()))
        ? key
        : undefined;
    if (gesture.candidate) header!.setAttribute("data-column-drop", "true");
  };
  const dragScroll = () => {
    dragFrame = 0;
    if (!gesture || gesture.part !== "column-move" || disposed) return;
    if (gesture.stamp !== stamp()) {
      end();
      return;
    }
    const bounds = region.getBoundingClientRect(),
      edge = Math.max(16, gesture.handle.getBoundingClientRect().width);
    if (gesture.lastY < bounds.top || gesture.lastY > bounds.bottom) return;
    const left = bounds.left + region.clientLeft,
      right = left + region.clientWidth;
    const delta =
      gesture.lastX < left + edge
        ? -Math.min(edge, left + edge - gesture.lastX)
        : gesture.lastX > right - edge
          ? Math.min(edge, gesture.lastX - right + edge)
          : 0;
    if (!delta) return;
    const previous = region.scrollLeft;
    region.scrollLeft += delta;
    if (Math.abs(region.scrollLeft - previous) < 0.5) return;
    dragTarget();
    dragFrame = win.requestAnimationFrame(dragScroll);
  };
  const move = (event: PointerEvent) => {
    if (!gesture || gesture.pointer !== event.pointerId) return;
    if (gesture.stamp !== stamp()) {
      end();
      return;
    }
    event.preventDefault();
    gesture.lastX = event.clientX;
    gesture.lastY = event.clientY;
    if (gesture.part === "column-resize") {
      const column = options().columns.find(
        (column) => column.key === gesture!.key,
      )!;
      gesture.nextWidth = dataColumnWidth(column, {
        [column.key]:
          gesture.width + (event.clientX - gesture.x) * (gesture.rtl ? -1 : 1),
      });
      geometry({
        ...normalizeDataColumnWidths(options()),
        [column.key]: gesture.nextWidth,
      });
    } else {
      dragTarget();
      if (!dragFrame) dragFrame = win.requestAnimationFrame(dragScroll);
    }
  };
  const up = (event: PointerEvent) => {
    if (!gesture || gesture.pointer !== event.pointerId) return;
    move(event);
    const current = gesture;
    if (!current) return;
    end();
    if (current.part === "column-resize")
      commitWidth(current.key, current.nextWidth);
    else if (current.candidate) commitOrder(current.key, current.candidate);
  };
  const cancel = (event: PointerEvent) => {
    if (gesture?.pointer === event.pointerId) end();
  };
  const keydown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && gesture) {
      event.preventDefault();
      event.stopPropagation();
      end();
      return;
    }
    if (event.key === "Escape" && keyboardMove) {
      event.preventDefault();
      event.stopPropagation();
      finishKeyboard("cancelled", true);
      return;
    }
    const handle = find(event),
      opts = options();
    if (
      !handle ||
      opts.loading ||
      event.isComposing ||
      !["ArrowLeft", "ArrowRight", "Home", "End", "Enter", " "].includes(
        event.key,
      )
    )
      return;
    const key = handle.dataset.columnKey!,
      part = handle.dataset.part,
      rtl = win.getComputedStyle(region).direction === "rtl";
    if (
      part === "column-move" ? !opts.columnReorderable : !opts.columnResizable
    )
      return;
    event.preventDefault();
    if (event.key === "Enter" || event.key === " ") {
      if (part === "column-move") {
        if (keyboardMove) finishKeyboard("finished");
        else {
          keyboardMove = {
            key,
            keys: dataColumnOrder(opts),
            expectedKeys: dataColumnOrder(opts),
            structure: structure(),
          };
          markMoving();
          const column = opts.columns.find((column) => column.key === key),
            status = root?.querySelector('[data-part="column-status"]');
          if (column && status)
            status.textContent = dataColumnLabels(opts.labels).columnMoveState(
              column.label,
              "started",
            );
        }
      }
      return;
    }
    const step = (event.key === "ArrowLeft" ? -1 : 1) * (rtl ? -1 : 1);
    if (part === "column-move") {
      const keys = dataColumnOrder(opts),
        from = keys.indexOf(key);
      const candidates = keys.filter(
        (target) =>
          target === key ||
          JSON.stringify(moveDataColumn(opts, key, target)) !==
            JSON.stringify(keys),
      );
      const target =
        event.key === "Home"
          ? candidates[0]
          : event.key === "End"
            ? candidates[candidates.length - 1]
            : keys[from + step];
      if (target) commitOrder(key, target);
    } else {
      const column = opts.columns.find((column) => column.key === key);
      if (!column) return;
      const { min, max } = dataColumnBounds(column);
      commitWidth(
        key,
        event.key === "Home"
          ? min
          : event.key === "End"
            ? max
            : dataColumnWidth(column, opts.columnWidths) +
              step * (event.shiftKey ? 50 : 10),
      );
    }
  };
  const reset = (event: MouseEvent) => {
    const handle = find(event);
    if (
      handle?.dataset.part === "column-resize" &&
      options().columnResizable &&
      !options().loading
    )
      commitWidth(handle.dataset.columnKey!, 160);
  };
  const outside = (event: Event) => {
    if (!(event.target instanceof win.Element)) return;
    const own = event.target.closest<HTMLElement>(
      '[data-part="column-move"],[data-part="column-resize"]',
    );
    if (
      keyboardMove &&
      (own?.dataset.columnKey !== keyboardMove.key ||
        own?.dataset.part !== "column-move")
    )
      finishKeyboard("finished");
    if (
      pending &&
      (!own ||
        own.dataset.columnKey !== pending.key ||
        own.dataset.part !== pending.part)
    )
      pending = undefined;
    if (!region.contains(event.target)) end();
  };
  const externalFocus = (event: Event) => {
    if (event.target !== region.ownerDocument.body) outside(event);
  };
  region.addEventListener("pointerdown", down);
  region.addEventListener("pointermove", move);
  region.addEventListener("pointerup", up);
  region.addEventListener("pointercancel", cancel);
  region.addEventListener("lostpointercapture", cancel);
  region.addEventListener("keydown", keydown);
  region.addEventListener("dblclick", reset);
  region.ownerDocument.addEventListener("pointerdown", outside, true);
  region.ownerDocument.addEventListener("focusin", externalFocus, true);
  schedule();
  return () => {
    disposed = true;
    keyboardMove = undefined;
    end();
    pending = undefined;
    observer.disconnect();
    win.cancelAnimationFrame(frame);
    win.cancelAnimationFrame(dragFrame);
    region.removeEventListener("pointerdown", down);
    region.removeEventListener("pointermove", move);
    region.removeEventListener("pointerup", up);
    region.removeEventListener("pointercancel", cancel);
    region.removeEventListener("lostpointercapture", cancel);
    region.removeEventListener("keydown", keydown);
    region.removeEventListener("dblclick", reset);
    region.ownerDocument.removeEventListener("pointerdown", outside, true);
    region.ownerDocument.removeEventListener("focusin", externalFocus, true);
  };
}
