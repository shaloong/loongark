import assert from "node:assert/strict";
import {
  questionnaireQuestions,
  questionnaireValue,
  questionnaireSubmittedValue,
  questionnaireFormEntries,
  questionError,
  renderQuestionControl,
  createQuestionnaireValidationController,
} from "../packages/kit/dist/index.js";
const leaf = { id: "name", label: "Name", type: "text", required: true };
const backup = {
  id: "backup",
  label: "Backup",
  type: "group",
  maxGroups: 2,
  questions: [leaf],
};
const group = {
  id: "contacts",
  label: "Contacts",
  type: "group",
  minGroups: 1,
  maxGroups: 3,
  questions: [
    leaf,
    { id: "visible", label: "Visible", type: "text" },
    {
      id: "private",
      label: "Private",
      type: "text",
      when: (v) => v.visible === "yes",
    },
    backup,
  ],
};
const input = {
  contacts: [
    {
      id: "alpha",
      value: {
        name: "A",
        visible: "no",
        private: "retained",
        backup: [{ id: "b1", value: { name: "B" } }],
      },
    },
    {
      id: "beta",
      value: { name: "C", visible: "yes", private: "shown", backup: [] },
    },
  ],
};
const normalized = questionnaireValue([group], input);
assert.deepEqual(normalized, input);
assert.notEqual(normalized.contacts, input.contacts);
assert.notEqual(
  normalized.contacts[0].value.backup[0].value,
  input.contacts[0].value.backup[0].value,
);
assert.deepEqual(
  questionnaireSubmittedValue([group], normalized).contacts[0].value,
  { name: "A", visible: "no", backup: [{ id: "b1", value: { name: "B" } }] },
);
assert.equal(input.contacts[0].value.private, "retained");
assert.deepEqual(
  questionnaireFormEntries(questionnaireSubmittedValue([group], normalized)),
  [
    ["contacts[alpha][name]", "A"],
    ["contacts[alpha][visible]", "no"],
    ["contacts[alpha][backup][b1][name]", "B"],
    ["contacts[beta][name]", "C"],
    ["contacts[beta][visible]", "yes"],
    ["contacts[beta][private]", "shown"],
  ],
);
assert.deepEqual(questionnaireValue([group], {}), { contacts: [] });
assert.ok(questionError(group, { contacts: [] }));
assert.ok(
  questionError(group, { contacts: [{ id: "a", value: { name: "" } }] }),
);
assert.equal(questionError(group, normalized), "");
for (const patch of [
  { minGroups: -1 },
  { maxGroups: 1.2 },
  { minGroups: 4, maxGroups: 2 },
  { questions: [] },
  { required: true, minGroups: 0, maxGroups: 0 },
])
  assert.throws(
    () => questionnaireQuestions([{ ...group, ...patch }]),
    /group/i,
  );
assert.throws(
  () => questionnaireQuestions([{ ...group, questions: [leaf, leaf] }]),
  /unique/i,
);
const cyclic = { ...group };
cyclic.questions = [cyclic];
assert.throws(() => questionnaireQuestions([cyclic]), /cycles/i);
assert.throws(
  () =>
    questionnaireValue([group], {
      contacts: [
        { id: "x", value: {} },
        { id: "x", value: {} },
      ],
    }),
  /unique/i,
);
assert.throws(
  () => questionnaireValue([group], { contacts: [{ id: "", value: {} }] }),
  /non-empty/i,
);
let seen, signal;
const asyncLeaf = {
  ...leaf,
  validateAsync: async (answer, local, { signal: request }) => {
    seen = local;
    signal = request;
    assert.ok(Object.isFrozen(local));
    assert.throws(() => {
      local.name = "changed";
    }, TypeError);
    return answer === "C" ? "Reserved" : undefined;
  },
};
const asyncGroup = {
  ...group,
  questions: [asyncLeaf, ...group.questions.slice(1)],
};
const controller = createQuestionnaireValidationController(() => {});
controller.sync([asyncGroup], normalized, "contacts", false);
assert.deepEqual(await controller.run([asyncGroup], normalized), {
  invalidId: "contacts",
});
assert.equal(seen.name, "C");
assert.equal(controller.state.errors['["contacts","beta","name"]'], "Reserved");
assert.equal(input.contacts[1].value.name, "C");
let resolve;
const pendingLeaf = {
  ...leaf,
  validateAsync: (_a, _v, context) => {
    signal = context.signal;
    return new Promise((r) => (resolve = r));
  },
};
const pendingGroup = {
  ...group,
  questions: [pendingLeaf, ...group.questions.slice(1)],
};
controller.sync([pendingGroup], normalized, "contacts", false);
const work = controller.run([pendingGroup], normalized);
assert.equal(controller.state.pending, true);
controller.sync(
  [pendingGroup],
  { contacts: normalized.contacts.slice(1) },
  "contacts",
  false,
);
assert.equal(signal.aborted, true);
resolve("late");
assert.equal(await work, undefined);
assert.deepEqual(controller.state.errors, {});
const direct = createQuestionnaireValidationController(() => {});
direct.sync([asyncLeaf], { name: "C" }, "name", false);
assert.deepEqual(await direct.run([asyncLeaf], { name: "C" }), {
  invalidId: "name",
});
assert.deepEqual(direct.state.errors, { name: "Reserved" });
direct.dispose();
controller.dispose();
console.log(
  "重复题组稳定路径、递归归一化/表单/条件、边界与循环、局部只读异步校验和取消通过。",
);

const choiceHtml = renderQuestionControl(
  {
    id: "updates",
    label: "Updates",
    type: "multiple",
    options: [
      { value: "mail", label: "Mail" },
      { value: "sms", label: "SMS", disabled: true },
    ],
  },
  { updates: ["mail", "sms"] },
  "description",
  false,
);
assert.match(
  choiceHtml,
  /data-selected="true"><input[^>]*value="mail"[^>]*checked/,
);
assert.match(choiceHtml, /value="sms"[^>]*disabled/);
assert.doesNotMatch(choiceHtml, /value="sms"[^>]*checked/);
