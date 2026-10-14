import React from "react";
import { LoongArkCodeEditor } from "@shaloong/loongark-react";
export function CodeEditorBasicExample() {
  return (
    <LoongArkCodeEditor
      label="示例代码"
      language="typescript"
      defaultValue={"const greeting = 'Hello';"}
    />
  );
}
