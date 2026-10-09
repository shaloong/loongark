import React from "react";
import {
  LoongArkMenubar,
  LoongArkMenuRoot,
  LoongArkMenuTrigger,
  LoongArkMenuPositioner,
  LoongArkMenuContent,
  LoongArkMenuItem,
} from "@loongark/react";
export function MenubarBasicExample() {
  return (
    <LoongArkMenubar>
      <LoongArkMenuRoot>
        <LoongArkMenuTrigger asChild={false}>文件</LoongArkMenuTrigger>
        <LoongArkMenuPositioner>
          <LoongArkMenuContent>
            <LoongArkMenuItem value="new">新建</LoongArkMenuItem>
            <LoongArkMenuItem value="save">保存</LoongArkMenuItem>
          </LoongArkMenuContent>
        </LoongArkMenuPositioner>
      </LoongArkMenuRoot>
    </LoongArkMenubar>
  );
}
