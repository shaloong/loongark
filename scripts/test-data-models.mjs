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
