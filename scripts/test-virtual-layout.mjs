import assert from "node:assert/strict";
import {
  createVirtualGrid,
  createVirtualMasonry,
} from "../packages/kit/dist/virtual-layout.js";
const keys = (prefix, count) =>
  Array.from({ length: count }, (_, index) => `${prefix}${index}`);
const gridProps = {
  rowKeys: keys("r", 10000),
  columnKeys: keys("c", 10000),
  rowSize: (key) =>
    key === "prepended" ? 50 : Number(key.slice(1)) % 2 ? 60 : 40,
  columnSize: 100,
  width: 300,
  height: 200,
  overscan: 1,
  scrollToRow: 5000,
  scrollToColumn: 6000,
};
let notices = 0;
const grid = createVirtualGrid(gridProps, () => notices++);
assert.equal(notices, 0);
assert.equal(grid.rows.state.total, 500000);
assert.equal(grid.columns.state.total, 1000000);
assert.equal(grid.rows.state.offset, 250000);
assert.equal(grid.columns.state.offset, 600000);
assert(grid.rows.state.entries.length * grid.columns.state.entries.length < 80);
grid.rows.focus("r0");
grid.columns.focus("c0");
assert(grid.rows.state.entries.some((entry) => entry.key === "r0"));
assert(grid.columns.state.entries.some((entry) => entry.key === "c0"));
grid.rows.focus(undefined);
grid.columns.focus(undefined);
assert(!grid.rows.state.entries.some((entry) => entry.key === "r0"));
grid.sync({
  ...gridProps,
  rowKeys: ["prepended", ...gridProps.rowKeys],
  scrollToRow: undefined,
});
assert(grid.rows.state.entries.some((entry) => entry.key === "r5000"));
assert.equal(grid.rows.state.offset, 250050);
grid.sync({ ...gridProps, rowKeys: [], columnKeys: [] });
assert.equal(grid.rows.state.total, 0);
assert.equal(grid.columns.state.entries.length, 0);
assert.deepEqual(grid.cursor, { rowKey: undefined, columnKey: undefined });
grid.dispose();
assert.throws(
  () =>
    createVirtualGrid(
      { rowKeys: ["same", "same"], columnKeys: ["a"] },
      () => {},
    ),
  /unique/,
);
const props = {
  keys: keys("item", 10000),
  width: 640,
  height: 300,
  minColumnWidth: 200,
  gap: 16,
  estimateSize: 100,
  overscan: 100,
};
notices = 0;
const masonry = createVirtualMasonry(props, () => notices++);
assert.equal(notices, 0);
assert.equal(masonry.state.columns, 3);
assert.equal(masonry.state.columnWidth, (640 - 32) / 3);
assert(masonry.state.entries.length < 20);
const placed = masonry.state.entries;
assert.equal(placed[0].column, 0);
assert.equal(placed[1].column, 1);
assert.equal(placed[2].column, 2);
assert.equal(placed[3].top, 116);
masonry.measure([
  { key: "item0", height: 300 },
  { key: "item1", height: 80 },
  { key: "item2", height: 120 },
]);
assert.equal(
  masonry.state.entries.find((entry) => entry.key === "item3").column,
  1,
);
assert.equal(
  masonry.state.entries.find((entry) => entry.key === "item3").top,
  96,
);
masonry.scrollToIndex(5000);
assert(masonry.state.entries.length < 25);
const old = masonry.state.entries.find((entry) => entry.key === "item5000");
assert(old);
masonry.focus("item0");
assert(masonry.state.entries.some((entry) => entry.key === "item0"));
masonry.focus(undefined);
assert(!masonry.state.entries.some((entry) => entry.key === "item0"));
const anchor = [...masonry.state.entries]
  .filter((entry) => entry.top + entry.height > masonry.state.offset)
  .sort((a, b) => a.top - b.top)[0];
const inset = masonry.state.offset - anchor.top;
masonry.setViewport(masonry.state.offset, 320, 300);
assert.equal(masonry.state.columns, 1);
assert.equal(masonry.state.columnWidth, 320);
const resized = masonry.state.entries.find((entry) => entry.key === anchor.key);
assert(resized);
assert.equal(masonry.state.offset - resized.top, inset);
masonry.setOptions({ ...props, keys: ["new", ...props.keys] });
assert(masonry.state.entries.some((entry) => entry.key === anchor.key));
assert(
  masonry.state.entries.every(
    (entry, index, items) => !index || entry.index > items[index - 1].index,
  ),
);
masonry.measure([
  { key: "absent", height: 999 },
  { key: anchor.key, height: NaN },
  { key: anchor.key, height: -1 },
]);
assert(Number.isFinite(masonry.state.total));
masonry.setOptions({ ...props, keys: [] });
assert.equal(masonry.state.total, 0);
assert.equal(masonry.state.offset, 0);
masonry.dispose();
assert.throws(
  () => createVirtualMasonry({ ...props, keys: ["a", "a"] }, () => {}),
  /unique/,
);
console.log(
  "二维网格：双轴有界窗口、非均匀尺寸、远端定位、焦点保留与数据锚点；瀑布流：最短列、实际高度、响应列数、宽度失效、逻辑顺序和空数据通过",
);

// 响应式适配器的 getter 必须先快照，旧选项不能跟随新定位指令变化。
let command = 0;
const live = {
  keys: keys("live", 1000),
  width: 100,
  height: 100,
  minColumnWidth: 100,
  gap: 0,
  estimateSize: 100,
  get scrollToIndex() {
    return command;
  },
};
const reactiveMasonry = createVirtualMasonry(live, () => {});
command = 500;
reactiveMasonry.setOptions(live);
assert.equal(reactiveMasonry.state.offset, 50000);
reactiveMasonry.dispose();
console.log("响应式选项快照与变化后的定位指令回归通过");

// 方向或数据更新不能把已测得的手机可视宽度恢复成 SSR 估算值。
const narrowOptions = {
  rowKeys: keys("narrow-row", 100),
  columnKeys: keys("narrow-column", 20),
  rowSize: 50,
  columnSize: 100,
  height: 80,
  width: 640,
};
const narrowGrid = createVirtualGrid(narrowOptions, () => {});
narrowGrid.rows.setViewport(0, 78);
narrowGrid.columns.setViewport(1850, 150);
narrowGrid.sync({ ...narrowOptions, dir: "rtl" });
assert.equal(narrowGrid.columns.state.height, 150);
assert.equal(narrowGrid.columns.state.offset, 1850);
assert.equal(narrowGrid.rows.state.height, 78);
narrowGrid.dispose();
console.log("方向/数据更新保留实际可视尺寸与远端偏移回归通过");
