import {
  createDataTableView,
  type DataRow,
  type DataColumn,
  type DataSort,
} from "./data-models";
export interface DataTableState {
  query: string;
  sort?: DataSort;
  page: number;
}
export interface DataTableSummary {
  total: number;
  selected: number;
  page: number;
  pageCount: number;
}
export interface DataTableLabels {
  filter: string;
  filterPlaceholder: string;
  selectPage: string;
  selectRow: (id: string) => string;
  empty: string;
  previous: string;
  next: string;
  loading: string;
  retry: string;
  summary: (details: DataTableSummary) => string;
}
export interface DataTableProps {
  data: readonly DataRow[];
  columns: readonly DataColumn[];
  pageSize?: number;
  rowKey?: string;
  label?: string;
  labels?: Partial<DataTableLabels>;
  selectedIds?: readonly string[];
  defaultSelectedIds?: readonly string[];
  onSelectionChange?: (ids: string[]) => void;
  state?: DataTableState;
  defaultState?: Partial<DataTableState>;
  onStateChange?: (state: DataTableState) => void;
  mode?: "client" | "server";
  totalRows?: number;
  /** 按此顺序显示已有列；不传时显示全部列，空数组允许只保留选择列。 */
  columnKeys?: readonly string[];
  /** 冻结在逻辑起始/结束边；隐藏与未知列忽略，重复列以 start 为准。 */
  pinnedColumns?: { start?: readonly string[]; end?: readonly string[] };
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
}
export const dataTableLabels = (
  labels?: Partial<DataTableLabels>,
): DataTableLabels => ({
  filter: labels?.filter ?? "Filter rows",
  filterPlaceholder: labels?.filterPlaceholder ?? "Filter rows…",
  selectPage: labels?.selectPage ?? "Select current page",
  selectRow: labels?.selectRow ?? ((id) => "Select " + id),
  empty: labels?.empty ?? "No results",
  previous: labels?.previous ?? "Previous",
  next: labels?.next ?? "Next",
  loading: labels?.loading ?? "Loading rows…",
  retry: labels?.retry ?? "Retry",
  summary:
    labels?.summary ??
    (({ total, selected, page, pageCount }) =>
      `${total} rows · ${selected} selected · ${page} / ${pageCount}`),
});
/** 选择跨筛选和分页保留，但不得包含已从源数据移除的行。 */
export function normalizeDataSelection(
  ids: readonly string[],
  allIds: readonly string[],
) {
  const available = new Set(allIds);
  return [...new Set(ids)].filter((id) => available.has(id));
}
export function dataSelectionState(
  ids: readonly string[],
  pageIds: readonly string[],
) {
  const selected = new Set(ids);
  const count = pageIds.filter((id) => selected.has(id)).length;
  return {
    checked: pageIds.length > 0 && count === pageIds.length,
    mixed: count > 0 && count < pageIds.length,
  };
}
export function toggleDataSelection(
  ids: readonly string[],
  pageIds: readonly string[],
  checked: boolean,
) {
  const page = new Set(pageIds);
  return checked
    ? [...new Set([...ids, ...pageIds])]
    : ids.filter((id) => !page.has(id));
}
export function setDataSelectionMixed(
  input: HTMLInputElement | undefined | null,
  mixed: boolean,
) {
  if (input) input.indeterminate = mixed;
}
/** 原生 checkbox 已先切换 DOM；受控调用方拒绝更新时恢复模型状态。 */
export function restoreDataSelection(
  input: HTMLInputElement,
  ids: readonly string[],
  pageIds: readonly string[],
  rowId?: string,
) {
  const state =
    rowId === undefined
      ? dataSelectionState(ids, pageIds)
      : { checked: ids.includes(rowId), mixed: false };
  input.checked = state.checked;
  input.indeterminate = state.mixed;
}

