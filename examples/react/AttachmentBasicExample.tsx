import React from "react";
import { LoongArkAttachment } from "@shaloong/loongark-react";
export function AttachmentBasicExample() {
  return (
    <LoongArkAttachment
      name="说明.txt"
      size={1024}
      href="data:text/plain,Hello"
    />
  );
}
