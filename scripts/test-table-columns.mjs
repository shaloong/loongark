import assert from "node:assert/strict";
import {
  dataColumnBounds,
  dataColumnWidth,
  normalizeDataColumnWidths,
  dataColumnOrder,
  moveDataColumn,
  renderDataColumnControls,
  dataColumnTableStyle,
  reconcileDataColumnOrder,
  reconcileDataColumnWidths,
} from "../packages/kit/dist/index.js";
const columns = [
  { key: "project", label: "Project", minWidth: 120, maxWidth: 480 },
  { key: "team", label: "Team", minWidth: 96, maxWidth: 320 },
  { key: "status", label: "Status" },
  { key: "revenue", label: "Revenue", minWidth: 96, maxWidth: 320 },
];
const options = { columns };
assert.deepEqual(dataColumnOrder(options), [
  "project",
  "team",
  "status",
  "revenue",
]);
assert.deepEqual(
  dataColumnOrder({
    ...options,
    columnKeys: ["team", "missing", "team", "project"],
  }),
  ["team", "project"],
);
assert.deepEqual(dataColumnOrder({ ...options, columnKeys: [] }), []);
assert.deepEqual(moveDataColumn(options, "project", "status"), [
  "team",
  "status",
  "project",
  "revenue",
]);
assert.deepEqual(moveDataColumn(options, "status", "project"), [
  "status",
  "project",
  "team",
  "revenue",
]);
assert.deepEqual(
  moveDataColumn(options, "missing", "project"),
  dataColumnOrder(options),
);
assert.deepEqual(
  moveDataColumn(options, "project", "project"),
  dataColumnOrder(options),
);
const pinned = {
  ...options,
  pinnedColumns: { start: ["team", "project"], end: ["revenue", "team"] },
};
assert.deepEqual(dataColumnOrder(pinned), [
  "project",
  "team",
  "status",
  "revenue",
]);
assert.deepEqual(moveDataColumn(pinned, "project", "team"), [
  "team",
  "project",
  "status",
  "revenue",
]);
assert.deepEqual(
  moveDataColumn(pinned, "project", "revenue"),
  dataColumnOrder(pinned),
);
assert.deepEqual(
  moveDataColumn(pinned, "status", "revenue"),
  dataColumnOrder(pinned),
);
assert.deepEqual(
  columns.map((column) => column.key),
  ["project", "team", "status", "revenue"],
);
assert.deepEqual(dataColumnBounds({ minWidth: NaN, maxWidth: Infinity }), {
  min: 80,
  max: 1200,
});
assert.deepEqual(dataColumnBounds({ minWidth: 500, maxWidth: 100 }), {
  min: 500,
  max: 500,
});
assert.deepEqual(dataColumnBounds({ minWidth: 0.1, maxWidth: 1e100 }), {
  min: 1,
  max: 100000,
});
assert.equal(dataColumnWidth(columns[0], { project: 20 }), 120);
assert.equal(dataColumnWidth(columns[0], { project: 999 }), 480);
assert.equal(dataColumnWidth(columns[0], { project: NaN }), 160);
assert.equal(dataColumnWidth(columns[0], { project: 200.6 }), 201);
assert.equal(dataColumnWidth(columns[0], Object.create({ project: 400 })), 160);
const prototype = { key: "__proto__", label: "Prototype" };
const widths = normalizeDataColumnWidths({
  columns: [prototype],
  columnWidths: JSON.parse('{"__proto__":280}'),
});
assert.equal(Object.hasOwn(widths, "__proto__"), true);
assert.equal(widths.__proto__, 280);
assert.deepEqual(dataColumnTableStyle(options), {});
assert.match(
  dataColumnTableStyle({ ...options, columnResizable: true }).width,
  /640px/,
);
const markup = renderDataColumnControls(
  { ...options, columnResizable: true, columnReorderable: true },
  columns[0],
);
assert.match(markup, /role="separator"[^>]*aria-orientation="vertical"/);
assert.match(
  markup,
  /aria-valuemin="120"[^>]*aria-valuemax="480"[^>]*aria-valuenow="160"/,
);
assert.equal(renderDataColumnControls(options, columns[0]), "");
assert.match(
  renderDataColumnControls(
    { ...options, columnResizable: true, loading: true },
    columns[0],
  ),
  /tabindex="-1" aria-disabled="true"/,
);
const dangerous = { key: '"><script>', label: '<script>alert("x")</script>' };
assert.doesNotMatch(
  renderDataColumnControls({ ...options, columnReorderable: true }, dangerous),
  /<script>/,
);
console.log(
  "Column reconciliation: referential stability, deletion and new-column append passed",
);
const originalKeys = ["status", "project", "team"];
assert.equal(
  reconcileDataColumnOrder(originalKeys, columns.slice(0, 3)),
  originalKeys,
);
assert.deepEqual(
  reconcileDataColumnOrder(["status", "gone", "status"], columns),
  ["status", "project", "team", "revenue"],
);
assert.equal(reconcileDataColumnOrder(undefined, columns), undefined);
const originalWidths = { project: 220, team: 150 };
assert.equal(
  reconcileDataColumnWidths(originalWidths, columns),
  originalWidths,
);
assert.deepEqual(
  reconcileDataColumnWidths({ ...originalWidths, gone: 300 }, columns),
  originalWidths,
);
assert.equal(reconcileDataColumnWidths(undefined, columns), undefined);
assert.match(markup, /aria-pressed="false"/);
console.log(
  "Column layout: stable order, pinned groups, hidden keys, bounds, own-property widths, SSR semantics and escaped labels passed",
);
