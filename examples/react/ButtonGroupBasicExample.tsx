import React from "react";
import { LoongArkButtonGroup, LoongArkButton } from "@loongark/react";
export function ButtonGroupBasicExample() {
  return (
    <LoongArkButtonGroup>
      <LoongArkButton variant="outline">保存草稿</LoongArkButton>
      <LoongArkButton>发布</LoongArkButton>
    </LoongArkButtonGroup>
  );
}
