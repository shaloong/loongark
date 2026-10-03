import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/ContextMenu",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <L.LoongArkContextMenu.Root>
        <L.LoongArkContextMenu.Trigger>
          Right-click here
        </L.LoongArkContextMenu.Trigger>
        <L.LoongArkPortal>
          <L.LoongArkContextMenu.Positioner>
            <L.LoongArkContextMenu.Content>
              <L.LoongArkContextMenu.Item value="refresh">
                Refresh
              </L.LoongArkContextMenu.Item>
            </L.LoongArkContextMenu.Content>
          </L.LoongArkContextMenu.Positioner>
        </L.LoongArkPortal>
      </L.LoongArkContextMenu.Root>
    </div>
  ),
};
