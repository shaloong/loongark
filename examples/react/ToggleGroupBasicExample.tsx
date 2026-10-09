import React from "react";
import {
  LoongArkToggleGroupRoot,
  LoongArkToggleGroupItem,
} from "@loongark/react";
export function ToggleGroupBasicExample() {
  return (
    <LoongArkToggleGroupRoot>
      <LoongArkToggleGroupItem value="bold">加粗</LoongArkToggleGroupItem>
      <LoongArkToggleGroupItem value="italic">斜体</LoongArkToggleGroupItem>
    </LoongArkToggleGroupRoot>
  );
}
