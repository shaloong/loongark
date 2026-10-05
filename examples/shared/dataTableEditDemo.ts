import type { DataColumn, DataRow, DataTableProps } from "@loongark/kit";
export const editableColumns: readonly DataColumn[] = [
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
  { key: "owner", label: "Owner", align: "center", sortable: false },
  {
    key: "amount",
    label: "Revenue",
    align: "end",
    editor: {
      type: "number",
      validate: (value) =>
        Number(value) < 0 ? "Revenue cannot be negative" : undefined,
    },
  },
];
export function createDataTableEditDemo(changed: () => void) {
  let rows: readonly DataRow[] = [
    { id: "alpha", name: "Alpha release", owner: "Design", amount: 2400 },
    {
      id: "beta",
      name: "Accessible component documentation",
      owner: "Platform",
      amount: 1800,
    },
    { id: "gamma", name: "Mobile workspace", owner: "Design", amount: 900 },
  ];
  let shown = true,
    rtl = false,
    hidden = false,
    loading = false,
    fail = false,
    canceled = 0,
    saved = "No changes saved";
  const onCellCommit: NonNullable<DataTableProps["onCellCommit"]> = async ({
    rowId,
    columnKey,
    value,
    signal,
  }) => {
    await new Promise<void>((resolve) => {
      const finish = () => {
        signal.removeEventListener("abort", abort);
        resolve();
      };
      const timer = setTimeout(finish, 700);
      const abort = () => {
        clearTimeout(timer);
        canceled++;
        changed();
        finish();
      };
      if (signal.aborted) abort();
      else signal.addEventListener("abort", abort, { once: true });
    });
    if (signal.aborted) return;
    if (fail) {
      fail = false;
      changed();
      throw Error("simulated failure");
    }
    if (value === "reserved") return "This project name is reserved";
    rows = rows.map((row) =>
      row.id === rowId ? { ...row, [columnKey]: value } : row,
    );
    saved = `Saved ${columnKey} for ${rowId}: ${value}`;
    changed();
  };
  return {
    get state() {
      return { rows, shown, rtl, hidden, loading, fail, canceled, saved };
    },
    onCellCommit,
    failNext() {
      fail = true;
      changed();
    },
    removeFirst() {
      rows = rows.filter((row) => row.id !== "alpha");
      changed();
    },
    toggleRevenue() {
      hidden = !hidden;
      changed();
    },
    toggleRtl() {
      rtl = !rtl;
      changed();
    },
    toggleLoading() {
      loading = !loading;
      changed();
    },
    toggleShown() {
      shown = !shown;
      changed();
    },
  };
}
