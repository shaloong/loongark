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
  const columns =
    props.columnKeys === undefined
      ? props.columns
      : [...new Set(props.columnKeys)].flatMap((key) => {
          const column = byKey.get(key);
          return column ? [column] : [];
        });
  return {
    ...createDataTableView(props.data, columns, {
      ...state,
      pageSize: props.pageSize,
      rowKey: props.rowKey,
      mode: props.mode,
      totalRows: props.totalRows,
    }),
    columns,
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
