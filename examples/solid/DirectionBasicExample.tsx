/** @jsxImportSource solid-js */

import { LoongArkDirection, LoongArkNativeSelect } from "@loongark/solid";
export function DirectionBasicExample() {
  return (
    <LoongArkDirection dir="rtl">
      <LoongArkNativeSelect aria-label="从右向左的选项">
        <option value="one">方向与箭头留白</option>
        <option value="two">第二项</option>
      </LoongArkNativeSelect>
    </LoongArkDirection>
  );
}
