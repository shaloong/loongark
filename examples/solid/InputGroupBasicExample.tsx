/** @jsxImportSource solid-js */

import {
  LoongArkInputRoot,
  LoongArkInputLabel,
  LoongArkInputGroup,
  LoongArkInputPrefix,
  LoongArkInputControl,
} from "@loongark/solid";
export function InputGroupBasicExample() {
  return (
    <LoongArkInputRoot>
      <LoongArkInputLabel>网站</LoongArkInputLabel>
      <LoongArkInputGroup>
        <LoongArkInputPrefix>https://</LoongArkInputPrefix>
        <LoongArkInputControl name="website" placeholder="example.com" />
      </LoongArkInputGroup>
    </LoongArkInputRoot>
  );
}
