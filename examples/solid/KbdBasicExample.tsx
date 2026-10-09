/** @jsxImportSource solid-js */

import { LoongArkKbdGroup, LoongArkKbd } from "@loongark/solid";
export function KbdBasicExample() {
  return (
    <LoongArkKbdGroup>
      <LoongArkKbd>Ctrl</LoongArkKbd>
      <span>+</span>
      <LoongArkKbd>K</LoongArkKbd>
    </LoongArkKbdGroup>
  );
}
