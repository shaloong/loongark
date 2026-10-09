import React from "react";
import { LoongArkSignaturePad } from "@loongark/react";
export function SignaturePadBasicExample() {
  return (
    <LoongArkSignaturePad.Root>
      <LoongArkSignaturePad.Label>签名</LoongArkSignaturePad.Label>
      <LoongArkSignaturePad.Control>
        <LoongArkSignaturePad.Segment />
        <LoongArkSignaturePad.Guide />
      </LoongArkSignaturePad.Control>
      <LoongArkSignaturePad.ClearTrigger>
        清除签名
      </LoongArkSignaturePad.ClearTrigger>
    </LoongArkSignaturePad.Root>
  );
}
