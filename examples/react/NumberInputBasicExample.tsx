import React from "react";
import {
  LoongArkNumberInputRoot,
  LoongArkNumberInputLabel,
  LoongArkNumberInputControl,
  LoongArkNumberInputInput,
  LoongArkNumberInputIncrementTrigger,
  LoongArkNumberInputDecrementTrigger,
} from "@loongark/react";
export function NumberInputBasicExample() {
  return (
    <LoongArkNumberInputRoot defaultValue="1" min={0} max={10}>
      <LoongArkNumberInputLabel>数量</LoongArkNumberInputLabel>
      <LoongArkNumberInputControl>
        <LoongArkNumberInputInput />
        <LoongArkNumberInputIncrementTrigger aria-label="增加" />
        <LoongArkNumberInputDecrementTrigger aria-label="减少" />
      </LoongArkNumberInputControl>
    </LoongArkNumberInputRoot>
  );
}
