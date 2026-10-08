import assert from "node:assert/strict";
import {
  renderChartSVG,
  renderChartMarkup,
  chartInspection,
} from "../packages/kit/dist/index.js";
import {
  createChartScale,
  chartAxisValue,
} from "../packages/kit/dist/chart-axis.js";
const base = {
  data: [
    {
      id: "a",
      label: "Alpha",
      value: 10,
      other: 5,
      x: 2,
      at: "2026-09-01T00:00:00Z",
    },
    {
      id: "b",
      label: "Beta",
      value: null,
      other: 8,
      x: 5,
      at: "2026-09-03T00:00:00Z",
    },
    {
      id: "c",
      label: "Gamma",
      value: -4,
      other: -6,
      x: 10,
      at: "2026-09-10T00:00:00Z",
    },
  ],
  series: [
    { key: "value", label: "Value" },
    { key: "other", label: "Other" },
  ],
  labelKey: "label",
};
const safe = (svg) => {
  assert.doesNotMatch(svg, /NaN|Infinity|undefined/);
  return svg;
};
const parts = (svg, part) =>
  Array.from(
    svg.matchAll(new RegExp(`<[^>]*data-part="${part}"[^>]*>`, "g")),
    (item) => item[0],
  );
const attribute = (tag, key) =>
  tag.match(new RegExp(`\\b${key}="([^"]*)"`))?.[1];
const numbers = (path) =>
  Array.from(path.matchAll(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/gi), (m) =>
    Number(m[0]),
  );
const close = (a, b) =>
  assert.ok(
    Math.abs(a - b) <= Math.max(1, Math.abs(b)) * 1e-10,
    `${a} != ${b}`,
  );
const area = safe(renderChartSVG({ ...base, type: "area" }));
assert.equal(
  parts(area, "area").length,
  3,
  "缺失值形成独立面积，不能跨缺失点连接",
);
assert.equal(parts(area, "point").length, 5);
const stacked = safe(renderChartSVG({ ...base, type: "bar", stacked: true }));
assert.equal(parts(stacked, "bar").length, 5);
const bars = parts(stacked, "bar");
const firstBottom =
  Number(attribute(bars[0], "y")) + Number(attribute(bars[0], "height"));
close(
  Number(attribute(bars[2], "y")) + Number(attribute(bars[2], "height")),
  Number(attribute(bars[0], "y")),
);
assert.ok(
  Number(attribute(bars[1], "y")) >= firstBottom,
  "负数应从独立零基线向下堆叠",
);
assert.throws(
  () =>
    renderChartSVG({
      ...base,
      type: "area",
      stacked: true,
      yAxis: { type: "log" },
    }),
  /linear/,
);
assert.throws(
  () => renderChartSVG({ ...base, type: "scatter", stacked: true }),
  /Only/,
);
assert.throws(
  () =>
    renderChartSVG({
      ...base,
      type: "bar",
      stacked: true,
      data: [{ label: "A", value: 1e308, other: 1e308 }],
    }),
  /finite/,
);
for (const type of ["area", "bar", "scatter"])
  safe(
    renderChartSVG({
      ...base,
      type,
      data: [
        { label: 0, value: -1e308, other: null },
        { label: 1, value: 1e308, other: 1e308 },
      ],
      xAxis: { type: "linear" },
      yAxis: { domain: [-1, 1] },
    }),
  );
