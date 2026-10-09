import React from "react";
import { LoongArkRichTextEditor } from "@loongark/react";
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
