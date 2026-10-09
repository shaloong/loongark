import React from "react";
import { LoongArkGrid } from "@loongark/react";
export function GridBasicExample() {
  return (
    <LoongArkGrid columns={2} gap="md">
      <div>第一列</div>
      <div>第二列</div>
    </LoongArkGrid>
  );
}
