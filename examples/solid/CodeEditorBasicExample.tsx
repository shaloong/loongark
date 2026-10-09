/** @jsxImportSource solid-js */

import { LoongArkCodeEditor } from "@loongark/solid";
export function CodeEditorBasicExample() {
  return (
    <LoongArkCodeEditor
      label="示例代码"
      language="typescript"
      defaultValue={"const greeting = 'Hello';"}
    />
  );
}
