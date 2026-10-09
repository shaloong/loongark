import React from "react";
import { LoongArkDrawer } from "@loongark/react";
export function DrawerBasicExample() {
  return (
    <LoongArkDrawer.Root>
      <LoongArkDrawer.Trigger>打开抽屉</LoongArkDrawer.Trigger>
      <LoongArkDrawer.Portal>
        <LoongArkDrawer.Overlay />
        <LoongArkDrawer.Positioner>
          <LoongArkDrawer.Content>
            <LoongArkDrawer.Title>偏好设置</LoongArkDrawer.Title>
            <LoongArkDrawer.Description>
              查看或修改偏好。
            </LoongArkDrawer.Description>
            <LoongArkDrawer.Action>完成</LoongArkDrawer.Action>
          </LoongArkDrawer.Content>
        </LoongArkDrawer.Positioner>
      </LoongArkDrawer.Portal>
    </LoongArkDrawer.Root>
  );
}