/** 先检查完整结构，再应用列显示/顺序；服务端数据不得重复本地处理。 */
export function dataTableView(props: DataTableProps, state: DataTableState) {
  const keys = props.columns.map((column) => column.key);
  if (keys.some((key) => !key) || new Set(keys).size !== keys.length)
    throw Error("DataTable requires unique non-empty column keys");
  const byKey = new Map(props.columns.map((column) => [column.key, column]));
  const visible =
    props.columnKeys === undefined
      ? props.columns
      : [...new Set(props.columnKeys)].flatMap((key) => {
          const column = byKey.get(key);
          return column ? [column] : [];
        });
  const start = new Set(props.pinnedColumns?.start),
    end = new Set(props.pinnedColumns?.end);
  const pins = new Map<string, "start" | "end">();
  for (const column of visible) {
    if (start.has(column.key)) pins.set(column.key, "start");
    else if (end.has(column.key)) pins.set(column.key, "end");
  }
  // 冻结分组内沿用 columnKeys 的顺序，避免配置顺序造成另一次列排序。
  const columns = [
    ...visible.filter((column) => pins.get(column.key) === "start"),
    ...visible.filter((column) => !pins.has(column.key)),
    ...visible.filter((column) => pins.get(column.key) === "end"),
  ];
  return {
    ...createDataTableView(props.data, columns, {
      ...state,
      pageSize: props.pageSize,
      rowKey: props.rowKey,
      mode: props.mode,
      totalRows: props.totalRows,
    }),
    columns,
    pins,
    pinSelection: [...pins.values()].includes("start"),
  };
}
/** 服务端当前页不是完整数据集，不依据换页清除远端已选行。 */
export function dataTableSelection(
  ids: readonly string[],
  allIds: readonly string[],
  mode?: "client" | "server",
) {
  return mode === "server"
    ? [...new Set(ids)].filter((id) => id !== "")
    : normalizeDataSelection(ids, allIds);
}

/** 重试按钮即将被加载/成功状态替换；将键盘焦点留在稳定的表格区域。 */
export function retryDataTable(button: HTMLElement, retry?: () => void) {
  if (!retry) return;
  button
    .closest('[data-scope="data-table"][data-part="root"]')
    ?.querySelector<HTMLElement>('[role="region"]')
    ?.focus();
  retry();
}

