import assert from "node:assert/strict";
import {
  createDataTableView,
  nextDataSort,
  renderChartSVG,
} from "../packages/kit/dist/index.js";
const rows = [
    { id: "a", name: "Beta", value: 10 },
    { id: "b", name: "Alpha", value: 2 },
    { id: "c", name: "Gamma", value: -4 },
  ],
  columns = [
    { key: "name", label: "Name" },
    { key: "value", label: "Value" },
  ];
assert.equal(
  createDataTableView(rows, columns, {
    sort: { key: "value", direction: "asc" },
  }).rows[0].id,
  "c",
);
assert.equal(
  createDataTableView(rows, columns, { query: "ALP" }).rows[0].id,
  "b",
);
assert.equal(
  createDataTableView(rows, columns, { page: 20, pageSize: 2 }).page,
  2,
);
assert.equal(createDataTableView([], columns).pageCount, 1);
assert.equal(
  nextDataSort({ key: "value", direction: "desc" }, "value"),
  undefined,
);
const svg = renderChartSVG({
  data: [
    { label: "<script>", v: -4 },
    { label: "B", v: 10 },
  ],
  series: [{ key: "v", color: "url(https://invalid.test)" }],
  labelKey: "label",
  type: "bar",
});
assert(!svg.includes("<script>"));
assert(!svg.includes("invalid.test"));
assert(!svg.includes("NaN"));
assert(!svg.includes('height="-'));
console.log("表格筛选、排序、分页及图表负值/转义验证通过");

const {
  normalizeDataSelection,
  dataSelectionState,
  toggleDataSelection,
  dataTableLabels,
} = await import("../packages/kit/dist/index.js");
assert.deepEqual(
  normalizeDataSelection(["a", "a", "gone", "b"], ["a", "b", "c"]),
  ["a", "b"],
);
assert.deepEqual(toggleDataSelection(["c"], ["a", "b"], true), ["c", "a", "b"]);
assert.deepEqual(toggleDataSelection(["c", "a", "b"], ["a", "b"], false), [
  "c",
]);
assert.deepEqual(dataSelectionState(["a"], ["a", "b"]), {
  checked: false,
  mixed: true,
});
assert.deepEqual(dataSelectionState([], []), { checked: false, mixed: false });
assert.deepEqual(
  createDataTableView(rows, columns, { query: "Alpha" }).allIds,
  ["a", "b", "c"],
);
assert.equal(
  createDataTableView(rows, columns, {
    sort: { key: "value", direction: "asc" },
  }).sort?.direction,
  "asc",
);
assert.equal(
  createDataTableView(
    rows,
    columns.filter((c) => c.key !== "value"),
    { sort: { key: "value", direction: "asc" } },
  ).sort,
  undefined,
);
assert.throws(
  () => createDataTableView([rows[0], rows[0]], columns),
  /unique row ids/,
);
assert.throws(
  () => createDataTableView(rows, [columns[0], columns[0]]),
  /unique non-empty column/,
);
assert.equal(dataTableLabels({ previous: undefined }).previous, "Previous");
console.log(
  "表格分页全选、陈旧选择归一化、失效排序、唯一标识与标签默认值回归通过",
);
