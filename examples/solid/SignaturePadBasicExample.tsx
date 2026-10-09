/** @jsxImportSource solid-js */

import { LoongArkSignaturePad } from "@loongark/solid";
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
