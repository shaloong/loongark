import React from "react";
import {
  LoongArkCheckboxRoot,
  LoongArkCheckboxControl,
  LoongArkCheckboxIndicator,
  LoongArkCheckboxLabel,
  LoongArkCheckboxHiddenInput,
} from "@loongark/react";
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
