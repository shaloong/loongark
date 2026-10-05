import assert from "node:assert/strict";
import {
  chartRange,
  chartWindow,
  chartZoomRange,
  chartInspection,
  renderChartMarkup,
  renderChartSVG,
} from "../packages/kit/dist/index.js";
const options = {
  data: Array.from({ length: 24 }, (_, index) => ({
    id: `d-${index}`,
    label: `Day ${index + 1}`,
    value: index === 5 ? null : index * 3,
    other: index + 1,
  })),
  series: [
    { key: "value", label: "Value" },
    { key: "other", label: "Other" },
  ],
  labelKey: "label",
  zoomable: true,
  tooltip: true,
  showDataTable: true,
};
assert.deepEqual(chartRange(options), [0, 23]);
const range = chartZoomRange(options, "in");
assert.deepEqual(range, [6, 17]);
assert.equal(chartWindow({ ...options, range }).data.length, 12);
assert.deepEqual(chartZoomRange({ ...options, range }, "out"), [0, 23]);
assert.deepEqual(chartRange({ ...options, range: [22, 2] }), [2, 22]);
assert.deepEqual(chartRange({ ...options, range: [NaN, Infinity] }), [0, 23]);
assert.deepEqual(
  chartRange({ ...options, data: options.data.slice(0, 5), range }),
  [4, 4],
);
assert.deepEqual(
  chartRange({
    ...options,
    data: [...options.data, { label: "New", value: 9 }],
  }),
  [0, 24],
);
assert.deepEqual(
  chartRange({
    ...options,
    range,
    data: [...options.data, { label: "New", value: 9 }],
  }),
  range,
);
assert.match(
  chartInspection({ ...options, range: [5, 8] }, 0),
  /Day 6 — Value: No data; Other: 6/,
);
const markup = renderChartMarkup({ ...options, range: [5, 8] });
assert.match(markup, /Categories 6–9 of 24/);
assert.doesNotMatch(markup, /Day 24/);
assert.match(markup, /data-part="range-start"[^>]*value="5"/);
assert.match(markup, /data-chart-index="1"/);
const svg = renderChartSVG({ ...options, range: [5, 8] });
assert.doesNotMatch(svg, /Day 1 —|Day 24/);
const empty = renderChartMarkup({ ...options, data: [] });
assert.match(empty, /<fieldset data-part="brush" disabled/);
assert.doesNotMatch(empty, /NaN|Infinity/);
assert.match(
  renderChartMarkup({ ...options, disabled: true }),
  /<select data-part="inspect-category" disabled/,
);
const escaped = renderChartMarkup({
  ...options,
  data: [{ label: "<script>evil</script>", value: 2 }],
});
assert.doesNotMatch(escaped, /<script>/);
assert.match(escaped, /&lt;script&gt;/);
assert.equal(options.data.length, 24);
console.log(
  "Chart windows: zoom bounds, controlled range normalization, incremental data, missing values, disabled/empty and escaped inspection passed",
);
