import assert from "node:assert/strict";
import {
  createDataTableColumnWindow,
  dataTableVirtualColumns,
  dataTableRenderColumnWidth,
  dataTableView,
  createDataTablePaste,
} from "../packages/kit/dist/index.js";
const columns = Array.from({ length: 10000 }, (_, index) => ({
  key: `c${index}`,
  label: `Column ${index}`,
  editor: { type: "text" },
}));
const props = {
  columns,
  data: [{ id: "a", c9999: "Last" }],
  columnVirtualization: { width: 480, overscan: 1 },
  pinnedColumns: { start: ["c0"], end: ["c9999"] },
  cellSelection: true,
};
const view = dataTableView(props, { query: "", page: 1 });
let calls = 0;
const model = createDataTableColumnWindow(props, view, () => calls++);
assert.equal(calls, 0, "SSR construction must not emit state callbacks");
assert.equal(model.state.total, 1600000);
assert(model.state.entries.length <= 5);
model.scrollToIndex(5000);
let rendered = dataTableVirtualColumns(view, props, model.state, "c3");
assert(
  rendered.length < 13,
  "retain pins, range focus and editor without rendering every column",
);
for (const key of ["c0", "c9999", "c3", "c5000"])
  assert(rendered.some((column) => column.key === key));
assert.equal(
  rendered.reduce(
    (sum, column) => sum + dataTableRenderColumnWidth(column, props),
    0,
  ),
  model.state.total,
);
assert.equal(
  rendered.find((column) => column.key === "c5000").virtualIndex,
  5000,
);
assert(!rendered.some((column) => column.key === "c2500"));
const address = { rowId: "a", columnKey: "c2500" };
const paste = createDataTablePaste(
  view,
  { anchor: address, focus: address },
  "A\tB",
);
assert.deepEqual(
  paste.cells.map((cell) => cell.columnKey),
  ["c2500", "c2501"],
  "clipboard uses full columns, including absent DOM cells",
);
const invalid = {
  ...props,
  pinnedColumns: undefined,
  cellRange: {
    anchor: { rowId: "deleted", columnKey: "missing" },
    focus: { rowId: "deleted", columnKey: "missing" },
  },
};
assert(
  dataTableVirtualColumns(
    dataTableView(invalid, { query: "", page: 1 }),
    invalid,
    model.state,
  ).some((column) => column.key === "c0"),
  "invalid controlled range retains the same fallback tab stop as the full model",
);
const wider = { ...props, columnWidths: { c0: 300, c4999: 240 } };
model.sync(wider, view);
assert.equal(model.state.total, 1600220);
assert(
  model.state.entries.some((entry) => entry.key === "c5000"),
  "width changes preserve the reading anchor",
);
model.focus("c5000");
model.scrollToIndex(9000);
assert(model.state.entries.some((entry) => entry.key === "c5000"));
model.focus();
assert(!model.state.entries.some((entry) => entry.key === "c5000"));
model.dispose();
model.sync(wider, view);
assert.equal(
  model.state.total,
  1600220,
  "remount restores column measurements after disposal",
);
model.sync({ ...props, columnVirtualization: undefined }, view);
assert.equal(model.state.total, 0);
model.sync(wider, view);
assert.equal(
  model.state.total,
  1600220,
  "enabling virtualization restores fixed widths",
);
const short = { ...props, columns: [columns[3]], columnWidths: { c3: 210 } };
const shortView = dataTableView(short, { query: "", page: 1 });
model.sync(short, shortView);
assert.equal(model.state.total, 210);
assert.equal(model.state.offset, 0);
assert.equal(
  dataTableVirtualColumns(shortView, short, model.state)[0].key,
  "c3",
);
model.sync(
  { ...short, columns: [], data: [] },
  dataTableView({ ...short, columns: [], data: [] }, { query: "", page: 1 }),
);
assert.deepEqual(model.state.entries, []);
assert.equal(model.state.total, 0);
console.log(
  "Horizontal table window contracts passed: 10,000 columns, widths, pins, full-model paste, focus, remount and empty data",
);
