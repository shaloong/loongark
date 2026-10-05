import assert from "node:assert/strict";
import { createVirtualWindow } from "../packages/kit/dist/index.js";
const keys = Array.from({ length: 10000 }, (_, index) => `row-${index}`);
const options = { keys, height: 300, estimateSize: 50, overscan: 2 };
let notifications = 0;
const model = createVirtualWindow(options, () => notifications++);
assert.equal(notifications, 0);
assert.equal(model.state.count, 10000);
assert(model.state.entries.length < 12);
model.scrollToIndex(500);
assert.equal(model.state.offset, 25000);
assert(model.state.entries.some((entry) => entry.key === "row-500"));
model.focus("row-500");
model.scrollToIndex(9000);
assert(model.state.entries.length < 15);
assert(model.state.entries.some((entry) => entry.key === "row-500"));
const sum =
  model.state.entries.reduce(
    (total, entry) => total + entry.gap + entry.size,
    0,
  ) + model.state.after;
assert.equal(sum, model.state.total);
model.focus();
assert(!model.state.entries.some((entry) => entry.key === "row-500"));
model.scrollToIndex(500);
model.measure([{ key: "row-0", size: 80 }]);
assert.equal(model.state.offset, 25030);
model.setOptions({ ...options, keys: ["history", ...keys] });
assert.equal(model.state.offset, 25080);
assert(model.state.entries.some((entry) => entry.key === "row-500"));
model.setOptions({ ...options, contextKey: "query changed" });
assert.equal(model.state.offset, 0);
model.setOptions({ ...options, keys: ["only"], contextKey: "query changed" });
assert.equal(model.state.entries.length, 1);
assert.equal(model.state.offset, 0);
model.setOptions({ ...options, keys: [] });
assert.equal(model.state.total, 0);
assert.equal(model.state.after, 0);
assert.deepEqual(model.state.entries, []);
assert.throws(
  () => createVirtualWindow({ ...options, keys: ["same", "same"] }, () => {}),
  /unique/,
);
const live = createVirtualWindow(
  { keys: ["a", "b", "c"], height: 100, estimateSize: 50, followEnd: true },
  () => {},
);
assert.equal(live.state.offset, 50);
live.setOptions({
  keys: ["a", "b", "c", "d"],
  height: 100,
  estimateSize: 50,
  followEnd: true,
});
assert.equal(live.state.offset, 100);
live.setViewport(20);
live.setOptions({
  keys: ["before", "a", "b", "c", "d", "e"],
  height: 100,
  estimateSize: 50,
  followEnd: true,
});
assert.equal(live.state.offset, 70);
live.measure([
  { key: "before", size: 75 },
  { key: "a", size: NaN },
  { key: "b", size: -10 },
]);
assert.equal(live.state.offset, 95);
assert(Number.isFinite(live.state.total));
live.scrollToIndex(5, "end");
assert.equal(live.state.atBottom, true);
model.dispose();
live.dispose();
console.log(
  "Virtual windows: bounded 10000 rows, pinned focus, spacer conservation, size/prepend anchors, context reset, empty and follow-end passed",
);
const removed = createVirtualWindow(
  { keys: ["a", "b", "c", "d", "e"], height: 50, estimateSize: 50 },
  () => {},
);
removed.scrollToIndex(2);
removed.setOptions({
  keys: ["a", "b", "d", "e"],
  height: 50,
  estimateSize: 50,
});
assert.equal(removed.state.offset, 100);
assert.equal(
  removed.state.entries.find((e) => e.offset === removed.state.offset).key,
  "d",
);
removed.dispose();
