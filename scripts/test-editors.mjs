import assert from "node:assert/strict";
import {
  richTextNode,
  richTextDocument,
  richTextLinkUrl,
  richTextEmpty,
  renderRichTextEditorMarkup,
  renderCodeEditorMarkup,
  loadCodeLanguage,
} from "../packages/kit/dist/index.js";
const doc = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Safe <script> & text",
          marks: [{ type: "link", attrs: { href: "https://shaloong.com" } }],
        },
      ],
    },
  ],
};
const before = JSON.stringify(doc),
  node = richTextNode(doc);
assert.equal(node.textContent, "Safe <script> & text");
assert.equal(JSON.stringify(doc), before);
assert.equal(richTextEmpty(node), false);
assert.equal(richTextEmpty(richTextNode()), true);
assert.ok(richTextNode(richTextDocument(node)).eq(node));
for (const href of [
  "javascript:alert(1)",
  "data:text/html,x",
  "java\nscript:x",
  "//host",
]) {
  assert.equal(richTextLinkUrl(href), undefined);
  assert.throws(() =>
    richTextNode({
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "x",
              marks: [{ type: "link", attrs: { href } }],
            },
          ],
        },
      ],
    }),
  );
}
for (const href of [
  "https://shaloong.com",
  "mailto:hello@shaloong.com",
  "tel:+123",
  "/docs",
  "#top",
  "../docs",
]) {
  assert.equal(richTextLinkUrl(href), href);
}
assert.throws(() =>
  richTextNode({
    type: "doc",
    content: [{ type: "image", attrs: { src: "x" } }],
  }),
);
assert.throws(() => richTextNode({ type: "paragraph" }));
assert.throws(() =>
  richTextNode({
    type: "doc",
    content: [{ type: "text", text: "wrong block" }],
  }),
);
assert.throws(() =>
  richTextNode({
    type: "doc",
    content: [{ type: "heading", attrs: { level: 100 } }],
  }),
);
assert.throws(() =>
  richTextNode({
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [{ type: "text", text: "x".repeat(1048577) }],
      },
    ],
  }),
);
let nested = { type: "paragraph" };
for (let depth = 0; depth < 102; depth++)
  nested = { type: "blockquote", content: [nested] };
assert.throws(
  () => richTextNode({ type: "doc", content: [nested] }),
  RangeError,
);
const table = {
  type: "doc",
  content: [
    {
      type: "table",
      content: [
        {
          type: "table_row",
          content: [
            {
              type: "table_cell",
              attrs: { colspan: 1, rowspan: 1, colwidth: [160] },
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Cell" }],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
assert.ok(
  richTextNode(richTextDocument(richTextNode(table))).eq(richTextNode(table)),
);
// 调用方改写输入或输出的列宽数组不能改变已经创建的编辑器文档。
const isolatedTable = richTextNode(table);
table.content[0].content[0].content[0].attrs.colwidth[0] = 280;
assert.equal(
  isolatedTable.firstChild.firstChild.firstChild.attrs.colwidth[0],
  160,
);
const exportedTable = richTextDocument(isolatedTable);
exportedTable.content[0].content[0].content[0].attrs.colwidth[0] = 320;
assert.equal(
  isolatedTable.firstChild.firstChild.firstChild.attrs.colwidth[0],
  160,
);
assert.throws(() =>
  richTextNode({
    ...table,
    content: [
      {
        type: "table",
        content: [
          {
            type: "table_row",
            content: [
              {
                type: "table_cell",
                attrs: { colspan: 1, colwidth: [NaN] },
                content: [{ type: "paragraph" }],
              },
            ],
          },
        ],
      },
    ],
  }),
);
let callbacks = 0;
const rich = renderRichTextEditorMarkup(
  {
    defaultValue: doc,
    onValueChange: () => callbacks++,
    onReady: () => callbacks++,
    name: "body",
    required: true,
  },
  "rich<id>",
);
assert.ok(rich.includes("Safe &lt;script&gt; &amp; text"));
assert.ok(!rich.includes("<script>"));
assert.ok(rich.includes('name="body"'));
assert.ok(rich.includes("rich&lt;id&gt;"));
const code = renderCodeEditorMarkup(
  {
    defaultValue: "</textarea><script>x</script>\nnext",
    onReady: () => callbacks++,
    required: true,
  },
  "code",
);
assert.ok(code.includes("&lt;/textarea&gt;"));
assert.ok(!code.includes("<script>"));
assert.equal(callbacks, 0);
assert.ok(
  renderCodeEditorMarkup({ labels: { undo: undefined } }, "partial").includes(
    'aria-label="Undo"',
  ),
);
assert.ok(
  renderRichTextEditorMarkup(
    { labels: { bold: undefined } },
    "partial-rich",
  ).includes('aria-label="Bold"'),
);
for (const language of [
  "plain",
  "javascript",
  "typescript",
  "json",
  "html",
  "css",
  "python",
  "markdown",
])
  assert.ok(await loadCodeLanguage(language, new AbortController().signal));
let complete;
const controller = new AbortController(),
  pending = loadCodeLanguage(
    () => new Promise((resolve) => (complete = resolve)),
    controller.signal,
  );
controller.abort();
complete([]);
await assert.rejects(pending, { name: "AbortError" });
console.log(
  "编辑器模型/SSR：文档结构与大小、表格几何、链接协议、不可变往返、转义、8语法包及取消通过。",
);
