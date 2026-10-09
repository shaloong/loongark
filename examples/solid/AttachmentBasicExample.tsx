/** @jsxImportSource solid-js */

import { LoongArkAttachment } from "@loongark/solid";
export function AttachmentBasicExample() {
  return (
    <LoongArkAttachment
      name="说明.txt"
      size={1024}
      href="data:text/plain,Hello"
    />
  );
}
