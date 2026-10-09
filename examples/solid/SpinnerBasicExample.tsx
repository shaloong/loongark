/** @jsxImportSource solid-js */

import { LoongArkStack, LoongArkSpinner } from "@loongark/solid";
export function SpinnerBasicExample() {
  return (
    <LoongArkStack orientation="horizontal">
      <LoongArkSpinner aria-label="加载中" />
      <span>正在载入组件</span>
    </LoongArkStack>
  );
}
