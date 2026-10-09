import React from "react";
import { LoongArkStack, LoongArkSkeleton } from "@loongark/react";
export function SkeletonBasicExample() {
  return (
    <LoongArkStack>
      <LoongArkSkeleton />
      <LoongArkSkeleton />
      <span>内容正在加载</span>
    </LoongArkStack>
  );
}
