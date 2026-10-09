/** @jsxImportSource solid-js */

import {
  LoongArkNumberInputRoot,
  LoongArkNumberInputLabel,
  LoongArkNumberInputControl,
  LoongArkNumberInputInput,
  LoongArkNumberInputIncrementTrigger,
  LoongArkNumberInputDecrementTrigger,
} from "@loongark/solid";
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
