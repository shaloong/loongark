import assert from "node:assert/strict";
import {
  createConversationActionController,
  normalizeConversationActions,
} from "../packages/kit/dist/index.js";
const history = [],
  control = createConversationActionController((state) => history.push(state));
let finish,
  calls = 0,
  signal;
const pending = control.run({
  id: "save",
  label: "Save",
  onAction: (context) => {
    signal = context.signal;
    calls++;
    return new Promise((resolve) => (finish = resolve));
  },
  successLabel: "Saved",
});
await control.run({ id: "save", label: "Save", onAction: () => calls++ });
assert.equal(calls, 1);
assert.equal(control.state.pendingId, "save");
finish();
await pending;
assert.equal(control.state.message, "Saved");
await control.run(
  {
    id: "save",
    label: "Save",
    onAction: () => {
      throw Error("Secret server error");
    },
  },
  { error: "Please retry" },
);
assert.deepEqual(control.state, { outcome: "error", message: "Please retry" });
await control.run({
  id: "save",
  label: "Save",
  onAction: async () => {
    throw Error("Rejected");
  },
});
assert.equal(control.state.outcome, "error");
let retired;
const abandoned = control.run({
  id: "save",
  label: "Save",
  onAction: (context) => {
    signal = context.signal;
    return new Promise((resolve) => (retired = resolve));
  },
  successLabel: "Stale completion",
});
control.reset();
assert.equal(signal.aborted, true);
assert.deepEqual(control.state, {});
await control.run({
  id: "save",
  label: "Save",
  onAction: () => {},
  successLabel: "Current completion",
});
retired();
await abandoned;
assert.equal(control.state.message, "Current completion");
await control.run({
  id: "disabled",
  label: "Disabled",
  disabled: true,
  onAction: () => calls++,
});
assert.equal(calls, 1);
let disposedFinish;
const disposed = control.run({
  id: "save",
  label: "Save",
  onAction: (context) => {
    signal = context.signal;
    return new Promise((resolve) => (disposedFinish = resolve));
  },
  successLabel: "After unmount",
});
control.dispose();
const previous = history.length;
assert.equal(signal.aborted, true);
disposedFinish();
await disposed;
assert.equal(history.length, previous);
await control.run({ id: "never", label: "Never", onAction: () => calls++ });
assert.equal(calls, 1);
assert.throws(
  () =>
    normalizeConversationActions([
      { id: "retry", label: "Retry", onAction: () => {} },
    ]),
  /ids/,
);
assert.throws(
  () =>
    normalizeConversationActions([{ id: "x", label: " ", onAction: () => {} }]),
  /labels/,
);
assert.throws(
  () =>
    normalizeConversationActions([
      { id: "x", label: "X", onAction: () => {} },
      { id: "x", label: "Other", onAction: () => {} },
    ]),
  /ids/,
);
console.log("动作同步异常、异步失败、重复触发、取消后旧完成与卸载清理通过");
