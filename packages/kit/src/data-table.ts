import {
  dataColumnLabels,
  type DataTableColumnLabels,
  type DataTableColumnOptions,
} from "./table-columns";
import type { DataTableStructureLabels } from "./table-structure";
import type {
  DataTableCellSelectionLabels,
  DataTableCellSelectionOptions,
} from "./table-range";
import { resolveDataFilterLabels } from "./table-query";
import {
  createDataTableView,
  type DataRow,
  type DataColumn,
  type DataSort,
  type CellValue,
} from "./data-models";
export interface DataTableState {
  query: string;
  sort?: DataSort;
  sorts?: readonly DataSort[];
  filters?: readonly import("./table-query").DataFilter[];
  page: number;
}
export interface DataTableSummary {
  total: number;
  selected: number;
  page: number;
  pageCount: number;
}
export interface DataTableLabels
  extends
    DataTableColumnLabels,
    DataTableStructureLabels,
    DataTableCellSelectionLabels {
  filter: string;
  filterPlaceholder: string;
  filterColumn: (column: string) => string;
  filterOperator: (column: string) => string;
  filterOperators: Record<import("./table-query").DataFilterOperator, string>;
  invalidFilter: string;
  allOptions: string;
  sortDescription: (
    direction: "asc" | "desc" | undefined,
    priority: number,
  ) => string;
  selectPage: string;
  selectRow: (id: string) => string;
  empty: string;
  previous: string;
  next: string;
  loading: string;
  retry: string;
  summary: (details: DataTableSummary) => string;
  editCell: (column: string, rowId: string) => string;
  save: string;
  cancel: string;
  saving: string;
  invalidNumber: string;
  invalidOption: string;
  commitError: string;
  emptyCell: string;
  batchEdit: string;
  batchTitle: string;
  batchApply: string;
  batchUndo: string;
  batchRedo: string;
  batchConflict: string;
  batchNoChanges: string;
  batchCount: (count: number) => string;
  batchEnable: (column: string) => string;
}
export interface DataTableProps
  extends DataTableColumnOptions, DataTableCellSelectionOptions {
  groupBy?: readonly string[];
  aggregations?: import("./table-structure").DataTableStructureOptions["aggregations"];
  tree?: { parentKey: string };
  expandedRowIds?: readonly string[];
  defaultExpandedRowIds?: readonly string[];
  onExpandedRowIdsChange?: (ids: string[]) => void;
  data: readonly DataRow[];
  columns: readonly DataColumn[];
  defaultColumnWidths?: Readonly<Record<string, number>>;
  onColumnKeysChange?: (keys: string[]) => void;
  onColumnWidthsChange?: (widths: Record<string, number>) => void;
  pageSize?: number;
  rowKey?: string;
  label?: string;
  labels?: Partial<Omit<DataTableLabels, "filterOperators">> & {
    filterOperators?: Partial<DataTableLabels["filterOperators"]>;
  };
  selectedIds?: readonly string[];
  defaultSelectedIds?: readonly string[];
  onSelectionChange?: (ids: string[]) => void;
  state?: DataTableState;
  defaultState?: Partial<DataTableState>;
  onStateChange?: (state: DataTableState) => void;
  mode?: "client" | "server";
  totalRows?: number;
  virtualization?: import("./virtual-window").VirtualizationOptions;
  /** 按此顺序显示已有列；不传时显示全部列，空数组允许只保留选择列。 */
  columnKeys?: readonly string[];
  /** 冻结在逻辑起始/结束边；隐藏与未知列忽略，重复列以 start 为准。 */
  pinnedColumns?: { start?: readonly string[]; end?: readonly string[] };
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
  /** 挂载期间保留的批次历史数，默认 50，归一到 1–1000；不持久化。 */
  historyLimit?: number;
  /** 返回错误文字保留草稿或重放机会；void 表示接受，源数据仍由调用方更新。 */
  onBatchCommit?: (details: {
    changes: readonly import("./table-batch").DataTableBatchChange[];
    signal: AbortSignal;
    operation: "apply" | "undo" | "redo";
  }) => void | string | Promise<void | string>;
  onCellCommit?: (details: {
    rowId: string;
    columnKey: string;
    value: string | number;
    previousValue: CellValue | undefined;
    row: Readonly<DataRow>;
    signal: AbortSignal;
  }) => void | string | Promise<void | string>;
}
export const dataTableLabels = (
  labels?: DataTableProps["labels"],
): DataTableLabels => ({
  ...dataColumnLabels(labels),
  rangeHint:
    labels?.rangeHint ??
    "Arrow keys move between cells; Shift extends a range. Enter edits, Ctrl/Cmd+C copies and Ctrl/Cmd+V pastes.",
  rangeSelected:
    labels?.rangeSelected ?? ((count) => `${count} cells selected`),
  pasteInvalid:
    labels?.pasteInvalid ?? "The clipboard is not valid tab-separated text.",
  pasteMismatch:
    labels?.pasteMismatch ??
    "Clipboard rows and columns must fit the selected rectangle.",
  pasteOutside:
    labels?.pasteOutside ?? "The clipboard extends beyond the current page.",
  pasteTooLarge:
    labels?.pasteTooLarge ??
    "Clipboard text exceeds the 10000-cell or 1048576-character limit.",
  pasteReadonly:
    labels?.pasteReadonly ??
    "The paste includes a missing, duplicate or read-only cell.",
  copiedCells: labels?.copiedCells ?? ((count) => `Copied ${count} cells`),
  pastedCells: labels?.pastedCells ?? ((count) => `Pasted ${count} cells`),
  pasteCanceled:
    labels?.pasteCanceled ?? "Paste canceled. No changes were accepted.",
  filter: labels?.filter ?? "Filter rows",
  filterPlaceholder: labels?.filterPlaceholder ?? "Filter rows…",
  filterColumn: labels?.filterColumn ?? ((column) => `Filter ${column}`),
  filterOperator:
    labels?.filterOperator ?? ((column) => `Condition for ${column}`),
  filterOperators: resolveDataFilterLabels(labels?.filterOperators),
  invalidFilter: labels?.invalidFilter ?? "Choose an available condition",
  allOptions: labels?.allOptions ?? "All options",
  sortDescription:
    labels?.sortDescription ??
    ((direction, priority) =>
      `${direction ? `Sorted ${direction === "asc" ? "ascending" : "descending"}, priority ${priority}. ` : ""}Shift+click or Shift+Enter adds another sort column.`),
  selectPage: labels?.selectPage ?? "Select current page",
  selectRow: labels?.selectRow ?? ((id) => "Select " + id),
  empty: labels?.empty ?? "No results",
  previous: labels?.previous ?? "Previous",
  next: labels?.next ?? "Next",
  expandRow: labels?.expandRow ?? ((name) => `Expand ${name}`),
  collapseRow: labels?.collapseRow ?? ((name) => `Collapse ${name}`),
  groupRow:
    labels?.groupRow ??
    ((column, value, count) =>
      `${column}: ${value} · ${count} ${count === 1 ? "row" : "rows"}`),
  filteredAncestors:
    labels?.filteredAncestors ?? "Expanded to show matching descendants",
  loading: labels?.loading ?? "Loading rows…",
  retry: labels?.retry ?? "Retry",
  editCell: labels?.editCell ?? ((column, id) => `Edit ${column} for ${id}`),
  save: labels?.save ?? "Save",
  cancel: labels?.cancel ?? "Cancel",
  saving: labels?.saving ?? "Saving…",
  invalidNumber: labels?.invalidNumber ?? "Enter a finite number",
  invalidOption: labels?.invalidOption ?? "Choose an available option",
  commitError: labels?.commitError ?? "Could not save. Try again.",
  emptyCell: labels?.emptyCell ?? "Empty",
  batchEdit: labels?.batchEdit ?? "Edit selected",
  batchTitle: labels?.batchTitle ?? "Batch edit",
  batchApply: labels?.batchApply ?? "Apply changes",
  batchUndo: labels?.batchUndo ?? "Undo batch",
  batchRedo: labels?.batchRedo ?? "Redo batch",
  batchConflict:
    labels?.batchConflict ?? "Rows changed. Review the current values.",
  batchNoChanges:
    labels?.batchNoChanges ?? "Choose a field and change its value",
  batchCount:
    labels?.batchCount ?? ((count) => `Editing ${count} selected rows`),
  batchEnable: labels?.batchEnable ?? ((column) => `Change ${column}`),
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
  if (props.cellSelection) {
    const rowKey = props.rowKey ?? "id",
      ids = props.data.map((row) => row[rowKey]);
    if (
      ids.some(
        (id) =>
          (typeof id !== "string" && typeof id !== "number") ||
          String(id) === "" ||
          (typeof id === "number" && !Number.isFinite(id)),
      ) ||
      new Set(ids.map(String)).size !== ids.length
    )
      throw Error("DataTable cell selection requires stable unique row IDs");
  }
  const keys = props.columns.map((column) => column.key);
  if (keys.some((key) => !key) || new Set(keys).size !== keys.length)
    throw Error("DataTable requires unique non-empty column keys");
  for (const column of props.columns) {
    const options =
      column.editor?.type === "select" ? column.editor.options : undefined;
    if (
      options &&
      new Set(options.map((option) => option.value)).size !== options.length
    )
      throw Error("DataTable select options require unique values");
  }
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
    ...createDataTableView(
      props.data,
      columns,
      {
        ...state,
        pageSize: props.pageSize,
        rowKey: props.rowKey,
        mode: props.mode,
        totalRows: props.totalRows,
        groupBy: props.groupBy,
        aggregations: props.aggregations,
        tree: props.tree,
        expandedRowIds: props.expandedRowIds,
        defaultExpandedRowIds: props.defaultExpandedRowIds,
      },
      props.columns,
    ),
    columns,
    query: state.query,
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

/** 选择编辑器显示选项名称，保留未知旧值以便调用方迁移。 */
export function dataTableCellText(row: Readonly<DataRow>, column: DataColumn) {
  const value = String(row[column.key] ?? "");
  return column.editor?.type === "select"
    ? (column.editor.options?.find((option) => option.value === value)?.label ??
        value)
    : value;
}

export interface DataTableEditState {
  rowId: string;
  columnKey: string;
  draft: string;
  pending: boolean;
  error?: string;
}
/** 独立草稿，不修改输入数据；所有端共用互斥、取消与过期结果隔离。 */
/** 单格与批量共享解析和校验；业务规则由 column.editor.validate 提供。 */
export function validateDataTableDraft(
  props: DataTableProps,
  column: DataColumn,
  draft: string,
  row: Readonly<DataRow>,
): { value: string | number; error?: string } {
  const labels = dataTableLabels(props.labels),
    value = column.editor?.type === "number" ? Number(draft) : draft;
  try {
    const error =
      typeof value === "number" && (!draft.trim() || !Number.isFinite(value))
        ? labels.invalidNumber
        : column.editor?.type === "select" &&
            !column.editor.options?.some(
              (option) => option.value === value && !option.disabled,
            )
          ? labels.invalidOption
          : column.editor?.validate?.(value, row);
    return { value, error };
  } catch {
    return { value, error: labels.commitError };
  }
}
export function createDataTableEditor(
  notify: (state: DataTableEditState | undefined) => void,
) {
  let state: DataTableEditState | undefined,
    version = 0,
    abort: AbortController | undefined,
    snapshot = "";
  const listeners = new Set<
    (
      focus: "input" | "trigger" | undefined,
      previous: DataTableEditState | undefined,
    ) => void
  >();
  const emit = (
    next: DataTableEditState | undefined,
    focus?: "input" | "trigger",
  ) => {
    const previous = state;
    state = next;
    for (const listener of listeners) listener(focus, previous);
    notify(state);
  };
  const cancel = () => {
    version++;
    abort?.abort();
    abort = undefined;
    if (state) emit(undefined, "trigger");
  };
  const canEdit = (props: DataTableProps, column: DataColumn) =>
    !!props.onCellCommit &&
    !!column.editor &&
    column.key !== (props.rowKey ?? "id") &&
    !props.loading &&
    (column.editor?.type !== "select" ||
      !!column.editor.options?.some((option) => !option.disabled));
  const stamp = (
    props: DataTableProps,
    view: ReturnType<typeof dataTableView>,
    edit: DataTableEditState,
  ) => {
    const entry = view.rows.find(({ id }) => id === edit.rowId);
    const column = view.columns.find(({ key }) => key === edit.columnKey);
    if (
      !entry ||
      entry.structure?.kind === "group" ||
      !column ||
      !canEdit(props, column)
    )
      return undefined;
    return JSON.stringify([
      entry.row,
      view.rows.map(({ id }) => id),
      view.columns.map(({ key }) => key),
      view.query,
      view.sort,
      view.page,
      column.editor?.type,
      column.editor?.options,
      column.editor?.rows,
    ]);
  };
  let validator: NonNullable<DataColumn["editor"]>["validate"];
  return {
    get state() {
      return state;
    },
    canEdit,
    subscribe(
      listener: (
        focus: "input" | "trigger" | undefined,
        previous: DataTableEditState | undefined,
      ) => void,
    ) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    sync(props: DataTableProps, view: ReturnType<typeof dataTableView>) {
      if (!state) return;
      const column = view.columns.find(({ key }) => key === state?.columnKey);
      if (
        stamp(props, view, state) !== snapshot ||
        column?.editor?.validate !== validator
      )
        cancel();
    },
    begin(
      props: DataTableProps,
      view: ReturnType<typeof dataTableView>,
      rowId: string,
      columnKey: string,
    ) {
      if (state?.pending) return;
      const entry = view.rows.find(({ id }) => id === rowId),
        column = view.columns.find(({ key }) => key === columnKey);
      if (
        !entry ||
        entry.structure?.kind === "group" ||
        !column ||
        !canEdit(props, column)
      )
        return;
      cancel();
      const next = {
        rowId,
        columnKey,
        draft: String(entry.row[columnKey] ?? ""),
        pending: false,
      };
      snapshot = stamp(props, view, next)!;
      validator = column.editor?.validate;
      emit(next, "input");
    },
    change(draft: string) {
      if (state && !state.pending) emit({ ...state, draft, error: undefined });
    },
    cancel,
    async save(props: DataTableProps, view: ReturnType<typeof dataTableView>) {
      if (!state || state.pending) return;
      if (stamp(props, view, state) !== snapshot) {
        cancel();
        return;
      }
      const edit = state,
        column = view.columns.find(({ key }) => key === edit.columnKey)!;
      const row = Object.freeze({
        ...view.rows.find(({ id }) => id === edit.rowId)!.row,
      });
      const labels = dataTableLabels(props.labels);
      const { value, error } = validateDataTableDraft(
        props,
        column,
        edit.draft,
        row,
      );
      if (error) {
        emit({ ...edit, error }, "input");
        return;
      }
      const currentVersion = ++version,
        controller = new AbortController();
      abort = controller;
      emit({ ...edit, pending: true, error: undefined });
      // 取消不依赖调用方是否遵守 signal；迟到拒绝也已被消费。
      const result = await new Promise<{ error?: string; canceled?: boolean }>(
        (resolve) => {
          const canceled = () => resolve({ canceled: true });
          controller.signal.addEventListener("abort", canceled, { once: true });
          Promise.resolve()
            .then(() => {
              if (controller.signal.aborted) return;
              return props.onCellCommit?.({
                rowId: edit.rowId,
                columnKey: edit.columnKey,
                value,
                previousValue: row[edit.columnKey],
                row,
                signal: controller.signal,
              });
            })
            .then(
              (message) => resolve({ error: message || undefined }),
              () => resolve({ error: labels.commitError }),
            )
            .finally(() =>
              controller.signal.removeEventListener("abort", canceled),
            );
        },
      );
      if (currentVersion !== version || result.canceled) return;
      abort = undefined;
      if (result.error)
        emit({ ...edit, pending: false, error: result.error }, "input");
      else emit(undefined, "trigger");
    },
    dispose() {
      cancel();
      listeners.clear();
    },
  };
}
/** 仅挂载后处理键盘与焦点，编辑器 DOM 由各框架渲染。 */
export function mountDataTableEditor(
  region: HTMLElement,
  editor: ReturnType<typeof createDataTableEditor>,
  props: () => DataTableProps,
  view: () => ReturnType<typeof dataTableView>,
  blocked: () => boolean = () => false,
  revealCell?: (rowId: string, columnKey: string) => boolean,
) {
  const win = region.ownerDocument.defaultView;
  if (!win) return () => {};
  let frame = 0,
    pendingOwned = false;
  let intent:
    | {
        focus: "input" | "trigger";
        previous: DataTableEditState | undefined;
        origin: Element | null;
      }
    | undefined;
  const restore = () => {
    frame = 0;
    if (!intent) return;
    const { focus, previous } = intent;
    const now = region.ownerDocument.activeElement;
    if (
      !region.isConnected ||
      (now !== region.ownerDocument.body &&
        now !== region.ownerDocument.documentElement &&
        now !== intent.origin)
    ) {
      intent = undefined;
      return;
    }
    if (focus === "input") {
      const input = region.querySelector<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >('[data-part="cell-input"]');
      if (!input || input.disabled || editor.state?.pending) return;
      intent = undefined;
      input.focus({ preventScroll: true });
      input
        .closest<HTMLElement>('[data-part="cell-editor"]')
        ?.scrollIntoView({ block: "nearest", inline: "nearest" });
      if (!editor.state?.error && "select" in input) input.select();
    } else {
      // React can commit after this frame. Keep the intent until the old editor
      // has actually been replaced, rather than focusing a temporary fallback.
      if (region.querySelector('[data-part="cell-editor"]')) return;
      if (previous && !view().rows.some((row) => row.id === previous.rowId)) {
        intent = undefined;
        return;
      }
      const trigger = Array.from(
        region.querySelectorAll<HTMLButtonElement>(
          '[data-part="cell-trigger"]',
        ),
      ).find(
        (element) =>
          element.dataset.rowId === previous?.rowId &&
          element.dataset.columnKey === previous?.columnKey,
      );
      const cell = props().cellSelection
        ? Array.from(
            region.querySelectorAll<HTMLElement>(
              "td[data-cell-row][data-cell-column]",
            ),
          ).find(
            (node) =>
              node.dataset.cellRow === previous?.rowId &&
              node.dataset.cellColumn === previous?.columnKey,
          )
        : undefined;
      const column = view().columns.find(
        (item) => item.key === previous?.columnKey,
      );
      // 窗口外单元格仍存在于完整模型；先揭示目标，再等待框架提交，避免临时聚焦滚动区域。
      if (
        !cell &&
        !trigger &&
        previous &&
        column &&
        (props().cellSelection || editor.canEdit(props(), column)) &&
        revealCell?.(previous.rowId, previous.columnKey)
      )
        return;
      intent = undefined;
      (cell ?? trigger ?? region).focus();
    }
  };
  const schedule = () => {
    if (intent && !frame) frame = win.requestAnimationFrame(restore);
  };
  const observer = new win.MutationObserver(schedule);
  observer.observe(region, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["disabled", "aria-busy"],
  });
  const stop = editor.subscribe((focus, previous) => {
    const active = region.ownerDocument.activeElement;
    if (editor.state?.pending && !previous?.pending)
      pendingOwned = region.contains(active);
    if (!focus) return;
    const owned =
      region.contains(active) ||
      (!!previous?.pending &&
        pendingOwned &&
        active === region.ownerDocument.body);
    win.cancelAnimationFrame(frame);
    frame = 0;
    intent = owned ? { focus, previous, origin: active } : undefined;
    schedule();
  });
  const click = (event: Event) => {
    if (blocked()) return;
    if (!(event.target instanceof win.Element)) return;
    const button = event.target.closest<HTMLButtonElement>("button[data-part]");
    if (!button || !region.contains(button)) return;
    if (button.dataset.part === "cell-trigger")
      editor.begin(
        props(),
        view(),
        button.dataset.rowId!,
        button.dataset.columnKey!,
      );
    if (button.dataset.part === "cell-save") void editor.save(props(), view());
    if (button.dataset.part === "cell-cancel") editor.cancel();
  };
  const input = (event: Event) => {
    if (blocked()) return;
    if (
      (event.target instanceof win.HTMLInputElement ||
        event.target instanceof win.HTMLTextAreaElement ||
        event.target instanceof win.HTMLSelectElement) &&
      event.target.dataset.part === "cell-input"
    )
      editor.change(event.target.value);
  };
  const keydown = (event: KeyboardEvent) => {
    if (
      blocked() ||
      event.isComposing ||
      !(event.target instanceof win.Element) ||
      !event.target.closest('[data-part="cell-editor"]')
    )
      return;
    if (event.key === "Escape") {
      event.preventDefault();
      editor.cancel();
    }
    if (
      event.key === "Enter" &&
      (event.target instanceof win.HTMLInputElement ||
        event.ctrlKey ||
        event.metaKey)
    ) {
      event.preventDefault();
      void editor.save(props(), view());
    }
  };
  region.addEventListener("click", click);
  region.addEventListener("input", input);
  region.addEventListener("change", input);
  region.addEventListener("keydown", keydown);
  return () => {
    stop();
    observer.disconnect();
    intent = undefined;
    win.cancelAnimationFrame(frame);
    region.removeEventListener("click", click);
    region.removeEventListener("input", input);
    region.removeEventListener("change", input);
    region.removeEventListener("keydown", keydown);
    editor.cancel();
  };
}
