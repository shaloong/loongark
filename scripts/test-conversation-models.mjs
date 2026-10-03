import assert from "node:assert/strict";
import {
  attachmentView,
  fileSize,
  questionnaireValue,
  questionError,
  toggleQuestionAnswer,
  questionnaireQuestions,
  questionnaireVisibleQuestions,
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

// 分支返回保留编辑答案；隐藏无效必填题不参与提交，校验看到完整归一化答案。
const conditional = [
  {
    id: "kind",
    label: "Kind",
    type: "single",
    options: [
      { value: "team", label: "Team" },
      { value: "personal", label: "Personal" },
    ],
  },
  {
    id: "team",
    label: "Team",
    type: "text",
    required: true,
    when: (value) => value.kind === "team",
    validate: (answer, value) =>
      answer === value.kind ? "Use a specific name." : undefined,
  },
  {
    id: "email",
    label: "Email",
    type: "text",
    validate: (answer) =>
      typeof answer === "string" && answer.includes("@")
        ? undefined
        : "Use an email address.",
  },
];
const all = questionnaireValue(conditional, {
  kind: "personal",
  team: "Retained team",
  email: "wrong",
  stale: "removed",
});
const visible = questionnaireVisibleQuestions(conditional, all);
assert.deepEqual(
  visible.map((q) => q.id),
  ["kind", "email"],
);
assert.deepEqual(questionnaireValue(visible, all), {
  kind: "personal",
  email: "wrong",
});
assert.equal(all.team, "Retained team");
assert.deepEqual(
  questionnaireVisibleQuestions(conditional, { ...all, kind: "team" }).map(
    (q) => q.id,
  ),
  ["kind", "team", "email"],
);
assert.equal(
  questionError(conditional[1], { kind: "team", team: "team" }),
  "Use a specific name.",
);
assert.equal(
  questionError(conditional[1], { kind: "team", team: "" }),
  "Please answer this question.",
);
assert.equal(questionError(conditional[2], all), "Use an email address.");
assert.equal(
  questionError(conditional[2], { ...all, email: "reader@example.com" }),
  "",
);
assert.equal(
  questionnaireVisibleQuestions([{ ...conditional[1], when: () => false }], {
    team: "",
  }).length,
  0,
);
console.log("条件题可见性、隐藏值序列化、分支恢复与业务校验通过");
