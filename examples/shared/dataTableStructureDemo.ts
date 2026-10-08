import {
  dataTableGroupId,
  type DataColumn,
  type DataRow,
  type DataTableProps,
  type DataTableState,
} from "@loongark/kit";
export const structureColumns: readonly DataColumn[] = [
  {
    key: "name",
    label: "Project",
    filter: { type: "text" },
    editor: { type: "text" },
  },
  { key: "team", label: "Team", filter: { type: "text" } },
  {
    key: "budget",
    label: "Budget",
    align: "end",
    filter: { type: "number" },
    editor: { type: "number" },
  },
];
const initialRows = (): DataRow[] => [
  {
    id: "atlas",
    name: "Atlas design system",
    team: "Design",
    budget: 1000,
    parent: null,
  },
  {
    id: "tokens",
    name: "Shared tokens",
    team: "Design",
    budget: 1200,
    parent: "atlas",
  },
  {
    id: "accessibility",
    name: "Accessibility review",
    team: "Design",
    budget: 800,
    parent: "atlas",
  },
  {
    id: "mobile",
    name: "Mobile workspace",
    team: "Platform",
    budget: 2000,
    parent: null,
  },
  {
    id: "mobile-check",
    name: "Mobile keyboard checks",
    team: "Platform",
    budget: 600,
    parent: "mobile",
  },
  {
    id: "docs",
    name: "Documentation with a longer project description",
    team: "Operations",
    budget: 400,
    parent: "missing-parent",
  },
];
const groupIds = () =>
  ["Design", "Platform", "Operations"].map((team) =>
    dataTableGroupId([["team", team]]),
  );
export function createStructureDemo(notify: () => void) {
  let kind: "group" | "tree" = "group",
    rows = initialRows(),
    expanded = groupIds(),
    selected: string[] = [];
  let state: DataTableState = { query: "", page: 1 },
    changes = 0,
    reject = false,
    controlled = true,
    loading = false,
    shown = true,
    virtual = false,
    rtl = false;
  const publish = () => notify();
  const demo = {
    get snapshot() {
      return {
        kind,
        rows,
        expanded,
        selected,
        state,
        changes,
        reject,
        controlled,
        loading,
        shown,
        virtual,
        rtl,
      };
    },
    toggleKind() {
      kind = kind === "group" ? "tree" : "group";
      expanded = kind === "group" ? groupIds() : ["atlas", "mobile"];
      state = { query: "", page: 1 };
      selected = [];
      publish();
    },
    toggleReject() {
      reject = !reject;
      publish();
    },
    toggleControlled() {
      controlled = !controlled;
      publish();
    },
    toggleLoading() {
      loading = !loading;
      publish();
    },
    toggleShown() {
      shown = !shown;
      publish();
    },
    toggleVirtual() {
      virtual = !virtual;
      publish();
    },
    toggleRtl() {
      rtl = !rtl;
      publish();
    },
    collapseAll() {
      expanded = [];
      publish();
    },
    expandAll() {
      expanded = kind === "group" ? groupIds() : ["atlas", "mobile"];
      publish();
    },
    removeChild() {
      rows = rows.filter((row) => row.id !== "tokens");
      publish();
    },
    reset() {
      rows = initialRows();
      state = { query: "", page: 1 };
      expanded = kind === "group" ? groupIds() : ["atlas", "mobile"];
      selected = [];
      reject = false;
      loading = false;
      publish();
    },
    tableProps(snapshot: {
      kind: "group" | "tree";
      rows: DataRow[];
      expanded: string[];
      selected: string[];
      state: DataTableState;
      controlled: boolean;
      loading: boolean;
      virtual: boolean;
    }): DataTableProps {
      return {
        data: snapshot.rows,
        columns: structureColumns,
        label: "Structured projects",
        pageSize: 2,
        groupBy: snapshot.kind === "group" ? ["team"] : undefined,
        aggregations: snapshot.kind === "group" ? { budget: "sum" } : undefined,
        tree: snapshot.kind === "tree" ? { parentKey: "parent" } : undefined,
        expandedRowIds: snapshot.controlled ? snapshot.expanded : undefined,
        defaultExpandedRowIds:
          snapshot.kind === "group" ? groupIds() : ["atlas", "mobile"],
        selectedIds: snapshot.selected,
        state: snapshot.state,
        loading: snapshot.loading,
        virtualization: snapshot.virtual
          ? { height: 280, estimateSize: 48, overscan: 1 }
          : undefined,
        onExpandedRowIdsChange(ids) {
          changes++;
          if (!reject) expanded = [...ids];
          publish();
        },
        onSelectionChange(ids) {
          selected = [...ids];
          publish();
        },
        onStateChange(next) {
          state = next;
          publish();
        },
        onCellCommit({ rowId, columnKey, value }) {
          rows = rows.map((row) =>
            row.id === rowId ? { ...row, [columnKey]: value } : row,
          );
          publish();
        },
      };
    },
  };
  return demo;
}
