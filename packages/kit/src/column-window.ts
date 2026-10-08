import { createVirtualWindow, type VirtualWindowState } from "./virtual-window";
import { dataColumnWidth, type DataTableColumnOptions } from "./table-columns";
import type { DataTableProps, dataTableView } from "./data-table";
import type { DataColumn } from "./data-models";
import { resolveDataTableCellRange } from "./table-range";

export interface ColumnVirtualizationOptions {
  /** SSR 首窗宽度；挂载后采用实际滚动区域宽度，单位 px。 */
  width?: number;
  overscan?: number;
  initialOffset?: number;
  scrollToIndex?: number;
}
type View = ReturnType<typeof dataTableView>;
const options = (props: DataTableProps, view: View) => ({
  keys: props.columnVirtualization
    ? view.columns.map((column) => column.key)
    : [],
  height: props.columnVirtualization?.width ?? 640,
  overscan: props.columnVirtualization?.overscan ?? 2,
  initialOffset: props.columnVirtualization?.initialOffset,
  scrollToIndex: props.columnVirtualization?.scrollToIndex,
});
/** 横向几何共享既有列宽；只建立一条前缀轴，不分配行×列矩阵。 */
export function createDataTableColumnWindow(
  props: DataTableProps,
  view: View,
  notify: (state: VirtualWindowState) => void,
) {
  let ready = false,
    stamp = "";
  const model = createVirtualWindow(options(props, view), (state) => {
    if (ready) notify(state);
  });
  const sync = (next: DataTableProps, current: View) => {
    const sizes = current.columns.map((column) => ({
      key: column.key,
      size: dataColumnWidth(column, next.columnWidths),
    }));
    const signature = JSON.stringify([!!next.columnVirtualization, sizes]);
    model.setOptions(options(next, current));
    if (signature !== stamp) {
      stamp = signature;
      model.measure(sizes);
    }
  };
  sync(props, view);
  if (props.columnVirtualization?.initialOffset !== undefined)
    model.setViewport(props.columnVirtualization.initialOffset);
  if (props.columnVirtualization?.scrollToIndex !== undefined)
    model.scrollToIndex(props.columnVirtualization.scrollToIndex);
  ready = true;
  const dispose = model.dispose;
  return Object.assign(model, {
    sync,
    dispose() {
      stamp = "";
      dispose();
    },
  });
}
export interface DataTableRenderColumn extends DataColumn {
  /** 完整列模型中的绝对位置；占位列为 -1。 */
  virtualIndex: number;
  virtualGap?: number;
  renderKey: string;
}
/** 占位列仅用于真实 table 的几何，不进入排序、过滤、选择或编辑模型。 */
export function dataTableVirtualColumns(
  view: View,
  props: DataTableProps,
  state?: VirtualWindowState,
  retained?: string,
): DataTableRenderColumn[] {
  const indexes = state
    ? new Set(state.entries.map((entry) => entry.index))
    : undefined;
  const range =
    props.cellRange === undefined ? props.defaultCellRange : props.cellRange;
  const active =
    range && resolveDataTableCellRange(view, range)
      ? range.focus.columnKey
      : props.cellSelection
        ? view.columns[0]?.key
        : undefined;
  const result: DataTableRenderColumn[] = [];
  let gap = 0,
    gapStart = 0;
  const flush = (end: number) => {
    if (!gap) return;
    const renderKey = JSON.stringify(["gap", gapStart, end]);
    result.push({
      key: renderKey,
      label: "",
      virtualIndex: -1,
      virtualGap: gap,
      renderKey,
    });
    gap = 0;
  };
  view.columns.forEach((column, index) => {
    const visible =
      !indexes ||
      indexes.has(index) ||
      view.pins.has(column.key) ||
      ((props.tree || props.groupBy?.length) && index === 0) ||
      column.key === retained ||
      column.key === active;
    if (!visible) {
      if (!gap) gapStart = index;
      gap += dataColumnWidth(column, props.columnWidths);
      return;
    }
    flush(index);
    result.push({
      ...column,
      virtualIndex: index,
      renderKey: JSON.stringify(["column", column.key]),
    });
  });
  flush(view.columns.length);
  return result;
}
export const dataTableRenderColumnWidth = (
  column: DataTableRenderColumn,
  props: DataTableColumnOptions,
) => column.virtualGap ?? dataColumnWidth(column, props.columnWidths);
/** 现代三引擎的 RTL scrollLeft 从 inline-start 的 0 向负值增长。 */
export function mountDataTableColumnWindow(
  viewport: HTMLElement,
  model: ReturnType<typeof createDataTableColumnWindow>,
) {
  const win = viewport.ownerDocument.defaultView;
  if (!win) return () => {};
  let frame = 0,
    disposed = false,
    userScroll = false,
    initialized = false,
    syncing = false,
    lastOffset = model.state.offset;
  let focusedNode: HTMLElement | undefined,
    movedFocus = false;
  const rtl = () => win.getComputedStyle(viewport).direction === "rtl";
  const inset = () =>
    viewport.querySelector("th")?.getBoundingClientRect().width ?? 0;
  const sync = () => {
    frame = 0;
    if (disposed || !viewport.isConnected) return;
    const offset = rtl() ? -viewport.scrollLeft : viewport.scrollLeft;
    // 首次绘制前的旧 scroll 事件不能覆盖初始命令；模型定位优先于排队的浏览器事件。
    syncing = true;
    model.setViewport(
      initialized && userScroll ? Math.max(0, offset) : model.state.offset,
      Math.max(1, viewport.clientWidth - inset()),
    );
    syncing = false;
    initialized = true;
    userScroll = false;
    const desired = model.state.offset;
    if (Math.abs(offset - desired) > 0.5)
      viewport.scrollLeft = rtl() ? -desired : desired;
    inspectMutations(mutation.takeRecords());
    restoreFocus();
  };
  const schedule = () => {
    if (!frame && !disposed) frame = win.requestAnimationFrame(sync);
  };
  const scroll = () => {
    userScroll = true;
    schedule();
  };
  // 单元格选择的原生游标必须在离开表格后仍可 Tab 返回；普通控件失焦则释放保留列。
  let rovingKey: string | undefined;
  const rovingColumn = () =>
    rovingKey ??
    viewport.querySelector<HTMLElement>('td[data-cell-column][tabindex="0"]')
      ?.dataset.cellColumn;
  const focus = () => {
    const active = viewport.ownerDocument.activeElement;
    if (active instanceof win.Element && viewport.contains(active)) {
      const cell = active.closest<HTMLElement>("td[data-cell-column]");
      if (cell) rovingKey = cell.dataset.cellColumn;
    }
    const key =
      active instanceof win.Element && viewport.contains(active)
        ? active.closest<HTMLElement>("[data-column-key]")?.dataset.columnKey
        : rovingColumn();
    focusedNode =
      active instanceof win.HTMLElement && viewport.contains(active)
        ? active
        : undefined;
    movedFocus = false;
    model.focus(key);
  };
  const inspectMutations = (records: MutationRecord[]) => {
    if (
      focusedNode &&
      records.some((record) =>
        Array.from(record.removedNodes).some(
          (node) => node === focusedNode || node.contains(focusedNode!),
        ),
      )
    )
      movedFocus = true;
  };
  const restoreFocus = () => {
    if (
      movedFocus &&
      focusedNode?.isConnected &&
      viewport.contains(focusedNode) &&
      viewport.ownerDocument.activeElement === viewport.ownerDocument.body
    )
      focusedNode.focus({ preventScroll: true });
  };
  const blur = () =>
    queueMicrotask(() => {
      if (disposed) return;
      inspectMutations(mutation.takeRecords());
      if (movedFocus) {
        restoreFocus();
        schedule();
      } else focus();
    });
  const external = (event: Event) => {
    if (
      event.target instanceof win.Node &&
      !viewport.contains(event.target) &&
      event.target !== viewport.ownerDocument.body
    ) {
      focusedNode = undefined;
      movedFocus = false;
      model.focus(rovingColumn());
    }
  };
  const resize =
    typeof win.ResizeObserver === "function"
      ? new win.ResizeObserver(schedule)
      : undefined;
  resize?.observe(viewport);
  const mutation = new win.MutationObserver((records) => {
    inspectMutations(records);
    schedule();
  });
  mutation.observe(viewport, { childList: true, subtree: true });
  const stop = model.subscribe(() => {
    const moved = lastOffset !== model.state.offset;
    lastOffset = model.state.offset;
    if (moved && !syncing) userScroll = false;
    schedule();
  });
  viewport.addEventListener("scroll", scroll, { passive: true });
  viewport.addEventListener("focusin", focus);
  viewport.addEventListener("focusout", blur);
  viewport.ownerDocument.addEventListener("focusin", external, true);
  viewport.ownerDocument.addEventListener("pointerdown", external, true);
  schedule();
  return () => {
    disposed = true;
    win.cancelAnimationFrame(frame);
    resize?.disconnect();
    mutation.disconnect();
    stop();
    viewport.removeEventListener("scroll", scroll);
    viewport.removeEventListener("focusin", focus);
    viewport.removeEventListener("focusout", blur);
    viewport.ownerDocument.removeEventListener("focusin", external, true);
    viewport.ownerDocument.removeEventListener("pointerdown", external, true);
    model.dispose();
  };
}
