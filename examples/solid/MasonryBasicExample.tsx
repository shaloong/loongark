/** @jsxImportSource solid-js */

import { LoongArkMasonry } from "@loongark/solid";
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
