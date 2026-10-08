import assert from "node:assert/strict";
import {
  observeChartWidth,
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

// 连续尺寸只在下一帧消费最后一值；取整相同不重绘，卸载取消待提交。
let callback,
  nextFrame = 0,
  canceled = 0,
  disconnected = false;
const frames = new Map();
const reported = [];
const element = {
  getBoundingClientRect: () => ({ width: 400.2 }),
  ownerDocument: {
    defaultView: {
      ResizeObserver: class {
        constructor(fn) {
          callback = fn;
        }
        observe(target) {
          assert.equal(target, element);
        }
        disconnect() {
          disconnected = true;
        }
      },
      requestAnimationFrame: (fn) => {
        frames.set(++nextFrame, fn);
        return nextFrame;
      },
      cancelAnimationFrame: (id) => {
        canceled = id;
        frames.delete(id);
      },
    },
  },
};
const disposeWidth = observeChartWidth(element, (width) =>
  reported.push(width),
);
const resize = (width) =>
  callback([{ target: element, contentRect: { width } }]);
const flush = () => {
  const queued = [...frames.values()];
  frames.clear();
  queued.forEach((fn) => fn());
};
assert.deepEqual(reported, [400]);
resize(450);
resize(480.2);
assert.equal(frames.size, 1);
assert.deepEqual(reported, [400]);
flush();
assert.deepEqual(reported, [400, 480]);
resize(480.4);
flush();
assert.deepEqual(reported, [400, 480]);
resize(0);
flush();
assert.deepEqual(reported, [400, 480]);
resize(520);
disposeWidth();
assert.equal(disconnected, true);
assert.ok(canceled > 0);
assert.equal(frames.size, 0);
flush();
assert.deepEqual(reported, [400, 480]);
console.log(
  "Chart width: coalescing, rounded deduplication and canceled lifecycle passed",
);
