/** @jsxImportSource solid-js */

import { LoongArkStack, LoongArkSkeleton } from "@loongark/solid";
export function SkeletonBasicExample() {
  return (
    <LoongArkStack>
      <LoongArkSkeleton />
      <LoongArkSkeleton />
      <span>内容正在加载</span>
    </LoongArkStack>
  );
}
