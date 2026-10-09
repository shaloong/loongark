/** @jsxImportSource solid-js */

import { LoongArkGrid } from "@loongark/solid";
export function GridBasicExample() {
  return (
    <LoongArkGrid columns={2} gap="md">
      <div>第一列</div>
      <div>第二列</div>
    </LoongArkGrid>
  );
}
