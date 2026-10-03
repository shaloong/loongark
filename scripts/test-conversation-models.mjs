import assert from "node:assert/strict";
import {
  attachmentView,
  fileSize,
  questionnaireValue,
  questionError,
  toggleQuestionAnswer,
  questionnaireQuestions,
} from "../packages/kit/dist/index.js";
assert.equal(fileSize(-1), "");
assert.equal(fileSize(Infinity), "");
assert.equal(fileSize(0), "0 B");
assert.equal(fileSize(1536), "1.5 KB");
assert.equal(
  attachmentView({ name: "a", progress: NaN, status: "uploading", href: "/a" })
    .progress,
  undefined,
);
assert.equal(attachmentView({ name: "a", progress: 120 }).progress, 100);
assert.equal(
  attachmentView({ name: "a", status: "error", href: "/a" }).link,
  undefined,
);
assert.equal(
  attachmentView({ name: "a", disabled: true, href: "/a" }).link,
  undefined,
);
const questions = [
  {
    id: "role",
    label: "Role",
    type: "single",
    required: true,
    options: [
      { value: "dev", label: "Developer" },
      { value: "old", label: "Old", disabled: true },
    ],
  },
  {
    id: "areas",
    label: "Areas",
    type: "multiple",
    required: true,
    options: [
      { value: "ui", label: "UI" },
      { value: "a11y", label: "A11y" },
    ],
  },
  {
    id: "notes",
    label: "Notes",
    type: "text",
    required: true,
    minLength: 5,
    maxLength: 10,
  },
];
assert.deepEqual(
  questionnaireValue(questions, {
    role: "old",
    areas: ["ui", "ui", "missing"],
    notes: ["wrong"],
    extra: "stale",
  }),
  { role: "", areas: ["ui"], notes: "" },
);
assert.ok(questionError(questions[0], { role: "old" }));
assert.ok(questionError(questions[2], { notes: "   " }));
assert.ok(questionError(questions[2], { notes: "tiny" }));
assert.equal(questionError(questions[2], { notes: "valid" }), "");
const original = { role: "dev", areas: ["ui"], notes: "valid" };
const next = toggleQuestionAnswer(original, questions[1], "a11y", true);
assert.deepEqual(next.areas, ["ui", "a11y"]);
assert.deepEqual(original.areas, ["ui"]);
assert.deepEqual(toggleQuestionAnswer(next, questions[1], "ui", false).areas, [
  "a11y",
]);
assert.equal(
  toggleQuestionAnswer(original, questions[0], "old", true),
  original,
);
assert.throws(
  () => questionnaireQuestions([questions[0], questions[0]]),
  /unique/,
);
assert.throws(
  () =>
    questionnaireQuestions([
      {
        ...questions[0],
        options: [questions[0].options[0], questions[0].options[0]],
      },
    ]),
  /unique/,
);
console.log(
  "附件无效进度、禁用下载；问卷陈旧答案、必填、长度、不可变选择与重复标识回归通过",
);

const reservedId = {
  id: "__proto__",
  label: "Notes",
  type: "text",
  required: true,
};
const reservedAnswer = Object.fromEntries([["__proto__", "valid"]]);
const normalizedReserved = questionnaireValue([reservedId], reservedAnswer);
assert.equal(Object.hasOwn(normalizedReserved, "__proto__"), true);
assert.equal(normalizedReserved["__proto__"], "valid");
assert.equal(questionError(reservedId, reservedAnswer), "");
assert.ok(questionError(reservedId, {}));
