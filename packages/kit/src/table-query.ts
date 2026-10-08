import type { CellValue, DataColumn, DataRow, DataSort } from "./data-models";
import type { DataTableState } from "./data-table";

export type DataFilterOperator =
  | "contains"
  | "equals"
  | "startsWith"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "empty"
  | "not-empty";
export interface DataFilter {
  key: string;
  operator: DataFilterOperator;
  /** 数字允许保留输入草稿；非法草稿不参与过滤，并报告字段错误。 */
  value?: CellValue;
}
export interface DataColumnFilter {
  type: "text" | "number" | "select";
  options?: readonly { value: string; label: string; disabled?: boolean }[];
}
const numeric = new Set<DataFilterOperator>(["gt", "gte", "lt", "lte"]);
export function dataFilterOperators(column: DataColumn): DataFilterOperator[] {
  const type = column.filter?.type ?? "text";
  return type === "number"
    ? ["equals", "gt", "gte", "lt", "lte", "empty", "not-empty"]
    : type === "select"
      ? ["equals", "empty", "not-empty"]
      : ["contains", "equals", "startsWith", "empty", "not-empty"];
}
export function normalizeDataSorts(
  columns: readonly DataColumn[],
  sorts: readonly DataSort[],
) {
  const keys = new Set<string>();
  return sorts
    .filter((sort) => {
      const column = columns.find((column) => column.key === sort.key);
      if (
        !column ||
        column.sortable === false ||
        keys.has(sort.key) ||
        !["asc", "desc"].includes(sort.direction)
      )
        return false;
      keys.add(sort.key);
      return true;
    })
    .map((sort) => ({ ...sort }));
}
export function normalizeDataFilters(
  columns: readonly DataColumn[],
  filters: readonly DataFilter[],
) {
  const active: DataFilter[] = [],
    errors = new Map<string, "number" | "option" | "operator">();
  for (const filter of filters) {
    const column = columns.find((column) => column.key === filter.key);
    if (!column) continue;
    const operators = column.filter
      ? dataFilterOperators(column)
      : [
          "contains",
          "equals",
          "startsWith",
          "gt",
          "gte",
          "lt",
          "lte",
          "empty",
          "not-empty",
        ];
    if (!operators.includes(filter.operator)) {
      errors.set(filter.key, "operator");
      continue;
    }
    if (["empty", "not-empty"].includes(filter.operator)) {
      active.push({ key: filter.key, operator: filter.operator });
      continue;
    }
    const value = filter.value;
    if (value == null || (value === "" && column.filter?.type !== "select"))
      continue;
    if (numeric.has(filter.operator) || column.filter?.type === "number") {
      const number =
        typeof value === "number"
          ? value
          : typeof value === "string" && value.trim()
            ? Number(value)
            : NaN;
      if (!Number.isFinite(number)) {
        errors.set(filter.key, "number");
        continue;
      }
      active.push({ ...filter, value: number });
    } else if (column.filter?.type === "select") {
      if (
        !column.filter.options?.some(
          (option) => !option.disabled && option.value === value,
        )
      ) {
        errors.set(filter.key, "option");
        continue;
      }
      active.push({ ...filter });
    } else
      active.push({
        ...filter,
        value: column.filter?.type === "text" ? String(value) : value,
      });
  }
  return { filters: active, filterErrors: errors };
}
export function matchesDataFilter(row: DataRow, filter: DataFilter) {
  const left = Object.prototype.hasOwnProperty.call(row, filter.key)
    ? row[filter.key]
    : undefined;
  if (filter.operator === "empty") return left == null || left === "";
  if (filter.operator === "not-empty") return left != null && left !== "";
  if (left == null) return false;
  if (typeof filter.value === "number") {
    if (typeof left !== "number" || !Number.isFinite(left)) return false;
    switch (filter.operator) {
      case "equals":
        return left === filter.value;
      case "gt":
        return left > filter.value;
      case "gte":
        return left >= filter.value;
      case "lt":
        return left < filter.value;
      case "lte":
        return left <= filter.value;
      default:
        return false;
    }
  }
  const value = String(filter.value ?? "").toLocaleLowerCase(),
    text = String(left).toLocaleLowerCase();
  if (filter.operator === "equals") return text === value;
  if (filter.operator === "startsWith") return text.startsWith(value);
  return filter.operator === "contains" && text.includes(value);
}
export function nextDataTableSort(
  sorts: readonly DataSort[],
  key: string,
  additive: boolean,
): Partial<DataTableState> {
  const current = sorts.find((sort) => sort.key === key);
  const next: DataSort | undefined =
    current?.direction === "asc"
      ? { key, direction: "desc" }
      : current?.direction === "desc"
        ? undefined
        : { key, direction: "asc" };
  const result = additive
    ? sorts.flatMap((sort) =>
        sort.key === key ? (next ? [next] : []) : [sort],
      )
    : next
      ? [next]
      : [];
  if (additive && !current && next) result.push(next);
  return { sort: result[0], sorts: result, page: 1 };
}
export function dataFilterControl(
  column: DataColumn,
  filters: readonly DataFilter[] | undefined,
) {
  const filter = filters?.find((filter) => filter.key === column.key);
  return {
    operator: filter?.operator ?? dataFilterOperators(column)[0],
    value: filter?.value ?? "",
    hasValue: filter?.value != null,
  };
}
export function changeDataFilter(
  state: DataTableState,
  column: DataColumn,
  patch: Partial<Omit<DataFilter, "key">>,
): Partial<DataTableState> {
  const current = dataFilterControl(column, state.filters);
  const next: DataFilter = {
    operator: current.operator,
    value: state.filters?.find((filter) => filter.key === column.key)?.value,
    ...patch,
    key: column.key,
  };
  const filters = [
    ...(state.filters ?? []).filter((filter) => filter.key !== column.key),
    next,
  ];
  const previousActive = normalizeDataFilters(
    [column],
    state.filters ?? [],
  ).filters;
  const nextActive = normalizeDataFilters([column], filters).filters;
  return {
    filters,
    page:
      JSON.stringify(previousActive) === JSON.stringify(nextActive)
        ? state.page
        : 1,
  };
}
export const dataFilterOperatorLabels: Record<DataFilterOperator, string> = {
  contains: "Contains",
  equals: "Equals",
  startsWith: "Starts with",
  gt: "Greater than",
  gte: "At least",
  lt: "Less than",
  lte: "At most",
  empty: "Empty",
  "not-empty": "Not empty",
};

