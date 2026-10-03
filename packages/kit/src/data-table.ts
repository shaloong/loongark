import type { DataRow, DataColumn } from "./data-models";
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
