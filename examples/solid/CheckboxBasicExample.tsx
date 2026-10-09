/** @jsxImportSource solid-js */

import {
  LoongArkCheckboxRoot,
  LoongArkCheckboxControl,
  LoongArkCheckboxIndicator,
  LoongArkCheckboxLabel,
  LoongArkCheckboxHiddenInput,
} from "@loongark/solid";
export function CheckboxBasicExample() {
  return (
    <LoongArkCheckboxRoot name="terms">
      <LoongArkCheckboxControl>
        <LoongArkCheckboxIndicator />
      </LoongArkCheckboxControl>
      <LoongArkCheckboxLabel>同意条款</LoongArkCheckboxLabel>
      <LoongArkCheckboxHiddenInput />
    </LoongArkCheckboxRoot>
  );
}
