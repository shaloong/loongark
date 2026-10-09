import React from "react";
import { LoongArkLabel } from "@loongark/react";
export function LabelBasicExample() {
  return (
    <div>
      <LoongArkLabel htmlFor="basic-name">姓名</LoongArkLabel>
      <input id="basic-name" name="name" />
    </div>
  );
}
