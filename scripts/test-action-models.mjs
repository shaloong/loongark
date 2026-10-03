import assert from "node:assert/strict";
import {
  mediaCount,
  mediaStyles,
  speedDialActions,
  fabAttributes,
} from "../packages/kit/dist/index.js";
assert.equal(mediaCount(0), 1);
assert.equal(mediaCount(100), 12);
assert.equal(mediaCount(2.7), 2);
assert.equal(mediaCount(NaN, 3), 3);
assert.equal(
  mediaStyles({ columnSpan: 2, rowSpan: 2 })["--lk-media-column-span"],
  2,
);
assert.equal(mediaStyles({})["--lk-media-columns"], undefined);
assert.equal(mediaStyles({ rowHeight: -10 })["--lk-media-row-height"], "1px");
const actions = [
  { value: "note", label: "Note" },
  { value: "archive", label: "Archive", disabled: true },
];
assert.deepEqual(speedDialActions(actions), [actions[0]]);
assert.equal(actions.length, 2);
assert.throws(() => speedDialActions([actions[0], actions[0]]), /unique/);
assert.equal(fabAttributes({ extended: true })["data-extended"], "true");
console.log(
  "Action/media shared bounds, inherited columns, disabled filtering and unique keys passed.",
);
