/** @jsxImportSource solid-js */

import { LoongArkClientOnly } from "@shaloong/loongark-solid";
export function ClientOnlyBasicExample() {
  return (
    <LoongArkClientOnly>
      <p>仅在客户端显示的内容。</p>
    </LoongArkClientOnly>
  );
}
