import React from "react";
import {
  LoongArkTooltipRoot,
  LoongArkTooltipTrigger,
  LoongArkTooltipPositioner,
  LoongArkTooltipContent,
} from "@loongark/react";
export function TooltipBasicExample() {
  return (
    <LoongArkTooltipRoot>
      <LoongArkTooltipTrigger asChild={false}>查看提示</LoongArkTooltipTrigger>
      <LoongArkTooltipPositioner>
        <LoongArkTooltipContent>
          支持键盘聚焦和鼠标悬停。
        </LoongArkTooltipContent>
      </LoongArkTooltipPositioner>
    </LoongArkTooltipRoot>
  );
}
