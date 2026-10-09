/** @jsxImportSource solid-js */

import {
  LoongArkTooltipRoot,
  LoongArkTooltipTrigger,
  LoongArkTooltipPositioner,
  LoongArkTooltipContent,
} from "@loongark/solid";
export function TooltipBasicExample() {
  return (
    <LoongArkTooltipRoot>
      <LoongArkTooltipTrigger>查看提示</LoongArkTooltipTrigger>
      <LoongArkTooltipPositioner>
        <LoongArkTooltipContent>
          支持键盘聚焦和鼠标悬停。
        </LoongArkTooltipContent>
      </LoongArkTooltipPositioner>
    </LoongArkTooltipRoot>
  );
}
