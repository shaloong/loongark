import React from "react";
import {
  LoongArkCollapsibleRoot,
  LoongArkCollapsibleTrigger,
  LoongArkCollapsibleContent,
} from "@loongark/react";
export function CollapsibleBasicExample() {
  return (
    <LoongArkCollapsibleRoot>
      <LoongArkCollapsibleTrigger>查看详细信息</LoongArkCollapsibleTrigger>
      <LoongArkCollapsibleContent>
        展开内容保留组件的键盘和焦点行为。
      </LoongArkCollapsibleContent>
    </LoongArkCollapsibleRoot>
  );
}
