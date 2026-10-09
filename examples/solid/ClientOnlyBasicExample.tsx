/** @jsxImportSource solid-js */

import { LoongArkClientOnly } from "@loongark/solid";
export function ClientOnlyBasicExample() {
  return (
    <LoongArkClientOnly>
      <p>仅在客户端显示的内容。</p>
    </LoongArkClientOnly>
  );
}
