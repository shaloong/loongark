import assert from "node:assert/strict";
import {
  createDataTableEditor,
  dataTableView,
} from "../packages/kit/dist/index.js";
const make = (extra = {}) => ({
  data: [
    { id: "a", name: "Alpha", amount: 20 },
    { id: "b", name: "Beta", amount: 10 },
  ],
  columns: [
    { key: "id", label: "ID", editor: {} },
    {
      key: "name",
      label: "Name",
      editor: { validate: (v) => (v.length < 3 ? "Too short" : undefined) },
    },
    { key: "amount", label: "Amount", editor: { type: "number" } },
  ],
  onCellCommit: () => {},
  ...extra,
});
const current = { query: "", page: 1 };
const view = (p) => dataTableView(p, current);
let notices = 0;
const editor = createDataTableEditor(() => notices++);
let props = make(),
  calls = 0;
props.onCellCommit = () => {
  calls++;
};
assert.equal(editor.canEdit(props, props.columns[0]), false);
assert.equal(
  editor.canEdit({ ...props, onCellCommit: undefined }, props.columns[1]),
  false,
);
editor.begin(props, view(props), "a", "name");
editor.change("x");
await editor.save(props, view(props));
assert.equal(editor.state.error, "Too short");
assert.equal(calls, 0);
editor.change("New");
await editor.save(props, view(props));
assert.equal(calls, 1);
assert.equal(editor.state, undefined);
assert.equal(props.data[0].name, "Alpha");
editor.begin(props, view(props), "a", "amount");
editor.change("");
await editor.save(props, view(props));
assert.equal(editor.state.error, "Enter a finite number");
editor.change("Infinity");
await editor.save(props, view(props));
assert.equal(calls, 1);
let details;
props.onCellCommit = (d) => {
  details = d;
  return "Rejected";
};
editor.change("12.5");
await editor.save(props, view(props));
assert.equal(details.value, 12.5);
assert.equal(details.previousValue, 20);
assert.ok(Object.isFrozen(details.row));
assert.equal(editor.state.error, "Rejected");
props.onCellCommit = () => {
  throw Error("private details");
};
await editor.save(props, view(props));
assert.equal(editor.state.error, "Could not save. Try again.");
const deferred = () => {
  let resolve, reject;
  const promise = new Promise((r, j) => {
    resolve = r;
    reject = j;
  });
  return { promise, resolve, reject };
};
const old = deferred();
let signal;
props.onCellCommit = (d) => {
  signal = d.signal;
  calls++;
  return old.promise;
};
const saving = editor.save(props, view(props));
await Promise.resolve();
assert.equal(editor.state.pending, true);
await editor.save(props, view(props));
assert.equal(calls, 2);
editor.cancel();
await saving;
assert.equal(signal.aborted, true);
assert.equal(editor.state, undefined);
const next = deferred();
props.onCellCommit = () => next.promise;
editor.begin(props, view(props), "b", "name");
const nextSave = editor.save(props, view(props));
await Promise.resolve();
old.reject(Error("late"));
await Promise.resolve();
assert.equal(editor.state.rowId, "b");
assert.equal(editor.state.pending, true);
next.resolve();
await nextSave;
assert.equal(editor.state, undefined);
for (const change of [
  (p) => ({ ...p, loading: true }),
  (p) => ({ ...p, data: p.data.slice(1) }),
  (p) => ({ ...p, columnKeys: ["amount"] }),
  (p) => ({
    ...p,
    data: p.data.map((r) => ({ ...r, name: r.name + " changed" })),
  }),
  (p) => ({
    ...p,
    columns: p.columns.map((c) =>
      c.key === "name" ? { ...c, editor: { validate: () => undefined } } : c,
    ),
  }),
]) {
  props = make();
  editor.begin(props, view(props), "a", "name");
  const changed = change(props);
  editor.sync(changed, view(changed));
  assert.equal(editor.state, undefined);
}
props = make();
editor.begin(props, view(props), "a", "name");
editor.sync(props, dataTableView(props, { query: "alpha", page: 1 }));
assert.equal(editor.state, undefined);
const blocked = deferred();
props = make({ onCellCommit: () => blocked.promise });
editor.begin(props, view(props), "a", "name");
const disposed = editor.save(props, view(props));
await Promise.resolve();
editor.dispose();
await disposed;
blocked.resolve();
assert.equal(editor.state, undefined);
assert.ok(notices > 0);
props = make();
editor.begin(props, view(props), "a", "name");
props.columns[1].editor.validate = () => "new rule";
editor.sync(props, view(props));
assert.equal(editor.state, undefined);
// 在委托保存回调运行前取消，不触发业务写入。
let earlyCalls = 0;
props = make({
  onCellCommit: () => {
    earlyCalls++;
  },
});
editor.begin(props, view(props), "a", "name");
const earlySave = editor.save(props, view(props));
editor.cancel();
await earlySave;
assert.equal(earlyCalls, 0);
props = make({ labels: { invalidNumber: "请输入有限数值" } });
editor.begin(props, view(props), "a", "amount");
editor.change("");
await editor.save(props, view(props));
assert.equal(editor.state.error, "请输入有限数值");
editor.cancel();
console.log(
  "DataTable editing: drafts, validation, numeric conversion, immutable data, mutex, cancel, late rejection, source/view changes and cleanup passed",
);
