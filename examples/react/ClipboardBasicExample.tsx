import React from "react";
import {
  LoongArkClipboardRoot,
  LoongArkClipboardLabel,
  LoongArkClipboardControl,
  LoongArkClipboardInput,
  LoongArkClipboardTrigger,
  LoongArkClipboardIndicator,
} from "@loongark/react";
export function ClipboardBasicExample() {
  return (
    <LoongArkClipboardRoot value="https://example.com">
      <LoongArkClipboardLabel>分享链接</LoongArkClipboardLabel>
      <LoongArkClipboardControl>
        <LoongArkClipboardInput />
        <LoongArkClipboardTrigger>复制</LoongArkClipboardTrigger>
      </LoongArkClipboardControl>
      <LoongArkClipboardIndicator>已复制</LoongArkClipboardIndicator>
    </LoongArkClipboardRoot>
  );
}
