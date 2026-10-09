/** @jsxImportSource solid-js */

import {
  LoongArkPopoverRoot,
  LoongArkPopoverTrigger,
  LoongArkPopoverPositioner,
  LoongArkPopoverContent,
  LoongArkPopoverTitle,
  LoongArkPopoverDescription,
  LoongArkPopoverCloseTrigger,
} from "@loongark/solid";
export function PopoverBasicExample() {
  return (
    <LoongArkPopoverRoot>
      <LoongArkPopoverTrigger>打开详情</LoongArkPopoverTrigger>
      <LoongArkPopoverPositioner>
        <LoongArkPopoverContent>
          <LoongArkPopoverTitle>详情</LoongArkPopoverTitle>
          <LoongArkPopoverDescription>
            浮层继承当前主题。
          </LoongArkPopoverDescription>
          <LoongArkPopoverCloseTrigger aria-label="关闭">
            关闭
          </LoongArkPopoverCloseTrigger>
        </LoongArkPopoverContent>
      </LoongArkPopoverPositioner>
    </LoongArkPopoverRoot>
  );
}
