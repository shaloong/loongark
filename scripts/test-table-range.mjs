import assert from "node:assert/strict";
import {
  createDataTablePaste,
  resolveDataTableCellRange,
  parseDataTableClipboard,
  formatDataTableClipboard,
  dataTableCellSelectionView,
  copyDataTableCellRange,
  createDataTableBatchEditor,
  dataTableView,
  renderDataTableRangeCell,
} from "../packages/kit/dist/index.js";
const columns = [
  { key: "name", label: "Name", editor: { type: "text" } },
  {
    key: "value",
    label: "Value",
    editor: {
      type: "number",
      validate: (value) => (value < 0 ? "Negative value" : undefined),
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
  { key: "note", label: "Note", editor: { type: "textarea" } },
  { key: "id", label: "ID" },
];
let data = [
  { id: "a", name: "A", value: 1, status: "active", note: "Line1\nLine2" },
  { id: "b", name: "B", value: 2, status: "paused", note: "" },
  { id: "c", name: "C", value: 3, status: "active", note: "" },
];
const cell = (rowId, columnKey) => ({ rowId, columnKey }),
  range = (anchor, focus = anchor) => ({ anchor, focus });
let view = dataTableView(
  { data, columns, cellSelection: true },
  { query: "", page: 1 },
);
const bounds = resolveDataTableCellRange(
  view,
  range(cell("b", "value"), cell("a", "name")),
);
assert.equal(bounds.count, 4);
assert.deepEqual(
  [bounds.top, bounds.bottom, bounds.left, bounds.right],
  [0, 1, 0, 1],
);
const copied = range(cell("a", "name"));
const immutable = copyDataTableCellRange(copied);
copied.anchor.rowId = "changed";
assert.equal(immutable.anchor.rowId, "a");
let pasted = createDataTablePaste(
  view,
  range(cell("a", "name")),
  "X\t9\r\nY\t10\r\n",
);
assert.deepEqual(pasted.cells, [
  { rowId: "a", columnKey: "name", draft: "X" },
  { rowId: "a", columnKey: "value", draft: "9" },
  { rowId: "b", columnKey: "name", draft: "Y" },
  { rowId: "b", columnKey: "value", draft: "10" },
]);
assert.equal(
  createDataTablePaste(view, range(cell("b", "value"), cell("a", "name")), "z")
    .cells.length,
  4,
);
assert.throws(
  () => createDataTablePaste(view, range(cell("c", "id")), "x\ty"),
  /pasteOutside/,
);
assert.throws(
  () =>
    createDataTablePaste(
      view,
      range(cell("a", "name"), cell("c", "value")),
      "1\t2\n3\t4",
    ),
  /pasteMismatch/,
);
assert.equal(
  resolveDataTableCellRange(view, range(cell("missing", "name"))),
  undefined,
);
assert.deepEqual(parseDataTableClipboard("a\nb\tc"), [
  ["a", ""],
  ["b", "c"],
]);
assert.deepEqual(parseDataTableClipboard(""), [[""]]);
assert.deepEqual(parseDataTableClipboard("\r\n\r\n"), [[""], [""]]);
assert.throws(() => parseDataTableClipboard('"a'), /pasteInvalid/);
assert.throws(() => parseDataTableClipboard('"a"b'), /pasteInvalid/);
assert.throws(
  () => parseDataTableClipboard("a\t".repeat(10000)),
  /pasteTooLarge/,
);
assert.throws(
  () => parseDataTableClipboard("x".repeat(1048577)),
  /pasteTooLarge/,
);
const matrix = [["line1\nline2", 'quote "value"', "tab\tvalue", ""]];
assert.deepEqual(
  parseDataTableClipboard(formatDataTableClipboard(matrix)),
  matrix,
);
const clear = dataTableCellSelectionView(
  {
    data,
    columns,
    cellSelection: true,
    cellRange: null,
    defaultCellRange: range(cell("b", "name")),
  },
  view,
);
assert.equal(clear.attributes("b", "name")["aria-selected"], false);
assert.equal(clear.attributes("a", "name").tabIndex, 0);
const selected = dataTableCellSelectionView(
  {
    data,
    columns,
    cellSelection: true,
    cellRange: range(cell("b", "value"), cell("a", "name")),
  },
  view,
);
assert.equal(selected.attributes("a", "name")["aria-selected"], true);
assert.equal(selected.attributes("c", "name")["aria-selected"], false);
assert.equal(selected.attributes("b", "value")["aria-colindex"], 3);
assert.throws(
  () =>
    dataTableView(
      { data: [{ name: "Missing ID" }], columns, cellSelection: true },
      { query: "", page: 1 },
    ),
  /stable unique/,
);
const groupView = dataTableView(
  { data, columns, groupBy: ["status"] },
  { query: "", page: 1 },
);
assert.equal(
  resolveDataTableCellRange(
    groupView,
    range(cell(groupView.rows[0].id, "name")),
  ),
  undefined,
);
const markup = renderDataTableRangeCell(
  { data, columns },
  { name: "<script>unsafe</script>" },
  columns[0],
  '"row',
  false,
);
assert(markup.includes("&lt;script&gt;"));
assert(!markup.includes("<script>"));
assert(markup.includes('tabindex="-1"'));
assert(markup.includes('aria-hidden="true"'));
let calls = [];
let reject = false;
const batch = createDataTableBatchEditor(() => {});
const onBatchCommit = (details) => {
  calls.push(details);
  if (reject) return "Rejected transaction";
  for (const change of details.changes)
    data = data.map((row) =>
      row.id === change.rowId
        ? { ...row, [change.columnKey]: change.value }
        : row,
    );
  batch.sync(props(), []);
};
const props = () => ({ data, columns, cellSelection: true, onBatchCommit });
assert.equal(await batch.saveCells(props(), pasted.cells), "applied");
assert.equal(calls.length, 1);
assert.equal(calls[0].changes.length, 4);
assert(Object.isFrozen(calls[0].changes));
assert(Object.isFrozen(calls[0].changes[0]));
assert(Object.isFrozen(calls[0].changes[0].row));
assert.equal(batch.state.undoCount, 1);
await batch.saveCells(props(), [
  { rowId: "a", columnKey: "name", draft: "Should not commit" },
  { rowId: "b", columnKey: "value", draft: "-1" },
]);
assert.equal(calls.length, 1);
assert.equal(data[0].name, "X");
assert.equal(batch.state.undoCount, 1);
await batch.saveCells(props(), [{ rowId: "a", columnKey: "id", draft: "new" }]);
assert.equal(calls.length, 1);
await batch.saveCells(props(), [
  { rowId: "a", columnKey: "name", draft: "first" },
  { rowId: "a", columnKey: "name", draft: "last" },
]);
assert.equal(calls.length, 1);
await batch.saveCells(props(), [
  { rowId: "a", columnKey: "status", draft: "locked" },
]);
assert.equal(calls.length, 1);
await batch.save(props(), "undo");
assert.equal(data[0].name, "A");
assert.equal(data[1].value, 2);
assert.equal(batch.state.redoCount, 1);
await batch.save(props(), "redo");
assert.equal(data[0].name, "X");
assert.equal(data[1].value, 10);
reject = true;
await batch.saveCells(props(), [
  { rowId: "a", columnKey: "name", draft: "No" },
]);
assert.equal(data[0].name, "X");
assert.equal(batch.state.undoCount, 1);
assert.equal(batch.state.error, "Rejected transaction");
batch.dispose();
let received;
const pending = createDataTableBatchEditor(() => {});
const delayed = {
  data,
  columns,
  onBatchCommit: (details) => {
    received = details;
    return new Promise(() => {});
  },
};
const save = pending.saveCells(delayed, [
  { rowId: "a", columnKey: "name", draft: "Canceled" },
]);
await Promise.resolve();
assert(received);
pending.cancel();
assert.equal(await save, "canceled");
assert(received.signal.aborted);
assert.equal(pending.state.undoCount, 0);
pending.dispose();
console.log(
  "范围、受控清空、矩形平铺、TSV与限额、SSR转义、原子校验、整块历史和取消回归通过",
);
