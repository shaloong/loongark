import React from "react";
import {
  LoongArkMenuRoot,
  LoongArkMenuTrigger,
  LoongArkMenuPositioner,
  LoongArkMenuContent,
  LoongArkMenuItem,
} from "@loongark/react";
export function MenuBasicExample() {
  return (
    <LoongArkMenuRoot>
      <LoongArkMenuTrigger asChild={false}>操作</LoongArkMenuTrigger>
      <LoongArkMenuPositioner>
        <LoongArkMenuContent>
          <LoongArkMenuItem value="copy">复制</LoongArkMenuItem>
          <LoongArkMenuItem value="archive">归档</LoongArkMenuItem>
        </LoongArkMenuContent>
      </LoongArkMenuPositioner>
    </LoongArkMenuRoot>
  );
}
