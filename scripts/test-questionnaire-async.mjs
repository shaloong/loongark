import assert from "node:assert/strict";
import {
  createQuestionnaireValidationController,
  questionError,
} from "../packages/kit/dist/index.js";
const deferred = () => {
  let resolve, reject;
  const promise = new Promise((a, b) => {
    resolve = a;
    reject = b;
  });
  return { promise, resolve, reject };
};
const changes = [];
const controller = createQuestionnaireValidationController((s) =>
  changes.push(s),
);
let calls = 0;
const first = deferred();
let signal;
const question = {
  id: "name",
  label: "Name",
  type: "text",
  required: true,
  validateAsync: (answer, value, context) => {
    calls++;
    signal = context.signal;
    assert.equal(value.name, answer);
    return first.promise;
  },
};
controller.sync([question], { name: "" }, "name", false);
assert.deepEqual(await controller.run([question], { name: "" }), {
  invalidId: "name",
});
assert.equal(calls, 0, "必填校验阻止服务请求");
controller.sync([question], { name: "old" }, "name", false);
const pending = controller.run([question], { name: "old" });
assert.equal(controller.state.pending, true);
assert.equal(
  await controller.run([question], { name: "old" }),
  undefined,
  "互斥提交",
);
controller.sync([question], { name: "new" }, "name", false);
assert.equal(signal.aborted, true);
assert.equal(await pending, undefined, "忽略取消的请求也应立即结束等待");
first.reject(new Error("late rejection"));
await Promise.resolve();
assert.deepEqual(controller.state, { pending: false, errors: {} });
const fail = {
  ...question,
  validateAsync: async () => {
    throw Error("network");
  },
};
controller.sync([fail], { name: "valid" }, "name", false);
assert.deepEqual(
  await controller.run(
    [fail],
    { name: "valid" },
    { validationErrorLabel: "Retry check" },
  ),
  { invalidId: "name" },
);
assert.equal(controller.state.errors.name, "Retry check");
const retry = { ...question, validateAsync: async () => undefined };
controller.sync([retry], { name: "valid" }, "name", false);
assert.deepEqual(await controller.run([retry], { name: "valid" }), {
  value: { name: "valid" },
});
for (const change of ["structure", "validator", "blocked", "page"]) {
  const request = deferred();
  let abortedSignal;
  const q = {
    ...question,
    validateAsync: (_a, _v, { signal }) => {
      abortedSignal = signal;
      return request.promise;
    },
  };
  controller.sync([q], { name: "valid" }, "name", false);
  const run = controller.run([q], { name: "valid" });
  controller.sync(
    change === "structure" ? [] : change === "validator" ? [retry] : [q],
    { name: "valid" },
    change === "page" ? "other" : "name",
    change === "blocked",
  );
  assert.equal(abortedSignal.aborted, true, change);
  assert.equal(await run, undefined);
  request.resolve("stale error");
  await Promise.resolve();
  assert.deepEqual(controller.state, { pending: false, errors: {} });
}
// 最终提交全量重新校验：早先通过的题目在后续答案变化后仍可能无效。
const cross = {
  ...retry,
  validateAsync: async (_answer, value) =>
    value.confirm === "valid" ? undefined : "Answers must match",
};
const confirm = { id: "confirm", label: "Confirm", type: "text" };
assert.deepEqual(
  await controller.run([cross, confirm], { name: "valid", confirm: "other" }),
  { invalidId: "name" },
);
let disposedSignal;
const never = deferred();
const before = changes.length;
const run = controller.run(
  [
    {
      ...question,
      validateAsync: (_a, _v, { signal }) => {
        disposedSignal = signal;
        return never.promise;
      },
    },
  ],
  { name: "valid" },
);
controller.dispose();
assert.equal(disposedSignal.aborted, true);
assert.equal(await run, undefined);
never.resolve("late");
await Promise.resolve();
assert.equal(changes.length, before + 1, "卸载不再通知");
assert.equal(await controller.run([retry], { name: "valid" }), undefined);
console.log(
  "Questionnaire async: synchronous preflight, mutual exclusion, cancellation, late rejection, replacement, retry, cross-answer revalidation and disposal passed.",
);

const reserved = { id: "constructor", label: "Reserved id", type: "text" };
assert.equal(questionError(reserved, { constructor: "valid" }, {}, {}), "");
assert.equal(
  questionError(
    reserved,
    { constructor: "valid" },
    {},
    { constructor: "Rejected" },
  ),
  "Rejected",
);

// 旧请求结束不能清空新请求的忙碌状态或提交值。
const concurrent = createQuestionnaireValidationController(() => {});
const oldRequest = deferred(),
  newRequest = deferred();
const oldQuestion = { ...question, validateAsync: () => oldRequest.promise };
concurrent.sync([oldQuestion], { name: "old" }, "name", false);
const oldRun = concurrent.run([oldQuestion], { name: "old" });
concurrent.cancel();
const newQuestion = { ...question, validateAsync: () => newRequest.promise };
concurrent.sync([newQuestion], { name: "new" }, "name", false);
const newRun = concurrent.run([newQuestion], { name: "new" });
oldRequest.resolve("Late error");
assert.equal(await oldRun, undefined);
assert.equal(concurrent.state.pending, true);
newRequest.resolve(undefined);
assert.deepEqual(await newRun, { value: { name: "new" } });
concurrent.dispose();
