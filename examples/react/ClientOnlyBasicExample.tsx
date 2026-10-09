import React from "react";
import { LoongArkClientOnly } from "@loongark/react";
export function ClientOnlyBasicExample() {
  return (
    <LoongArkClientOnly>
      <p>仅在客户端显示的内容。</p>
    </LoongArkClientOnly>
  );
}