/** 只在挂载后测量真实列宽；逻辑方向由 CSS 处理，SSR 不读取布局。 */
export function mountDataTablePins(region: HTMLElement): () => void {
  const table = region.querySelector<HTMLTableElement>(":scope > table"),
    win = region.ownerDocument.defaultView;
  if (!table || !win) return () => {};
  let disposed = false,
    frame = 0;
  const sizes = { start: 0, end: 0 };
  const owned = new Map<HTMLElement, { offset: string; edge: string | null }>();
  const originalWidth = region.style.getPropertyValue(
    "--lk-data-table-viewport-width",
  );
  let lastWidth = originalWidth;
  const originalOverflow = region.getAttribute("data-pin-overflow");
  let lastOverflow: string | null = originalOverflow;
  const clear = () => {
    for (const [cell, original] of owned) {
      if (original.offset)
        cell.style.setProperty("--lk-data-table-pin-offset", original.offset);
      else cell.style.removeProperty("--lk-data-table-pin-offset");
      if (original.edge === null) cell.removeAttribute("data-pin-edge");
      else cell.setAttribute("data-pin-edge", original.edge);
    }
    owned.clear();
  };
  const measure = () => {
    frame = 0;
    if (disposed) return;
    clear();
    lastWidth = `${region.clientWidth}px`;
    region.style.setProperty("--lk-data-table-viewport-width", lastWidth);
    const headers = Array.from(table.tHead?.rows[0]?.cells ?? []);
    const widths = headers.map((cell) => cell.getBoundingClientRect().width);
    let total = 0;
    for (const side of ["start", "end"] as const) {
      const indices = headers.flatMap((cell, i) =>
        cell.dataset.pinned === side ? [i] : [],
      );
      if (side === "end") indices.reverse();
      let offset = 0;
      for (const [index, i] of indices.entries()) {
        const cells = [
          headers[i],
          ...Array.from(table.tBodies).flatMap((body) =>
            Array.from(body.rows).flatMap((row) => {
              const cell = row.cells[i];
              return cell?.dataset.pinned === side ? [cell] : [];
            }),
          ),
        ];
        for (const cell of cells) {
          owned.set(cell, {
            offset: cell.style.getPropertyValue("--lk-data-table-pin-offset"),
            edge: cell.getAttribute("data-pin-edge"),
          });
          cell.style.setProperty("--lk-data-table-pin-offset", `${offset}px`);
          if (index === indices.length - 1)
            cell.setAttribute("data-pin-edge", side);
        }
        offset += widths[i];
      }
      total += offset;
      sizes[side] = offset;
    }
    // 给中间列留至少一个实际列宽；冻结区太宽时保持所有内容可读取。
    const free = widths.filter((_, i) => !headers[i].dataset.pinned);
    const controls = headers.flatMap((cell) =>
      cell.dataset.pinned
        ? []
        : Array.from(cell.querySelectorAll<HTMLElement>("button")).map(
            (button) => button.getBoundingClientRect().width,
          ),
    );
    const minimum = free.length
      ? Math.max(Math.min(...free, widths[0] ?? 0), ...controls)
      : 0;
    lastOverflow =
      total > 0 && total + minimum > region.clientWidth + 1 ? "true" : null;
    if (lastOverflow === null) region.removeAttribute("data-pin-overflow");
    else region.setAttribute("data-pin-overflow", lastOverflow);
    syncHeaders(headers);
  };
  const schedule = () => {
    if (!disposed && !frame) frame = win.requestAnimationFrame(measure);
  };
  const observed = new Set<Element>();
  const resize =
    typeof win.ResizeObserver === "function"
      ? new win.ResizeObserver(schedule)
      : undefined;
  const syncHeaders = (headers: readonly Element[]) => {
    const next = new Set<Element>([region, table, ...headers]);
    for (const element of observed)
      if (!next.has(element)) {
        resize?.unobserve(element);
        observed.delete(element);
      }
    for (const element of next)
      if (!observed.has(element)) {
        resize?.observe(element);
        observed.add(element);
      }
  };
  const mutation = new win.MutationObserver(schedule);
  mutation.observe(table, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["data-pinned", "aria-sort"],
  });
  win.addEventListener("resize", schedule);
  const focus = (event: FocusEvent) => {
    const target = event.target;
    if (!(target instanceof win.HTMLElement) || lastOverflow === "true") return;
    const cell = target.closest<HTMLElement>("th,td");
    if (!cell || cell.dataset.pinned || cell.closest("table") !== table) return;
    const bounds = region.getBoundingClientRect(),
      rect = cell.getBoundingClientRect();
    const rtl = win.getComputedStyle(region).direction === "rtl";
    const left = bounds.left + region.clientLeft + sizes[rtl ? "end" : "start"];
    const right =
      bounds.left +
      region.clientLeft +
      region.clientWidth -
      sizes[rtl ? "start" : "end"];
    if (rect.left < left) region.scrollLeft += rect.left - left;
    else if (rect.right > right) region.scrollLeft += rect.right - right;
  };
  region.addEventListener("focusin", focus);
  measure();
  return () => {
    disposed = true;
    if (frame) win.cancelAnimationFrame(frame);
    mutation.disconnect();
    resize?.disconnect();
    observed.clear();
    win.removeEventListener("resize", schedule);
    region.removeEventListener("focusin", focus);
    clear();
    if (
      region.style.getPropertyValue("--lk-data-table-viewport-width") ===
      lastWidth
    ) {
      if (originalWidth)
        region.style.setProperty(
          "--lk-data-table-viewport-width",
          originalWidth,
        );
      else region.style.removeProperty("--lk-data-table-viewport-width");
    }
    if (region.getAttribute("data-pin-overflow") === lastOverflow) {
      if (originalOverflow === null)
        region.removeAttribute("data-pin-overflow");
      else region.setAttribute("data-pin-overflow", originalOverflow);
    }
  };
}
