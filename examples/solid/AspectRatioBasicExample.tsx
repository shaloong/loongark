/** @jsxImportSource solid-js */

import { LoongArkAspectRatio, LoongArkPaper } from "@shaloong/loongark-solid";
export function AspectRatioBasicExample() {
  return (
    <LoongArkAspectRatio ratio={16 / 9}>
      <LoongArkPaper padding="md">16:9 内容区域</LoongArkPaper>
    </LoongArkAspectRatio>
  );
}
