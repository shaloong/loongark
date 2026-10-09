/** @jsxImportSource solid-js */

import { LoongArkDialog } from "@loongark/solid";
export function DialogBasicExample() {
  return (
    <LoongArkDialog.Root>
      <LoongArkDialog.Trigger>打开弹窗</LoongArkDialog.Trigger>
      <LoongArkDialog.Portal>
        <LoongArkDialog.Overlay />
        <LoongArkDialog.Positioner>
          <LoongArkDialog.Content>
            <LoongArkDialog.Title>确认设置</LoongArkDialog.Title>
            <LoongArkDialog.Description>
              关闭窗口后返回触发按钮。
            </LoongArkDialog.Description>
            <LoongArkDialog.CloseTrigger>关闭</LoongArkDialog.CloseTrigger>
          </LoongArkDialog.Content>
        </LoongArkDialog.Positioner>
      </LoongArkDialog.Portal>
    </LoongArkDialog.Root>
  );
}
