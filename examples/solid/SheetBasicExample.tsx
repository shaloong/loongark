/** @jsxImportSource solid-js */

import {
  LoongArkSheetRoot,
  LoongArkSheetTrigger,
  LoongArkSheetPortal,
  LoongArkSheetOverlay,
  LoongArkSheetPositioner,
  LoongArkSheetContent,
  LoongArkSheetTitle,
  LoongArkSheetDescription,
  LoongArkSheetAction,
} from "@loongark/solid";
export function SheetBasicExample() {
  return (
    <LoongArkSheetRoot>
      <LoongArkSheetTrigger>打开侧边面板</LoongArkSheetTrigger>
      <LoongArkSheetPortal>
        <LoongArkSheetOverlay />
        <LoongArkSheetPositioner>
          <LoongArkSheetContent>
            <LoongArkSheetTitle>编辑偏好</LoongArkSheetTitle>
            <LoongArkSheetDescription>
              关闭后恢复触发器焦点。
            </LoongArkSheetDescription>
            <LoongArkSheetAction>完成</LoongArkSheetAction>
          </LoongArkSheetContent>
        </LoongArkSheetPositioner>
      </LoongArkSheetPortal>
    </LoongArkSheetRoot>
  );
}
