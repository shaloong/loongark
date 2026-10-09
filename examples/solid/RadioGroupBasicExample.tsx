/** @jsxImportSource solid-js */

import {
  LoongArkRadioGroupRoot,
  LoongArkRadioGroupLabel,
  LoongArkRadioGroupItem,
  LoongArkRadioGroupItemControl,
  LoongArkRadioGroupItemText,
  LoongArkRadioGroupItemHiddenInput,
} from "@loongark/solid";
export function RadioGroupBasicExample() {
  return (
    <LoongArkRadioGroupRoot name="plan" defaultValue="basic">
      <LoongArkRadioGroupLabel>方案</LoongArkRadioGroupLabel>
      <LoongArkRadioGroupItem value="basic">
        <LoongArkRadioGroupItemControl />
        <LoongArkRadioGroupItemText>基础</LoongArkRadioGroupItemText>
        <LoongArkRadioGroupItemHiddenInput />
      </LoongArkRadioGroupItem>
      <LoongArkRadioGroupItem value="pro">
        <LoongArkRadioGroupItemControl />
        <LoongArkRadioGroupItemText>专业</LoongArkRadioGroupItemText>
        <LoongArkRadioGroupItemHiddenInput />
      </LoongArkRadioGroupItem>
    </LoongArkRadioGroupRoot>
  );
}
