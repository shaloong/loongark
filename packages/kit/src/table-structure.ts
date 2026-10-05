import type { CellValue, DataColumn, DataRow } from "./data-models";
import { controlIcons } from "./icon";

export type DataTableAggregation = "sum" | "average" | "min" | "max" | "count";
export interface DataTableStructureOptions {
  /** 客户端分组字段，按顺序形成层级；不与 tree 同时使用。 */
  groupBy?: readonly string[];
  aggregations?: Readonly<Record<string, DataTableAggregation>>;
  /** 使用标量父 ID；缺失父行显示为根，不复制业务嵌套数据。 */
  tree?: { parentKey: string };
  expandedRowIds?: readonly string[];
  defaultExpandedRowIds?: readonly string[];
  pageSize?: number;
  page?: number;
  mode?: "client" | "server";
  totalRows?: number;
}
export interface DataTableRowEntry {
  id: string;
  row: DataRow;
  index: number;
  structure?: {
    kind: "group" | "tree" | "row";
    depth: number;
    expandable: boolean;
    expanded: boolean;
    count?: number;
    column?: string;
    value?: CellValue;
  };
}
const dataCell = (row: DataRow, key: string) =>
  Object.prototype.hasOwnProperty.call(row, key) ? row[key] : undefined;

export const dataTableGroupId = (
  path: readonly (readonly [string, CellValue | undefined])[],
) =>
  `group:${JSON.stringify(path.map(([key, value]) => [key, value == null ? ["empty"] : [typeof value, String(value)]]))}`;
