import assert from "node:assert/strict";
import {
  baseTokens,
  mergeTokens,
  tokensToCssVariables,
} from "../packages/tokens/dist/index.js";
import { createLoongArkTheme } from "../packages/theme/dist/index.js";
import {
  questionnaireQuestions,
  renderQuestionControl,
  richTextNode,
  renderRichTextEditorMarkup,
  renderCodeEditorMarkup,
  renderChartMarkup,
} from "../packages/kit/dist/index.js";

// 合并结果与基础 Token、调用方配置均隔离。
const isolated = mergeTokens(baseTokens, { space: { custom: "1px" } });
const original = baseTokens.color.semantic.primary;
isolated.color.semantic.primary = "#abcdef";
assert.equal(baseTokens.color.semantic.primary, original);
assert.equal(mergeTokens(baseTokens).color.semantic.primary, original);
// 服务端配置经过 JSON 解析仍不能更改合并对象的原型。
for (const key of ["__proto__", "constructor", "prototype"]) {
  const input = JSON.parse(
    `{"color":{"semantic":{"${key}":{"polluted":"yes"}}}}`,
  );
  assert.throws(() => mergeTokens(baseTokens, input), TypeError);
  assert.equal(Object.prototype.polluted, undefined);
}
for (const value of [
  "</style><script>globalThis.pwned=1</script>",
  "#fff; } body { display:none",
  "red\u0000",
]) {
  assert.throws(() => createLoongArkTheme({ accent: value }), TypeError);
  assert.throws(
    () => tokensToCssVariables({ ...baseTokens, color: { value } }),
    TypeError,
  );
}
const cyclic = {};
cyclic.self = cyclic;
assert.throws(() => mergeTokens(baseTokens, { color: cyclic }), TypeError);
assert.throws(() => tokensToCssVariables(baseTokens, "--x:0;}"), TypeError);
assert.ok(
  createLoongArkTheme({
    brand: "vi",
    overrides: { space: { custom: "calc(1rem + 2px)" } },
  })
    .toCSS()
    .includes("calc(1rem + 2px)"),
);

const attack = 'text" autofocus onfocus="globalThis.pwned=1';
const group = {
  id: "g",
  label: "Group",
  type: "group",
  questions: [{ id: "x", label: "x", type: attack }],
};
assert.throws(() => questionnaireQuestions([group]), TypeError);
assert.throws(
  () =>
    renderQuestionControl(
      group,
      { g: [{ id: "a", value: { x: "" } }] },
      "description",
      false,
    ),
  TypeError,
);
for (const prop of ["minLength", "maxLength", "step"]) {
  const q = {
    id: "q",
    label: "Question",
    type: prop === "step" ? "number" : "text",
    [prop]: '0" autofocus onfocus="globalThis.pwned=1',
  };
  assert.throws(() => questionnaireQuestions([q]));
  assert.throws(() => renderQuestionControl(q, {}, "description", false));
}
const payload = '</textarea><img src=x onerror="globalThis.pwned=1">';
const document = {
  type: "doc",
  content: [{ type: "paragraph", content: [{ type: "text", text: payload }] }],
};
for (const html of [
  renderCodeEditorMarkup({ defaultValue: payload }, "code"),
  renderRichTextEditorMarkup({ defaultValue: document }, "rich"),
  renderQuestionControl(
    { id: "q", label: payload, type: "text" },
    { q: payload },
    payload,
    false,
  ),
  renderChartMarkup({
    title: payload,
    data: [{ label: payload, value: 1 }],
    labelKey: "label",
    series: [
      { key: "value", label: payload, color: '" onload="globalThis.pwned=1' },
    ],
  }),
]) {
  assert.ok(!html.includes("<img src=x"));
  assert.ok(!html.includes('onload="globalThis.pwned=1'));
}
for (const href of [
  "javascript:alert(1)",
  "data:text/html,x",
  "java\nscript:x",
])
  assert.throws(() =>
    richTextNode({
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "link",
              marks: [{ type: "link", attrs: { href } }],
            },
          ],
        },
      ],
    }),
  );
assert.throws(
  () =>
    richTextNode({
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "x",
              marks: Array.from({ length: 10001 }, () => ({ type: "strong" })),
            },
          ],
        },
      ],
    }),
  RangeError,
);
console.log(
  "安全回归通过：Token 原型/样式逃逸、问卷配置/属性、富文本资源限额与内容输出转义。",
);
