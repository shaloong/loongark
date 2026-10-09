import React from "react";
import {
  LoongArkPopoverRoot,
  LoongArkPopoverTrigger,
  LoongArkPopoverPositioner,
  LoongArkPopoverContent,
  LoongArkPopoverTitle,
  LoongArkPopoverDescription,
  LoongArkPopoverCloseTrigger,
} from "@loongark/react";
export function PopoverBasicExample() {
  return (
    <LoongArkPopoverRoot>
      <LoongArkPopoverTrigger asChild={false}>打开详情</LoongArkPopoverTrigger>
      <LoongArkPopoverPositioner>
        <LoongArkPopoverContent>
          <LoongArkPopoverTitle>详情</LoongArkPopoverTitle>
          <LoongArkPopoverDescription>
            浮层继承当前主题。
          </LoongArkPopoverDescription>
          <LoongArkPopoverCloseTrigger>关闭</LoongArkPopoverCloseTrigger>
        </LoongArkPopoverContent>
      </LoongArkPopoverPositioner>
    </LoongArkPopoverRoot>
  );
}
