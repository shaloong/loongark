/** @jsxImportSource solid-js */

import { LoongArkNativeSelect } from "@loongark/solid";
export function NativeSelectBasicExample() {
  return (
    <LoongArkNativeSelect name="plan" aria-label="方案">
      <option value="free">免费方案</option>
      <option value="pro">专业方案与较长的选项名称</option>
    </LoongArkNativeSelect>
  );
}
