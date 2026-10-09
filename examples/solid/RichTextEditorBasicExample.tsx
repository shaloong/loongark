/** @jsxImportSource solid-js */

import { LoongArkRichTextEditor } from "@loongark/solid";
export function RichTextEditorBasicExample() {
  return (
    <LoongArkRichTextEditor
      label="项目备注"
      defaultValue={{
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "开始记录项目想法。" }],
          },
        ],
      }}
    />
  );
}