export function aggregateDataRows(
  rows: readonly DataTableRowEntry[],
  key: string,
  operation: DataTableAggregation,
): CellValue {
  if (operation === "count") return rows.length;
  let count = 0,
    sum = 0,
    mean = 0,
    low = Infinity,
    high = -Infinity;
  for (const { row } of rows) {
    const value = dataCell(row, key);
    if (typeof value !== "number" || !Number.isFinite(value)) continue;
    count++;
    sum += value;
    mean = mean * ((count - 1) / count) + value / count;
    low = Math.min(low, value);
    high = Math.max(high, value);
  }
  if (!count) return null;
  const result =
    operation === "sum"
      ? sum
      : operation === "average"
        ? mean
        : operation === "min"
          ? low
          : high;
  return Number.isFinite(result) ? result : null;
}
export function createDataTableStructure(
  source: readonly DataTableRowEntry[],
  matched: readonly DataTableRowEntry[],
  columns: readonly DataColumn[],
  options: DataTableStructureOptions,
  compare: (left: DataTableRowEntry, right: DataTableRowEntry) => number,
  filterActive = matched.length !== source.length,
) {
  const groups = [...new Set(options.groupBy ?? [])],
    known = new Set(columns.map((column) => column.key));
  if (groups.some((key) => !known.has(key)))
    throw Error("DataTable groupBy requires existing column keys");
  if (groups.length && options.tree)
    throw Error("DataTable grouping and tree are mutually exclusive");
  if (groups.length && options.mode === "server")
    throw Error(
      "Server DataTable cannot infer full-dataset groups or aggregates",
    );
  for (const [key, operation] of Object.entries(options.aggregations ?? {})) {
    if (
      !known.has(key) ||
      !["sum", "average", "min", "max", "count"].includes(operation)
    )
      throw Error(
        "DataTable aggregations require existing keys and supported operations",
      );
  }
  if (Object.keys(options.aggregations ?? {}).length && !groups.length)
    throw Error("DataTable aggregations require grouping");
  const validExpandable = new Set<string>(),
    forcedOpen = new Set<string>();
  const children = new Map<string | undefined, DataTableRowEntry[]>(),
    expandable = new Set<string>();
  const parent = new Map<string, string | undefined>(),
    entries = new Map(source.map((entry) => [entry.id, entry]));
  const add = (parentId: string | undefined, entry: DataTableRowEntry) => {
    const list = children.get(parentId) ?? [];
    list.push(entry);
    children.set(parentId, list);
    parent.set(entry.id, parentId);
    if (parentId !== undefined) expandable.add(parentId);
  };
  if (groups.length) {
    type Work = {
      rows: readonly DataTableRowEntry[];
      depth: number;
      path: readonly (readonly [string, CellValue | undefined])[];
      parentId?: string;
    };
    // 所有数据中的分组 ID 用于保留筛选隐藏的展开状态。
    for (const entry of source) {
      const path: (readonly [string, CellValue | undefined])[] = [];
      for (const key of groups) {
        path.push([key, dataCell(entry.row, key)]);
        const id = dataTableGroupId(path);
        if (entries.has(id))
          throw Error("DataTable row ID conflicts with an opaque group ID");
        validExpandable.add(id);
      }
    }
    const work: Work[] = [{ rows: matched, depth: 0, path: [] }];
    while (work.length) {
      const current = work.pop()!;
      if (current.depth === groups.length) {
        for (const entry of current.rows) add(current.parentId, { ...entry });
        continue;
      }
      const key = groups[current.depth],
        buckets = new Map<
          string,
          { value: CellValue | undefined; rows: DataTableRowEntry[] }
        >();
      for (const entry of current.rows) {
        const value = dataCell(entry.row, key),
          id = dataTableGroupId([[key, value]]);
        let bucket = buckets.get(id);
        if (!bucket) {
          bucket = { value, rows: [] };
          buckets.set(id, bucket);
        }
        bucket.rows.push(entry);
      }
      const next: Work[] = [];
      for (const { value, rows } of buckets.values()) {
        const path = [...current.path, [key, value] as const],
          id = dataTableGroupId(path);
        if (entries.has(id))
          throw Error("DataTable row ID conflicts with an opaque group ID");
        const row = Object.fromEntries([
          ...path,
          ...Object.entries(options.aggregations ?? {}).map(
            ([column, operation]) => [
              column,
              aggregateDataRows(rows, column, operation),
            ],
          ),
        ]);
        const entry: DataTableRowEntry = {
          id,
          row,
          index: -1,
          structure: {
            kind: "group",
            depth: current.depth,
            expandable: true,
            expanded: false,
            count: rows.length,
            column: key,
            value: value ?? null,
          },
        };
        entries.set(id, entry);
        add(current.parentId, entry);
        expandable.add(id);
        next.push({ rows, depth: current.depth + 1, path, parentId: id });
      }
      work.push(...next.reverse());
    }
    for (const list of children.values()) list.sort(compare);
  } else if (options.tree) {
    const parentKey = options.tree.parentKey;
    if (!parentKey.trim())
      throw Error("DataTable tree requires a non-empty parentKey");
    for (const entry of source) {
      const value = dataCell(entry.row, parentKey),
        id = value == null || value === "" ? undefined : String(value);
      parent.set(
        entry.id,
        id !== undefined && entries.has(id) ? id : undefined,
      );
    }
    const finished = new Set<string>();
    for (const entry of source) {
      const trail = new Set<string>();
      let id: string | undefined = entry.id;
      while (id !== undefined && !finished.has(id)) {
        if (trail.has(id))
          throw Error("DataTable tree contains a parent cycle");
        trail.add(id);
        id = parent.get(id);
      }
      for (const item of trail) finished.add(item);
    }
    for (const id of parent.values())
      if (id !== undefined) validExpandable.add(id);
    const filtered = options.mode !== "server" && filterActive;
    const included = new Set(matched.map((entry) => entry.id));
    const visitedAncestors = new Set<string>();
    for (const entry of matched) {
      let id = parent.get(entry.id);
      while (id !== undefined && !visitedAncestors.has(id)) {
        visitedAncestors.add(id);
        included.add(id);
        if (filtered) forcedOpen.add(id);
        id = parent.get(id);
      }
    }
    for (const entry of source)
      if (included.has(entry.id)) add(parent.get(entry.id), { ...entry });
    if (options.mode !== "server")
      for (const list of children.values()) list.sort(compare);
  } else {
    for (const entry of matched) add(undefined, { ...entry });
  }
  const requested =
    options.expandedRowIds ??
    options.defaultExpandedRowIds ??
    (groups.length ? [...validExpandable] : []);
  const expanded = [...new Set(requested)].filter((id) =>
      options.mode === "server" ? id !== "" : validExpandable.has(id),
    ),
    expandedSet = new Set([...expanded, ...forcedOpen]);
  const roots = children.get(undefined) ?? [],
    pageSize = Math.max(
      1,
      Math.floor(Number.isFinite(options.pageSize) ? options.pageSize! : 10),
    );
  const rootCount =
    options.mode === "server" && Number.isFinite(options.totalRows)
      ? Math.max(0, Math.floor(options.totalRows!))
      : roots.length;
  const pageCount = Math.max(1, Math.ceil(rootCount / pageSize)),
    page = Math.min(
      pageCount,
      Math.max(
        1,
        Math.floor(Number.isFinite(options.page) ? options.page! : 1),
      ),
    );
  const window =
    options.mode === "server"
      ? roots
      : roots.slice((page - 1) * pageSize, page * pageSize);
  const rows: DataTableRowEntry[] = [],
    pending = window.map((entry) => ({ entry, depth: 0 })).reverse();
  while (pending.length) {
    const { entry, depth } = pending.pop()!,
      hasChildren = expandable.has(entry.id),
      open = expandedSet.has(entry.id);
    rows.push({
      ...entry,
      structure: entry.structure
        ? { ...entry.structure, expanded: open }
        : {
            kind: options.tree ? "tree" : "row",
            depth,
            expandable: hasChildren,
            expanded: open,
          },
    });
    if (open)
      for (const child of [...(children.get(entry.id) ?? [])].reverse())
        pending.push({ entry: child, depth: depth + 1 });
  }
  return {
    rows,
    expandedRowIds: expanded,
    expandableRowIds: [...validExpandable],
    parentRowIds: parent,
    forcedExpandedRowIds: [...forcedOpen],
    page,
    pageCount,
    total: options.mode === "server" ? rootCount : matched.length,
  };
}

