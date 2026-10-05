import type {
  DataColumn,
  DataRow,
  DataTableProps,
  DataTableCellRange,
} from "@loongark/kit";
const columns: readonly DataColumn[] = [
  {
    key: "name",
    label: "Project",
    editor: {
      validate: (value) =>
        String(value).trim().length < 3
          ? "Use at least 3 characters"
          : undefined,
    },
  },
  {
    key: "amount",
    label: "Budget",
    align: "end",
    editor: {
      type: "number",
      validate: (value) =>
        Number(value) < 0 ? "Budget cannot be negative" : undefined,
    },
  },
  {
    key: "status",
    label: "Status",
    editor: {
      type: "select",
      options: [
        { value: "active", label: "Active" },
        { value: "paused", label: "Paused" },
        { value: "locked", label: "Locked", disabled: true },
      ],
    },
  },
  { key: "notes", label: "Notes", editor: { type: "textarea", rows: 3 } },
  { key: "id", label: "ID" },
];
const initial = (): readonly DataRow[] =>
  Array.from({ length: 60 }, (_, index) => ({
    id: `project-${index + 1}`,
    name:
      [
        "Alpha release",
        "Beta launch",
        "Gamma workspace",
        "Delta kit",
        "Epsilon docs",
        "Zeta mobile",
      ][index % 6] + (index < 6 ? "" : ` ${index + 1}`),
    amount: 100 + index * 50,
    status: index % 2 ? "paused" : "active",
    notes: index === 1 ? "Review\nwith design" : "Ready for review",
  }));
export function createRangeDemo(changed: () => void) {
  let rows = initial(),
    shown = true,
    rtl = false,
    loading = false,
    virtual = false,
    hidden = false,
    controlled = false,
    reject = false,
    range: DataTableCellRange | null = null,
    fail = false,
    count = 0,
    canceled = 0,
    notice = "No changes saved";
  const snapshot = () => ({
    rows,
    shown,
    rtl,
    loading,
    virtual,
    hidden,
    controlled,
    reject,
    range,
    fail,
    count,
    canceled,
    notice,
  });
  const delay = (signal: AbortSignal) =>
    new Promise<void>((resolve) => {
      const finish = () => {
        signal.removeEventListener("abort", abort);
        resolve();
      };
      const timer = setTimeout(finish, 350);
      const abort = () => {
        clearTimeout(timer);
        canceled++;
        changed();
        finish();
      };
      if (signal.aborted) abort();
      else signal.addEventListener("abort", abort, { once: true });
    });
  const onBatchCommit: NonNullable<DataTableProps["onBatchCommit"]> = async ({
    changes,
    signal,
    operation,
  }) => {
    count++;
    changed();
    await delay(signal);
    if (signal.aborted) return;
    if (fail) {
      fail = false;
      changed();
      return "The batch was rejected. Try again.";
    }
    rows = rows.map((row) =>
      changes
        .filter((cell) => cell.rowId === row.id)
        .reduce<DataRow>((next, cell) => {
          const patched = { ...next };
          if (cell.value === undefined) delete patched[cell.columnKey];
          else patched[cell.columnKey] = cell.value;
          return patched;
        }, row),
    );
    notice = `${operation}: ${changes.length} cells`;
    changed();
  };
  const onCellCommit: NonNullable<DataTableProps["onCellCommit"]> = async ({
    rowId,
    columnKey,
    value,
    signal,
  }) => {
    await delay(signal);
    if (signal.aborted) return;
    rows = rows.map((row) =>
      row.id === rowId ? { ...row, [columnKey]: value } : row,
    );
    notice = `Saved ${columnKey}`;
    changed();
  };
  const onCellRangeChange = (next: DataTableCellRange | null) => {
    if (!reject) range = next;
    changed();
  };
  const actions = [
    {
      label: () => (rtl ? "Use LTR" : "Use RTL"),
      run: () => {
        rtl = !rtl;
        changed();
      },
    },
    {
      label: () =>
        virtual ? "Disable virtualization" : "Enable virtualization",
      run: () => {
        virtual = !virtual;
        changed();
      },
    },
    {
      label: () => "Reset data",
      run: () => {
        rows = initial();
        range = null;
        notice = "No changes saved";
        changed();
      },
    },
    {
      label: () =>
        controlled ? "Use internal selection" : "Use controlled selection",
      run: () => {
        controlled = !controlled;
        changed();
      },
    },
    {
      label: () => (reject ? "Accept selection" : "Reject selection"),
      run: () => {
        reject = !reject;
        changed();
      },
    },
    {
      label: () => "Clear selection",
      run: () => {
        range = null;
        changed();
      },
    },
    {
      label: () => (hidden ? "Show notes" : "Hide notes"),
      run: () => {
        hidden = !hidden;
        changed();
      },
    },
    {
      label: () => (loading ? "Finish loading" : "Start loading"),
      run: () => {
        loading = !loading;
        changed();
      },
    },
    {
      label: () => (shown ? "Hide table" : "Show table"),
      run: () => {
        shown = !shown;
        changed();
      },
    },
    {
      label: () => "Reject next batch",
      run: () => {
        fail = true;
        changed();
      },
    },
    {
      label: () => "Remove first row",
      run: () => {
        rows = rows.filter((row) => row.id !== "project-1");
        changed();
      },
    },
  ];
  return {
    snapshot,
    actions,
    tableProps(state: ReturnType<typeof snapshot>): DataTableProps {
      return {
        label: "Editable project range",
        data: state.rows,
        columns: state.hidden
          ? columns.filter((column) => column.key !== "notes")
          : columns,
        pageSize: state.virtual ? 50 : 6,
        cellSelection: true,
        cellRange: state.controlled ? state.range : undefined,
        loading: state.loading,
        virtualization: state.virtual
          ? { height: 240, estimateSize: 64, overscan: 2 }
          : undefined,
        onCellCommit,
        onBatchCommit,
        onCellRangeChange,
      };
    },
  };
}
