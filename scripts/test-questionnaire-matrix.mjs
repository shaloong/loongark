import assert from "node:assert/strict";
import {
  questionnaireValue,
  questionnaireQuestions,
  questionError,
  questionnaireFormEntries,
  renderQuestionControl,
  createQuestionnaireValidationController,
} from "../packages/kit/dist/index.js";
const q = {
  id: "m",
  label: "Matrix",
  type: "matrix",
  multiple: true,
  required: true,
  minSelections: 1,
  maxSelections: 2,
  rows: [
    { id: "one", label: "First" },
    { id: "two", label: "Second" },
    { id: "disabled", label: "Disabled", disabled: true },
  ],
  options: [
    { value: "a", label: "A" },
    { value: "b", label: "B" },
    { value: "c", label: "C" },
    { value: "x", label: "Unavailable", disabled: true },
  ],
};
const input = {
  m: {
    one: ["b", "a", "b", "x", "stale"],
    two: "a",
    disabled: ["b"],
    stale: ["a"],
  },
};
const normalized = questionnaireValue([q], input);
assert.deepEqual(normalized, { m: { one: ["a", "b"] } });
assert.deepEqual(input.m.one, ["b", "a", "b", "x", "stale"]);
normalized.m.one.push("c");
assert.deepEqual(input.m.one, ["b", "a", "b", "x", "stale"]);
assert.ok(questionError(q, { m: { one: ["a"] } }));
assert.ok(questionError(q, { m: { one: ["a", "b", "c"], two: ["a"] } }));
assert.equal(questionError(q, { m: { one: ["b", "a"], two: ["c"] } }), "");
assert.equal(
  questionError({ ...q, required: false, minSelections: 2 }, { m: {} }),
  "",
);
assert.ok(
  questionError(
    { ...q, required: false, minSelections: 2 },
    { m: { one: ["a"] } },
  ),
);
assert.equal(
  questionError(
    { ...q, required: false, minSelections: 2 },
    { m: { one: ["a", "b"] } },
  ),
  "",
);
const scalar = {
  ...q,
  multiple: false,
  minSelections: undefined,
  maxSelections: undefined,
};
assert.deepEqual(
  questionnaireValue([scalar], { m: { one: ["a"], two: "b" } }),
  { m: { two: "b" } },
);
assert.equal(
  questionError(
    { ...q, required: false, maxSelections: 0, minSelections: 0 },
    { m: {} },
  ),
  "",
);
for (const patch of [
  { minSelections: -1 },
  { maxSelections: 1.5 },
  { minSelections: Infinity },
  { minSelections: 3, maxSelections: 2 },
  { type: "single", multiple: true },
  { multiple: false, maxSelections: 2 },
])
  assert.throws(
    () => questionnaireQuestions([{ ...q, ...patch }]),
    /selection|matrix/i,
  );
assert.deepEqual(
  questionnaireFormEntries({ m: { one: ["a", "b"], two: ["c"] }, text: "end" }),
  [
    ["m[one]", "a"],
    ["m[one]", "b"],
    ["m[two]", "c"],
    ["text", "end"],
  ],
);
const html = renderQuestionControl(
  q,
  { m: { one: ["a", "b"] } },
  'hint" error',
  true,
);
assert.match(html, /type="checkbox"/);
assert.match(html, /name="m\[one\]"/);
assert.match(html, /data-row="two" aria-invalid="true"/);
assert.ok(!html.includes('aria-required="true"'));
assert.ok(html.includes("hint&quot; error"));
assert.match(html, /value="x"[^>]*disabled/);
const value = { m: { one: ["a"], two: ["b"] } };
let snapshot;
const asyncQ = {
  ...q,
  validateAsync: async (answer, all) => {
    snapshot = all;
    assert.ok(Object.isFrozen(answer));
    assert.ok(Object.isFrozen(answer.one));
    assert.throws(() => answer.one.push("c"), TypeError);
    assert.throws(() => all.m.two.splice(0, 1), TypeError);
    return undefined;
  },
};
const validation = createQuestionnaireValidationController(() => {});
validation.sync([asyncQ], value, "m", false);
const result = await validation.run([asyncQ], value);
assert.deepEqual(result, { value });
assert.notEqual(snapshot.m.one, value.m.one);
assert.deepEqual(value, { m: { one: ["a"], two: ["b"] } });
validation.dispose();
console.log(
  "矩阵多选的行约束、无效项过滤、原生重复名称、旧单选兼容及嵌套异步快照隔离通过。",
);
