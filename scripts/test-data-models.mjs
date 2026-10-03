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
const { renderChartMarkup } = await import("../packages/kit/dist/index.js");
const chartOptions = {
  data: [
    { name: "Left", v: -1e308 },
    { name: "Gap", v: null },
    { name: "Right", v: 1e308 },
  ],
  series: [{ key: "v", label: "Net <balance>" }],
  labelKey: "name",
};
const extreme = renderChartSVG(chartOptions);
assert(!/NaN|Infinity/.test(extreme));
assert.equal((extreme.match(/data-part="point"/g) ?? []).length, 2);
assert.equal((extreme.match(/M /g) ?? []).length, 2);
assert(extreme.includes("Net &lt;balance&gt;: -1e+308"));
assert(
  renderChartSVG({
    ...chartOptions,
    data: [],
    labels: { empty: "无数据 <script>" },
  }).includes("无数据 &lt;script&gt;"),
);
assert(
  !renderChartMarkup({ ...chartOptions, data: [] }).includes(
    'data-part="legend"',
  ),
);
assert(
  !renderChartSVG({
    ...chartOptions,
    data: [
      { name: "NaN", v: NaN },
      { name: "infinite", v: Infinity },
    ],
  }).includes('data-part="point"'),
);
const dense = renderChartSVG({
  ...chartOptions,
  data: Array.from({ length: 150000 }, (_, i) => ({ name: String(i), v: i })),
  width: 375,
});
assert(!/NaN|Infinity/.test(dense));
assert((dense.match(/data-part="category-label"/g) ?? []).length < 10);
console.log("图表缺失值断线、极值有限坐标、空状态转义与大型数组归约通过");

const family = "👨‍👩‍👧‍👦";
const emojiChart = renderChartSVG({
  ...chartOptions,
  data: [{ name: family.repeat(20), v: 1 }],
  width: 200,
});
const visibleCategory = /data-part="category-label"[^>]*>([^<]*)/.exec(
  emojiChart,
)?.[1];
assert(visibleCategory?.startsWith(family));
console.log("图表截短保留完整组合 emoji，通过 grapheme 回归");
const { spawnSync } = await import("node:child_process");
const legacyChart = spawnSync(
  process.execPath,
  [
    "--input-type=module",
    "-e",
    `Object.defineProperty(Intl,'Segmenter',{value:undefined});const {renderChartSVG}=await import('./packages/kit/dist/index.js');const svg=renderChartSVG({data:[{name:'Very long category '.repeat(30),value:1}],series:[{key:'value'}],labelKey:'name',width:200});if(!svg.includes('>…<title>Very long category'))throw Error('Missing Segmenter fallback');`,
  ],
  { encoding: "utf8" },
);
assert.equal(legacyChart.status, 0, legacyChart.stderr);
console.log("无 Intl.Segmenter 环境保留完整提示且不崩溃，通过回归");
const zeroChart = renderChartSVG({
  ...chartOptions,
  data: [{ name: "Zero", v: 0 }],
});
assert(!zeroChart.includes('data-part="empty"'));
assert(zeroChart.includes("Zero — Net &lt;balance&gt;: 0"));
console.log("图表零值是有效数据，不显示空状态，通过回归");
