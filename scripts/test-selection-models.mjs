import assert from "node:assert/strict";
import {
  transferView,
  moveTransferItems,
  toggleTransferSide,
  parseTime,
  validTime,
  timePickerView,
  chooseTimeHour,
  formatTime,
  timeStep,
  textareaRows,
} from "../packages/kit/dist/index.js";
const items = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Beta" },
  { value: "locked", label: "Locked", disabled: true },
];
assert.deepEqual(moveTransferItems(items, ["b"], ["a", "locked"], "right"), {
  value: ["a", "b"],
  moved: ["a"],
  direction: "right",
});
assert.deepEqual(
  moveTransferItems(items, ["a", "locked"], ["a", "locked"], "left"),
  { value: ["locked"], moved: ["a"], direction: "left" },
);
assert.deepEqual(transferView(items, ["unknown", "b", "b"]).value, ["b"]);
assert.deepEqual(toggleTransferSide([], items), ["a", "b"]);
assert.deepEqual(toggleTransferSide(["a", "b"], items), []);
assert.throws(() => transferView([...items, items[0]]), /unique/);
assert.equal(parseTime("9:05")?.value, "09:05");
for (const text of ["24:00", "12:60", "text", "-1:00", "09:05:01"])
  assert.equal(parseTime(text), undefined);
assert.equal(
  validTime("23:30", { min: "22:00", max: "02:00", minuteStep: 30 }),
  true,
);
assert.equal(
  validTime("01:30", { min: "22:00", max: "02:00", minuteStep: 30 }),
  true,
);
assert.equal(
  validTime("14:00", { min: "22:00", max: "02:00", minuteStep: 30 }),
  false,
);
assert.equal(
  validTime("08:25", { min: "08:10", max: "18:00", minuteStep: 15 }),
  true,
);
assert.equal(
  validTime("08:15", { min: "08:10", max: "18:00", minuteStep: 15 }),
  false,
);
assert.equal(validTime("", { required: true }), false);
assert.throws(() => timeStep(7), /divisor/);
const window = { min: "08:10", max: "08:20", minuteStep: 15 };
assert.equal(timePickerView("", window).hour, 8);
assert.deepEqual(timePickerView("", window).minutes, [10, 25, 40, 55]);
assert.equal(
  chooseTimeHour("09:45", 8, { min: "08:30", max: "09:00", minuteStep: 15 }),
  "08:45",
);
assert.equal(
  formatTime("13:30", "en-US", "h12").replace(/\s+/g, " "),
  "1:30 PM",
);
assert.deepEqual(textareaRows({ minRows: 2, maxRows: 5 }), { min: 2, max: 5 });
assert.deepEqual(textareaRows({ minRows: 3, maxRows: 1 }), { min: 3, max: 3 });
console.log(
  "TransferList immutable moves/disabled items, TimePicker midnight/step/locale, Textarea row bounds passed.",
);
