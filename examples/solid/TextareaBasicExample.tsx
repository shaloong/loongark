/** @jsxImportSource solid-js */

import { LoongArkLabel, LoongArkTextarea } from "@loongark/solid";
export function TextareaBasicExample() {
  return (
    <div>
      <LoongArkLabel htmlFor="basic-notes">备注</LoongArkLabel>
      <LoongArkTextarea
        id="basic-notes"
        name="notes"
        autoSize
        minRows={2}
        maxRows={5}
        placeholder="输入备注…"
      />
    </div>
  );
}