const clipped = renderChartSVG({
  data: [
    { label: "A", value: -100 },
    { label: "B", value: 100 },
  ],
  series: [{ key: "value" }],
  labelKey: "label",
  type: "area",
  domain: [-1, 1],
});
const line = numbers(attribute(parts(clipped, "line")[0], "d"));
const grid = clipped.match(/<line x1="([^"]+)"[^>]*x2="([^"]+)"/);
const left = Number(grid[1]),
  right = Number(grid[2]);
close(line[0], left + (right - left) * 0.4975);
close(line[1], 220);
close(line[2], left + (right - left) * 0.5025);
close(line[3], 20);
const scatter = safe(
  renderChartSVG({
    ...base,
    type: "scatter",
    xAxis: { type: "linear", key: "x" },
  }),
);
assert.equal(parts(scatter, "line").length, 0);
assert.equal(parts(scatter, "point").length, 5);
const defaultScatter = safe(
  renderChartSVG({ ...base, type: "scatter", labelKey: "x" }),
);
assert.equal(parts(defaultScatter, "point").length, 5);
assert.throws(
  () =>
    renderChartSVG({ ...base, type: "scatter", xAxis: { type: "category" } }),
  /continuous/,
);
const time = safe(
  renderChartSVG({
    ...base,
    xAxis: { type: "time", key: "at", locale: "en-GB", timeZone: "UTC" },
    showDataTable: true,
  }),
);
const positions = [
  ...new Map(
    parts(time, "point").map((tag) => [
      Number(attribute(tag, "data-chart-index")),
      Number(attribute(tag, "cx")),
    ]),
  ).entries(),
]
  .sort((a, b) => a[0] - b[0])
  .map((entry) => entry[1]);
assert.ok(positions[2] - positions[1] > positions[1] - positions[0]);
const compactTime = renderChartSVG({
  ...base,
  width: 327,
  xAxis: { type: "time", key: "at", locale: "en-GB", timeZone: "UTC" },
});
const compactLabels = [
  ...compactTime.matchAll(
    /<text data-part="category-label"[^>]*>(.*?)<title>(.*?)<\/title><\/text>/g,
  ),
];
assert.ok(
  compactLabels.length >= 2 && compactLabels.length < 5,
  "窄屏减少过密刻度，保留首尾",
);
for (const label of compactLabels)
  assert.equal(label[1], label[2], "普通日期标签应完整显示");
assert.equal(chartAxisValue("2026-02-30", { type: "time" }), undefined);
assert.equal(chartAxisValue("09/01/2026", { type: "time" }), undefined);
assert.equal(
  chartAxisValue("2026-09-01T12:00:00", { type: "time" }),
  undefined,
);
assert.equal(
  chartAxisValue("2026-09-01T12:00:00+08:00", { type: "time" }),
  Date.parse("2026-09-01T04:00:00Z"),
);
assert.throws(
  () => createChartScale([], { type: "time", domain: [0, 1e308] }),
  /timestamps/,
);
const log = createChartScale([1, 10, 100, 1000], { type: "log" });
close(log.position(10), 1 / 3);
close(log.position(100), 2 / 3);
assert.equal(chartAxisValue(0, { type: "log" }), undefined);
assert.equal(chartAxisValue(-1, { type: "log" }), undefined);
assert.throws(
  () => createChartScale([], { type: "log", domain: [0, 100] }),
  /positive/,
);
assert.throws(
  () =>
    renderChartSVG({
      ...base,
      data: [],
      type: "area",
      yAxis: { domain: [2, 1] },
    }),
  /ascending/,
);
const closeLog = createChartScale([1e308, 1e308 * (1 + Number.EPSILON)], {
  type: "log",
});
close(closeLog.position(closeLog.min), 0);
close(closeLog.position(closeLog.max), 1);
for (const value of [Number.MIN_VALUE, Number.MAX_VALUE, -Number.MAX_VALUE]) {
  const scale = createChartScale([value]);
  assert.ok(scale.ticks.every(Number.isFinite));
  assert.ok(Number.isFinite(scale.position(value)));
}
const pie = {
  ...base,
  type: "donut",
  series: [{ key: "value" }],
  sliceKey: "id",
  interactive: true,
  showDataTable: true,
};
const donut = safe(renderChartMarkup(pie));
assert.equal(parts(donut, "slice").length, 1);
assert.equal(
  (attribute(parts(donut, "slice")[0], "d").match(/ A /g) || []).length,
  4,
  "单个环片必须绘制完整外圆与内圆",
);
assert.equal(parts(donut, "legend-toggle").length, 3);
assert.match(renderChartMarkup({ ...pie, sliceKeys: [] }), /data-part="empty"/);
assert.match(
  renderChartSVG({ ...pie, sliceKeys: [] }),
  /aria-description="No data"/,
);
assert.match(
  renderChartSVG({
    ...base,
    type: "area",
    domain: [0, 10],
    labels: { range: () => "Custom range" },
  }),
  /aria-description="Custom range/,
);
assert.equal(chartInspection({ ...pie, sliceKeys: [] }, 0), "No data");
assert.throws(
  () => renderChartSVG({ ...pie, data: [base.data[0], base.data[0]] }),
  /unique/,
);
assert.throws(
  () => renderChartSVG({ ...pie, data: [{ id: "", label: "A", value: 2 }] }),
  /unique/,
);
assert.throws(
  () => renderChartSVG({ ...pie, series: base.series }),
  /exactly one/,
);
assert.throws(
  () => renderChartSVG({ ...pie, xAxis: { type: "time" } }),
  /Cartesian/,
);
assert.match(renderChartSVG({ ...pie, seriesKeys: [] }), /data-part="empty"/);
assert.ok(
  parts(renderChartMarkup({ ...pie, seriesKeys: [] }), "legend-toggle").every(
    (tag) => attribute(tag, "aria-pressed") === "false",
  ),
);
const two = {
  ...pie,
  data: [
    { id: "a", label: "A", value: 1e308 },
    { id: "b", label: "B", value: 1e308 },
  ],
};
assert.equal(parts(safe(renderChartSVG(two)), "slice").length, 2);
const full = renderChartSVG(two),
  windowed = renderChartSVG({ ...two, range: [1, 1] });
assert.equal(
  attribute(parts(full, "slice")[1], "fill"),
  attribute(parts(windowed, "slice")[0], "fill"),
  "窗口不得改变切片颜色身份",
);
const escaped = renderChartMarkup({
  ...base,
  type: "area",
  showDataTable: true,
  xAxis: {
    type: "linear",
    key: "x",
    format: () => "<img src=x onerror=alert(1)>",
  },
  data: [{ label: "<script>", value: 10, x: 1 }],
});
assert.doesNotMatch(escaped, /<script>|<img/);
assert.match(escaped, /&lt;img/);
assert.match(escaped, /<th scope="col">x<\/th>/);
assert.match(
  chartInspection({ ...base, xAxis: { type: "linear", key: "x" } }, 0),
  /x: 2/,
);
const source = JSON.stringify(base);
renderChartSVG({ ...base, type: "area", stacked: true });
assert.equal(JSON.stringify(base), source);
console.log(
  "图表类型/轴：堆叠符号、缺失断点、连续间距、裁剪、极值、安全转义与分类身份通过",
);
