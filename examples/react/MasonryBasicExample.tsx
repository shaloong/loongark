import React from "react";
import { LoongArkMasonry } from "@loongark/react";
export function MasonryBasicExample() {
  return (
    <LoongArkMasonry columns={2}>
      <div>第一项</div>
      <div>
        第二项
        <br />
        更多内容
      </div>
      <div>第三项</div>
    </LoongArkMasonry>
  );
}
