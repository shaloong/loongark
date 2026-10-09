/** @jsxImportSource solid-js */

import { LoongArkFloatingPanel } from "@loongark/solid";
export function FloatingPanelBasicExample() {
  return (
    <LoongArkFloatingPanel.Root>
      <LoongArkFloatingPanel.Trigger>
        打开检查面板
      </LoongArkFloatingPanel.Trigger>
      <LoongArkFloatingPanel.Positioner>
        <LoongArkFloatingPanel.Content>
          <LoongArkFloatingPanel.Header>
            <LoongArkFloatingPanel.Title>检查面板</LoongArkFloatingPanel.Title>
            <LoongArkFloatingPanel.CloseTrigger>
              关闭
            </LoongArkFloatingPanel.CloseTrigger>
          </LoongArkFloatingPanel.Header>
          <LoongArkFloatingPanel.Body>
            拖动标题栏或右下角调整面板。
          </LoongArkFloatingPanel.Body>
          <LoongArkFloatingPanel.ResizeTrigger axis="se" />
        </LoongArkFloatingPanel.Content>
      </LoongArkFloatingPanel.Positioner>
    </LoongArkFloatingPanel.Root>
  );
}
