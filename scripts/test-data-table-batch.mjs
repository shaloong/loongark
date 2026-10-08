import assert from "node:assert/strict";
import {
  createDataTableBatchEditor,
  renderDataTableBatchMarkup,
} from "../packages/kit/dist/index.js";
const make = () => ({
  data: [
    { id: "a", name: "Alpha", amount: 2 },
    { id: "b", name: "Beta", amount: 3 },
  ],
  columns: [
    { key: "id", label: "ID", editor: {} },
    {
      key: "name",
      label: "Name",
      editor: {
        validate: (value) =>
          String(value).length < 3 ? "too short" : undefined,
      },
    },
    {
      key: "amount",
      label: "Amount",
      editor: {
        type: "number",
        validate: (value, row) =>
          value < row.amount ? "below original" : undefined,
      },
    },
  ],
  onBatchCommit: () => {},
});
const editor = createDataTableBatchEditor(() => {});
let props = make(),
  calls = 0,
  last;
const apply = (details) => {
  calls++;
  last = details;
  props.data = props.data.map((row) =>
    details.changes
      .filter((change) => change.rowId === row.id)
      .reduce((current, change) => {
        const next = { ...current };
        if (change.value === undefined) delete next[change.columnKey];
        else next[change.columnKey] = change.value;
        return next;
      }, row),
  );
  editor.sync(props, ["a", "b"]);
};
props.onBatchCommit = apply;
editor.begin(props, ["a", "b"]);
editor.enable("amount", true);
editor.change("amount", "2");
await editor.save(props);
assert.equal(calls, 0);
assert.match(editor.state.error, /b.*below original/);
assert.equal(props.data[0].amount, 2);
// 错误渲染引发的原生 blur/change 载荷未变，不得清掉错误字段与焦点依据。
editor.change("amount", "2");
assert.match(editor.state.error, /b.*below original/);
assert.equal(editor.state.errorColumn, "amount");
editor.change("amount", "5");
assert.equal(editor.state.error, undefined);
assert.equal(editor.state.errorColumn, undefined);
editor.enable("name", true);
editor.change("name", "New name");
await editor.save(props);
assert.equal(calls, 1);
assert.equal(last.changes.length, 4);
assert(Object.isFrozen(last.changes));
assert.equal(editor.state.undo, true);
assert.equal(props.data[1].amount, 5);
await editor.save(props, true);
assert.equal(calls, 2);
assert.equal(props.data[0].name, "Alpha");
assert.equal(props.data[1].amount, 3);
assert.equal(editor.state.undo, false);
editor.begin(props, ["a", "b"]);
editor.enable("amount", true);
editor.change("amount", "8");
await editor.save(props);
props.data[0] = { ...props.data[0], name: "Concurrent" };
editor.sync(props, ["a", "b"]);
assert.equal(editor.state.undo, false);
await editor.save(props, true);
assert.equal(calls, 3);
assert.match(editor.state.error, /Rows changed/);
props = make();
let reject;
props.onBatchCommit = () =>
  new Promise((_, r) => {
    reject = r;
  });
editor.begin(props, ["a", "b"]);
editor.enable("name", true);
editor.change("name", "Draft");
const pending = editor.save(props);
await Promise.resolve();
editor.cancel();
await pending;
reject(Error("late failure"));
await Promise.resolve();
assert.equal(editor.state.active, false);
assert.equal(editor.state.pending, false);
props = make();
props.onBatchCommit = () => "rejected atomically";
editor.begin(props, ["a", "b"]);
editor.enable("name", true);
editor.change("name", "Draft");
await editor.save(props);
assert.equal(editor.state.active, true);
assert.equal(editor.state.drafts.name, "Draft");
assert.equal(props.data[0].name, "Alpha");
editor.sync(props, ["b"]);
assert.equal(editor.state.active, false);
editor.begin(props, ["a", "missing"]);
assert.equal(editor.state.active, false);
editor.begin(props, ["a", "b"]);
props.columns[1].editor.validate = () => "new";
editor.sync(props, ["a", "b"]);
assert.equal(editor.state.active, false);
editor.begin(props, ["a", "b"]);
props.columns[1].editor.type = "textarea";
editor.sync(props, ["a", "b"]);
assert.equal(editor.state.active, false);
props = make();
props.data[0].name = '<img src=x onerror="alert(1)">';
editor.begin(props, ["a", "b"]);
editor.enable("name", true);
editor.change("name", "<script>unsafe</script>");
const markup = renderDataTableBatchMarkup(
  props,
  ["a", "b"],
  editor.state,
  'form"',
);
assert(!markup.includes("<script>"));
assert(markup.includes("&lt;script&gt;"));
assert(markup.includes("form&quot;"));
props = make();
props.onBatchCommit = (details) => {
  props = {
    ...props,
    data: props.data.map((row) =>
      details.changes
        .filter((change) => change.rowId === row.id)
        .reduce(
          (current, change) => ({
            ...current,
            [change.columnKey]: change.value,
          }),
          row,
        ),
    ),
  };
  editor.sync(props, ["a", "b"]);
};
editor.begin(props, ["a", "b"]);
editor.enable("name", true);
editor.change("name", "Replacement props");
await editor.save(props);
assert.equal(editor.state.undo, true);
props.onBatchCommit = () => "undo rejected";
await editor.save(props, true);
editor.sync(props, ["a", "b"]);
assert.equal(editor.state.undo, true);
assert.equal(editor.state.error, "undo rejected");
editor.dispose();
console.log(
  "DataTable batch: atomic validation, immutable change set, accepted update, undo conflict, cancellation, stale validators and escaped markup passed",
);
let beginCount = 0;
const coordinated = createDataTableBatchEditor(
  () => {},
  () => beginCount++,
);
coordinated.begin(make(), []);
assert.equal(beginCount, 0);
coordinated.begin(make(), ["missing"]);
assert.equal(beginCount, 0);
coordinated.begin(make(), ["a"]);
assert.equal(beginCount, 1);
coordinated.dispose();

