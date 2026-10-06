import assert from "node:assert/strict";
import {
  questionnaireQuestions,
  questionnaireValue,
  questionnaireFormEntries,
  questionError,
  createQuestionnaireCustomRegistry,
  createQuestionnaireTreeRenderer,
  createQuestionnaireValidationController,
  ratingGroupMachine,
} from "../packages/kit/dist/index.js";
const custom = {
  id: "answer",
  label: "Answer",
  type: "custom",
  customKind: "widget",
  required: true,
};
assert.throws(
  () => questionnaireQuestions([{ ...custom, customKind: " " }]),
  /require/,
);
assert.throws(
  () => questionnaireQuestions([{ ...custom, answerKind: "object" }]),
  /require/,
);
assert.throws(
  () => questionnaireQuestions([{ ...custom, type: "text" }]),
  /require custom/,
);
assert.deepEqual(
  questionnaireValue([{ ...custom, answerKind: "strings" }], {
    answer: ["a", "a", " ", "b"],
  }),
  { answer: ["a", "b"] },
);
const original = {
  answer: { first: ["a", "a", ""], second: "", third: "value" },
};
const normalized = questionnaireValue(
  [{ ...custom, answerKind: "map" }],
  original,
);
assert.deepEqual(normalized, { answer: { first: ["a"], third: "value" } });
original.answer.first.push("new");
assert.deepEqual(normalized.answer.first, ["a"]);
assert.deepEqual(questionnaireFormEntries(normalized), [
  ["answer[first]", "a"],
  ["answer[third]", "value"],
]);
assert.equal(
  questionError(
    { ...custom, answerKind: "map" },
    { answer: { empty: [], blank: " " } },
  ),
  "Please answer this question.",
);
let changes = 0;
const question = { ...custom, answerKind: "map" },
  state = {
    question,
    value: normalized,
    disabled: false,
    pending: false,
    showError: false,
    errors: {},
    labels: {},
    renderers: { widget: () => null },
  };
const registry = createQuestionnaireCustomRegistry(
    () => state,
    () => changes++,
  ),
  context = registry.context(["answer"], "base");
assert.equal(context.controlId, "base-control");
assert.equal(context.labelId, "base-label");
assert.ok(
  Object.isFrozen(context.path) &&
    Object.isFrozen(context.value) &&
    Object.isFrozen(context.answer) &&
    Object.isFrozen(context.answer.first),
);
assert.throws(() => context.answer.first.push("mutation"), TypeError);
context.onAnswerChange("SSR must not emit");
assert.equal(changes, 0);
assert.throws(
  () =>
    createQuestionnaireCustomRegistry(
      () => ({ ...state, renderers: {} }),
      () => {},
    ).context(["answer"], "base"),
  /requires a renderer/,
);
const grouped = {
  id: "groups",
  label: "Groups",
  type: "group",
  questions: [
    { ...custom, id: "score" },
    { id: "name", label: "Name", type: "text" },
  ],
};
state.question = grouped;
state.value = questionnaireValue([grouped], {
  groups: [
    { id: "add", value: { score: "2", name: "Local name" } },
    { id: "beta", value: { score: "4", name: "Other name" } },
  ],
});
const tree = createQuestionnaireTreeRenderer()(
    grouped,
    state.value,
    "base",
    false,
    {},
    {},
    registry,
  ),
  nodes = [];
const walk = (node) => {
  nodes.push(node);
  if (node.kind === "element") {
    assert.equal(
      new Set(node.children.map((child) => child.key)).size,
      node.children.length,
    );
    node.children.forEach(walk);
  }
};
walk(tree);
assert.equal(nodes.filter((n) => n.kind === "custom").length, 2);
assert.deepEqual(
  nodes
    .filter((n) => n.kind === "element" && n.tag === "input")
    .map((n) => [n.attrs.name, n.attrs.value]),
  [
    ["groups[add][score]", "2"],
    ["groups[beta][score]", "4"],
  ],
);
const nestedContext = nodes.find((n) => n.kind === "custom").context;
assert.deepEqual(nestedContext.path, ["groups", "add", "score"]);
assert.equal(nestedContext.value.name, "Local name");
assert.equal(nestedContext.value.score, "2");
// 混合原生题目的名称转义不能因 apostrophe 改变嵌套路径的切片偏移。
const special = {
  id: "group'&",
  label: "Special",
  type: "group",
  questions: [
    { ...custom, id: "score" },
    { id: "name'&", label: "Name", type: "text" },
  ],
};
state.question = special;
state.value = questionnaireValue([special], {
  "group'&": [{ id: "id'&", value: { score: "2", "name'&": "Safe" } }],
});
const specialNodes = [];
const specialWalk = (node) => {
  specialNodes.push(node);
  if (node.kind === "element") node.children.forEach(specialWalk);
};
specialWalk(
  createQuestionnaireTreeRenderer()(
    special,
    state.value,
    "safe",
    false,
    {},
    {},
    registry,
  ),
);
assert.ok(
  specialNodes.some(
    (node) =>
      node.kind === "html" &&
      node.html.includes(
        'name="group&#39;&amp;[id&#39;&amp;][name&#39;&amp;]"',
      ),
  ),
);
let captured;
const validation = createQuestionnaireValidationController(() => {});
const asyncQuestion = {
  ...custom,
  answerKind: "map",
  validateAsync: async (answer, value) => {
    captured = { answer, value };
    return undefined;
  },
};
validation.sync([asyncQuestion], normalized, "answer", false);
assert.ok(await validation.run([asyncQuestion], normalized));
assert.ok(
  Object.isFrozen(captured.answer.first) &&
    Object.isFrozen(captured.value.answer),
);
validation.dispose();
console.log(
  "自定义题型形状、不可变上下文、递归原生字段、SSR无回调、缺失渲染器及异步快照通过",
);

// 指针移动与点击排队时，上一项悬停值不得覆盖实际条目；程序化值亦独立于悬停。
let rating;
const action = ratingGroupMachine.implementations.actions.setValue;
const runRating = (event, hover, half = false) => {
  action({
    context: {
      get: () => hover,
      set: (_key, next) => {
        rating = next;
      },
    },
    event,
    prop: (key) => (key === "allowHalf" ? half : undefined),
  });
  return rating;
};
assert.equal(runRating({ type: "CLICK", value: 5 }, 3), 5);
assert.equal(runRating({ type: "SET_VALUE", value: 2 }, 4.5, true), 2);
assert.equal(runRating({ type: "CLICK", value: 5 }, 4.5, true), 4.5);
assert.equal(runRating({ type: "CLICK", value: 5 }, 2.5, true), 5);
assert.equal(runRating({ type: "CLICK", value: 5 }, 4.5, false), 5);
console.log("评分快速点击、程序化设置、当前半星与过期悬停契约通过");
