import type {
  CellValue,
  DataColumn,
  DataRow,
  DataTableProps,
} from "@loongark/kit";
const initialColumns: readonly DataColumn[] = Array.from(
  { length: 80 },
  (_, index) => ({
    key: `c${index}`,
    label:
      index === 0 ? "Project" : `Column ${String(index + 1).padStart(2, "0")}`,
    sortable: true,
    editor: { type: "text" },
    ...(index === 40 ? { filter: { type: "text" as const } } : {}),
  }),
);
const initialRows: readonly DataRow[] = Array.from(
  { length: 120 },
  (_, row) => ({
    id: `row-${row}`,
    ...Object.fromEntries(
      initialColumns.map((column, index) => [
        column.key,
        index === 0
          ? `Project ${row + 1}${row % 12 === 0 ? " — A longer title that wraps across lines" : ""}`
          : `R${row + 1} · C${index + 1}`,
      ]),
    ),
  }),
);
export function createTableColumnWindowDemo(changed: () => void) {
  let data = initialRows,
    columns = initialColumns,
    rtl = false,
    pinned = true,
    shown = true,
    virtual = true,
    index: number | undefined,
    reject = false,
    held = false,
    status = "No changes saved";
  const heldRequests = new Set<() => void>();
  const wait = (signal: AbortSignal) =>
    new Promise<void>((resolve) => {
      let timer: ReturnType<typeof setTimeout> | undefined;
      const finish = () => {
        if (timer !== undefined) clearTimeout(timer);
        heldRequests.delete(finish);
        signal.removeEventListener("abort", finish);
        resolve();
      };
      if (held) heldRequests.add(finish);
      else timer = setTimeout(finish, 250);
      if (signal.aborted) finish();
      else signal.addEventListener("abort", finish, { once: true });
    });
  const apply = (
    rowId: string,
    columnKey: string,
    value: CellValue | undefined,
  ) => {
    data = data.map((row) => {
      if (row.id !== rowId) return row;
      const next = { ...row };
      if (value === undefined) delete next[columnKey];
      else next[columnKey] = value;
      return next;
    });
  };
  const onCellCommit: NonNullable<DataTableProps["onCellCommit"]> = async ({
    rowId,
    columnKey,
    value,
    signal,
  }) => {
    await wait(signal);
    if (signal.aborted) return;
    if (reject) throw Error("Updates are paused");
    apply(rowId, columnKey, value);
    status = `Saved ${columnKey} for ${rowId}`;
    changed();
  };
  const onBatchCommit: NonNullable<DataTableProps["onBatchCommit"]> = async ({
    changes,
    signal,
    operation,
  }) => {
    await wait(signal);
    if (signal.aborted) return;
    if (reject) throw Error("Updates are paused");
    for (const change of changes)
      apply(change.rowId, change.columnKey, change.value);
    status = `${operation}: ${changes.length} changes`;
    changed();
  };
  return {
    get state() {
      return {
        data,
        columns,
        rtl,
        pinned,
        shown,
        virtual,
        index,
        reject,
        held,
        status,
      };
    },
    onCellCommit,
    onBatchCommit,
    jumpMiddle() {
      index = 40;
      changed();
    },
    jumpFirst() {
      index = 0;
      changed();
    },
    toggleRtl() {
      rtl = !rtl;
      changed();
    },
    togglePins() {
      pinned = !pinned;
      changed();
    },
    toggleShown() {
      shown = !shown;
      changed();
    },
    toggleVirtual() {
      virtual = !virtual;
      changed();
    },
    toggleReject() {
      reject = !reject;
      changed();
    },
    toggleHold() {
      held = !held;
      if (!held) for (const finish of [...heldRequests]) finish();
      changed();
    },
    removeMiddle() {
      columns = columns.filter((column) => column.key !== "c40");
      changed();
    },
    onColumnKeysChange(keys: string[]) {
      status = `Order: ${keys.join(",")}`;
      changed();
    },
    onColumnWidthsChange(widths: Record<string, number>) {
      status = `Width: ${Object.entries(widths)
        .filter(([, width]) => width !== 160)
        .map(([key, width]) => `${key}=${width}`)
        .join(",")}`;
      changed();
    },
  };
}