// 多步历史必须逐批恢复原始快照，并且拒绝、取消不消耗历史。
const historyEditor = createDataTableBatchEditor(() => {});
let historyProps = make();
const historySelection = ["a", "b"];
let operations = [],
  rejected = false;
const commitHistory = (details) => {
  operations.push(details.operation);
  if (rejected) return "replay rejected";
  historyProps.data = historyProps.data.map((row) =>
    details.changes
      .filter((change) => change.rowId === row.id)
      .reduce((row, change) => {
        const next = { ...row };
        if (change.value === undefined) delete next[change.columnKey];
        else next[change.columnKey] = change.value;
        return next;
      }, row),
  );
  historyEditor.sync(historyProps, historySelection);
};
historyProps.onBatchCommit = commitHistory;
async function batchName(name) {
  historyEditor.begin(historyProps, historySelection);
  historyEditor.enable("name", true);
  historyEditor.change("name", name);
  await historyEditor.save(historyProps);
}
await batchName("First batch");
await batchName("Second batch");
assert.equal(historyEditor.state.undoCount, 2);
await historyEditor.save(historyProps, "undo");
assert.equal(historyProps.data[0].name, "First batch");
await historyEditor.save(historyProps, "undo");
assert.equal(historyProps.data[0].name, "Alpha");
assert.equal(historyProps.data[1].name, "Beta");
assert.equal(historyEditor.state.redoCount, 2);
rejected = true;
await historyEditor.save(historyProps, "redo");
assert.equal(historyEditor.state.redoCount, 2);
assert.equal(historyEditor.state.redo, true);
rejected = false;
await historyEditor.save(historyProps, "redo");
assert.equal(historyProps.data[0].name, "First batch");
await historyEditor.save(historyProps, "redo");
assert.equal(historyProps.data[0].name, "Second batch");
assert.equal(historyEditor.state.redoCount, 0);
await historyEditor.save(historyProps, "undo");
historyProps.historyLimit = 1;
historyEditor.sync(historyProps, historySelection);
assert.equal(historyEditor.state.undoCount + historyEditor.state.redoCount, 1);
assert.equal(historyEditor.state.redo, true);
historyProps.historyLimit = 50;
await batchName("Branch batch");
assert.equal(historyEditor.state.redoCount, 0);
assert.deepEqual(operations.slice(0, 4), ["apply", "apply", "undo", "undo"]);
historyProps.historyLimit = 1;
historyEditor.sync(historyProps, historySelection);
assert.equal(historyEditor.state.undoCount, 1);
await historyEditor.save(historyProps, "undo");
assert.equal(historyEditor.state.undo, false);
// 外部修改整行的其他字段同样禁止重做，防止静默覆盖并发状态。
historyProps.data[0] = { ...historyProps.data[0], amount: 99 };
historyEditor.sync(historyProps, historySelection);
assert.equal(historyEditor.state.redo, false);
const priorCalls = operations.length;
await historyEditor.save(historyProps, "redo");
assert.equal(operations.length, priorCalls);
assert.match(historyEditor.state.error, /Rows changed/);
historyProps.data[0] = { ...historyProps.data[0], amount: 2 };
historyEditor.sync(historyProps, historySelection);
assert.equal(historyEditor.state.redo, true);
let release;
historyProps.onBatchCommit = () =>
  new Promise((resolve) => (release = resolve));
const canceledRedo = historyEditor.save(historyProps, "redo");
await Promise.resolve();
historyEditor.cancel();
await canceledRedo;
release();
await Promise.resolve();
assert.equal(historyEditor.state.redoCount, 1);
assert.equal(historyEditor.state.redo, true);
historyEditor.dispose();
console.log(
  "DataTable multi-step history: undo/redo order, rejected replay, branch invalidation, bounded storage, external conflicts and canceled replay passed",
);
