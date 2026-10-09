import React from "react";
import { LoongArkKbdGroup, LoongArkKbd } from "@loongark/react";
export function KbdBasicExample() {
  return (
    <LoongArkKbdGroup>
      <LoongArkKbd>Ctrl</LoongArkKbd>
      <span>+</span>
      <LoongArkKbd>K</LoongArkKbd>
    </LoongArkKbdGroup>
  );
}