export interface DataTableStructureLabels {
  expandRow: (name: string) => string;
  collapseRow: (name: string) => string;
  groupRow: (column: string, value: string, count: number) => string;
  filteredAncestors: string;
}
const escapeStructure = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
export function dataTableGroupText(
  entry: DataTableRowEntry,
  column: DataColumn,
  first: boolean,
  labels: DataTableStructureLabels,
  options: import("./data-table").DataTableProps,
) {
  const aggregated = Object.prototype.hasOwnProperty.call(
    options.aggregations ?? {},
    column.key,
  );
  const value = dataCell(entry.row, column.key),
    aggregateText = value == null ? "—" : String(value);
  if (first) {
    const text = labels.groupRow(
      options.columns.find((item) => item.key === entry.structure?.column)
        ?.label ??
        entry.structure?.column ??
        "",
      String(entry.structure?.value ?? "—"),
      entry.structure?.count ?? 0,
    );
    return aggregated ? `${text} · ${column.label}: ${aggregateText}` : text;
  }
  return aggregated ? aggregateText : "";
}
/** 原生按钮在 SSR 中就有展开语义；所有框架复用同一标记与委托交互。 */
export function renderDataTableRowPrefix(
  entry: DataTableRowEntry,
  options: import("./data-table").DataTableProps,
  view: ReturnType<typeof import("./data-table").dataTableView>,
  labels: DataTableStructureLabels,
) {
  if (!entry.structure) return "";
  if (!entry.structure.expandable)
    return '<span data-part="row-indent" aria-hidden="true"></span>';
  const groupColumn = options.columns.find(
    (column) => column.key === entry.structure?.column,
  );
  const name =
    entry.structure.kind === "group"
      ? labels.groupRow(
          groupColumn?.label ?? entry.structure.column ?? "",
          String(entry.structure.value ?? "—"),
          entry.structure.count ?? 0,
        )
      : entry.id;
  const locked =
    options.loading || view.forcedExpandedRowIds.includes(entry.id);
  const nodes = entry.structure.expanded
    ? controlIcons.chevronDown
    : controlIcons.chevronRight;
  const icon = nodes
    .map(
      ([tag, attrs]) =>
        `<${tag} ${Object.entries(attrs)
          .filter(([key]) => key !== "key")
          .map(([key, value]) => `${key}="${escapeStructure(String(value))}"`)
          .join(" ")}/>`,
    )
    .join("");
  return `<button type="button" data-part="row-expand" data-row-id="${escapeStructure(entry.id)}" aria-expanded="${entry.structure.expanded}" aria-label="${escapeStructure(entry.structure.expanded ? labels.collapseRow(name) : labels.expandRow(name))}" ${locked ? "disabled" : ""} ${view.forcedExpandedRowIds.includes(entry.id) ? `title="${escapeStructure(labels.filteredAncestors)}"` : ""}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" ${entry.structure.expanded ? "" : 'data-mirror-rtl="true"'}>${icon}</svg></button>`;
}
/** 保留外部焦点；数据更新或折叠移除焦点行时恢复最近仍可见的祖先。 */
export function mountDataTableStructure(
  region: HTMLElement,
  get: () => {
    props: import("./data-table").DataTableProps;
    view: ReturnType<typeof import("./data-table").dataTableView>;
  },
  change: (ids: string[]) => void,
) {
  const document = region.ownerDocument,
    win = document.defaultView;
  if (!win) return () => {};
  let disposed = false,
    frame = 0;
  let focused:
    { node: HTMLElement; id: string; ancestors: string[] } | undefined;
  const remember = (event: Event) => {
    if (!(event.target instanceof win.HTMLElement)) return;
    if (!region.contains(event.target)) {
      focused = undefined;
      return;
    }
    const row = event.target.closest<HTMLElement>("tr[data-row-id]");
    if (!row) {
      focused = undefined;
      return;
    }
    const id = row.dataset.rowId!,
      ancestors: string[] = [],
      seen = new Set<string>();
    const { view } = get();
    let parent = view.parentRowIds.get(id);
    while (parent !== undefined && !seen.has(parent)) {
      seen.add(parent);
      ancestors.push(parent);
      parent = view.parentRowIds.get(parent);
    }
    focused = { node: event.target, id, ancestors };
  };
  const outside = (event: Event) => {
    if (event.target instanceof win.Node && !region.contains(event.target))
      focused = undefined;
  };
  const restore = () => {
    frame = 0;
    if (disposed || !focused || focused.node.isConnected || !region.isConnected)
      return;
    const active = document.activeElement;
    if (active !== document.body && active !== document.documentElement) return;
    const { view } = get();
    const visible = new Set(view.rows.map((row) => row.id));
    const sameRow = visible.has(focused.id);
    // 展开标记重绘会替换原生按钮；普通单元格仍由编辑/虚拟窗口控制器恢复。
    if (sameRow && focused.node.dataset.part !== "row-expand") return;
    const id = sameRow
      ? focused.id
      : focused.ancestors.find((id) => visible.has(id));
    const target = Array.from(
      region.querySelectorAll<HTMLElement>('[data-part="row-expand"]'),
    ).find(
      (node) => node.dataset.rowId === id && !node.hasAttribute("disabled"),
    );
    focused = undefined;
    (target ?? region).focus({ preventScroll: true });
  };
  const schedule = () => {
    if (!disposed && !frame) frame = win.requestAnimationFrame(restore);
  };
  const click = (event: Event) => {
    if (!(event.target instanceof win.Element)) return;
    const button = event.target.closest<HTMLButtonElement>(
      '[data-part="row-expand"]',
    );
    if (!button || !region.contains(button) || button.disabled) return;
    const { props, view } = get(),
      id = button.dataset.rowId!;
    if (
      props.loading ||
      view.forcedExpandedRowIds.includes(id) ||
      !view.expandableRowIds.includes(id)
    )
      return;
    const expanded = new Set(view.expandedRowIds);
    if (expanded.has(id)) expanded.delete(id);
    else expanded.add(id);
    change([...expanded]);
    schedule();
  };
  const observer = new win.MutationObserver(schedule);
  observer.observe(region, { childList: true, subtree: true });
  region.addEventListener("click", click);
  document.addEventListener("focusin", remember);
  document.addEventListener("pointerdown", outside, true);
  return () => {
    disposed = true;
    observer.disconnect();
    win.cancelAnimationFrame(frame);
    focused = undefined;
    region.removeEventListener("click", click);
    document.removeEventListener("focusin", remember);
    document.removeEventListener("pointerdown", outside, true);
  };
}
