/** @jsxImportSource solid-js */

import { LoongArkLabel } from "@shaloong/loongark-solid";
export function LabelBasicExample() {
  return (
    <div>
      <LoongArkLabel htmlFor="basic-name">姓名</LoongArkLabel>
      <input id="basic-name" name="name" />
    </div>
  );
}
