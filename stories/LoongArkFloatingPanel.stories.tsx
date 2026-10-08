import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/FloatingPanel",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <L.LoongArkFloatingPanel.Root>
        <L.LoongArkFloatingPanel.Trigger>
          Open inspector
        </L.LoongArkFloatingPanel.Trigger>
        <L.LoongArkFloatingPanel.Positioner>
          <L.LoongArkFloatingPanel.Content>
            <L.LoongArkFloatingPanel.Header>
              <L.LoongArkFloatingPanel.Title>
                Inspector
              </L.LoongArkFloatingPanel.Title>
              <L.LoongArkFloatingPanel.CloseTrigger>
                Close
              </L.LoongArkFloatingPanel.CloseTrigger>
            </L.LoongArkFloatingPanel.Header>
            <L.LoongArkFloatingPanel.Body>
              Drag and resize this panel.
            </L.LoongArkFloatingPanel.Body>
            <L.LoongArkFloatingPanel.ResizeTrigger axis="se" />
          </L.LoongArkFloatingPanel.Content>
        </L.LoongArkFloatingPanel.Positioner>
      </L.LoongArkFloatingPanel.Root>
    </div>
  ),
};