export function resolveDataFilterLabels(
  overrides?: Partial<Record<DataFilterOperator, string>>,
) {
  const labels = { ...dataFilterOperatorLabels };
  for (const operator of [
    "contains",
    "equals",
    "startsWith",
    "gt",
    "gte",
    "lt",
    "lte",
    "empty",
    "not-empty",
  ] as const)
    labels[operator] = overrides?.[operator] ?? labels[operator];
  return labels;
}

export function dataFilterError(
  error: "number" | "option" | "operator" | undefined,
  labels: {
    invalidNumber: string;
    invalidOption: string;
    invalidFilter: string;
  },
) {
  return error === "number"
    ? labels.invalidNumber
    : error === "option"
      ? labels.invalidOption
      : error === "operator"
        ? labels.invalidFilter
        : undefined;
}
export function dataFilterSelectValue(
  column: DataColumn,
  filters: readonly DataFilter[] | undefined,
) {
  const control = dataFilterControl(column, filters);
  return control.hasValue
    ? String(
        column.filter?.options?.findIndex(
          (option) => option.value === control.value,
        ) ?? -1,
      )
    : "-1";
}

/** 非受控状态移除陈旧列，但保留仍存在字段的非法输入草稿。 */
export function reconcileDataTableQuery(
  state: DataTableState,
  view: {
    columns: readonly DataColumn[];
    sort?: DataSort;
    sorts: readonly DataSort[];
  },
): DataTableState {
  const sortsChanged =
    state.sorts !== undefined &&
    (state.sorts.length !== view.sorts.length ||
      state.sorts.some(
        (sort, index) =>
          sort.key !== view.sorts[index]?.key ||
          sort.direction !== view.sorts[index]?.direction,
      ));
  const sortChanged =
    state.sort?.key !== view.sort?.key ||
    state.sort?.direction !== view.sort?.direction;
  const keys = new Set(view.columns.map((column) => column.key));
  const filters = state.filters?.filter((filter) => keys.has(filter.key));
  const filtersChanged = filters?.length !== state.filters?.length;
  if (!sortsChanged && !sortChanged && !filtersChanged) return state;
  return {
    ...state,
    sort: view.sort,
    sorts: sortsChanged ? view.sorts : state.sorts,
    filters: filtersChanged ? filters : state.filters,
  };
}
