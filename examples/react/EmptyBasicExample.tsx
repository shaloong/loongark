import React from "react";
import {
  LoongArkEmpty,
  LoongArkEmptyHeader,
  LoongArkEmptyTitle,
  LoongArkEmptyDescription,
  LoongArkEmptyContent,
  LoongArkButton,
} from "@loongark/react";
export function EmptyBasicExample() {
  return (
    <LoongArkEmpty>
      <LoongArkEmptyHeader>
        <LoongArkEmptyTitle>暂无文件</LoongArkEmptyTitle>
        <LoongArkEmptyDescription>
          添加文件后将在这里显示。
        </LoongArkEmptyDescription>
      </LoongArkEmptyHeader>
      <LoongArkEmptyContent>
        <LoongArkButton>添加文件</LoongArkButton>
      </LoongArkEmptyContent>
    </LoongArkEmpty>
  );
}
