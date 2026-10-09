import React from "react";
import {
  LoongArkAlertDialogRoot,
  LoongArkDialogTrigger,
  LoongArkDialogPortal,
  LoongArkDialogOverlay,
  LoongArkDialogPositioner,
  LoongArkDialogContent,
  LoongArkDialogTitle,
  LoongArkDialogDescription,
  LoongArkDialogCloseTrigger,
} from "@loongark/react";
export function AlertDialogBasicExample() {
  return (
    <LoongArkAlertDialogRoot>
      <LoongArkDialogTrigger>确认操作</LoongArkDialogTrigger>
      <LoongArkDialogPortal>
        <LoongArkDialogOverlay />
        <LoongArkDialogPositioner>
          <LoongArkDialogContent>
            <LoongArkDialogTitle>继续操作？</LoongArkDialogTitle>
            <LoongArkDialogDescription>
              关闭窗口不会修改任何数据。
            </LoongArkDialogDescription>
            <LoongArkDialogCloseTrigger>取消</LoongArkDialogCloseTrigger>
          </LoongArkDialogContent>
        </LoongArkDialogPositioner>
      </LoongArkDialogPortal>
    </LoongArkAlertDialogRoot>
  );
}
