import type {
  VirtualGridCellDetails,
  VirtualMasonryEntry,
} from "@loongark/kit";
const sequence = (prefix: string, count: number) =>
  Array.from({ length: count }, (_, index) => `${prefix}${index}`);
export function createVirtualLayoutDemo(changed: () => void) {
  let rows = sequence("row-", 10000),
    columns = sequence("column-", 80),
    items = sequence("item-", 10000),
    rtl = false,
    narrow = false,
    shown = true,
    index: number | undefined;
  let empty = false,
    savedRows = rows,
    savedItems = items;
  const notes = new Map<string, string>(),
    expanded = new Set<string>();
  return {
    get state() {
      return { rows, columns, items, rtl, narrow, shown, index, empty };
    },
    rowSize: (key: string) => (Number(key.slice(4)) % 5 ? 48 : 72),
    note: (details: VirtualGridCellDetails) => notes.get(details.rowKey) ?? "",
    updateNote(details: VirtualGridCellDetails, value: string) {
      notes.set(details.rowKey, value);
      changed();
    },
    title: (entry: VirtualMasonryEntry) =>
      `Collection item ${entry.index + 1}${Number(entry.key.slice(5)) % 7 === 0 ? " — a longer title that wraps across lines" : ""}`,
    body(entry: VirtualMasonryEntry) {
      const count =
        (Number(entry.key.slice(entry.key.lastIndexOf("-") + 1)) % 4) +
        1 +
        (expanded.has(entry.key) ? 4 : 0);
      return Array(count)
        .fill(
          "Notes, references and ideas stay in their original reading order.",
        )
        .join(" ");
    },
    isExpanded: (key: string) => expanded.has(key),
    toggleItem(key: string) {
      if (expanded.has(key)) expanded.delete(key);
      else expanded.add(key);
      changed();
    },
    jumpMiddle() {
      index = 5000;
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
    toggleNarrow() {
      narrow = !narrow;
      changed();
    },
    toggleShown() {
      shown = !shown;
      changed();
    },
    toggleData() {
      if (empty) {
        rows = savedRows;
        items = savedItems;
      } else {
        savedRows = rows;
        savedItems = items;
        rows = [];
        items = [];
      }
      empty = !empty;
      changed();
    },
    prepend() {
      const key = `added-${rows.length}`;
      rows = [key, ...rows];
      items = [key, ...items];
      changed();
    },
    removeLast() {
      rows = rows.slice(0, -1);
      items = items.slice(0, -1);
      changed();
    },
    removeFirst() {
      rows = rows.slice(1);
      items = items.slice(1);
      changed();
    },
  };
}
