import React from "react";
import { LoongArkContextMenu } from "@loongark/react";
export function ContextMenuBasicExample() {
  return (
    <LoongArkContextMenu.Root>
      <LoongArkContextMenu.Trigger>右键打开菜单</LoongArkContextMenu.Trigger>
      <LoongArkContextMenu.Positioner>
        <LoongArkContextMenu.Content>
          <LoongArkContextMenu.Item value="refresh">
            刷新
          </LoongArkContextMenu.Item>
        </LoongArkContextMenu.Content>
      </LoongArkContextMenu.Positioner>
    </LoongArkContextMenu.Root>
  );
}
