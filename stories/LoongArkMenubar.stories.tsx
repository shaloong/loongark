import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/Menubar",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <L.LoongArkMenubar>
        <L.LoongArkMenubarRoot>
          <L.LoongArkMenubarTrigger>File</L.LoongArkMenubarTrigger>
          <L.LoongArkPortal>
            <L.LoongArkMenubarPositioner>
              <L.LoongArkMenubarContent>
                <L.LoongArkMenubarItem value="new">
                  New project
                </L.LoongArkMenubarItem>
                <L.LoongArkMenubarItem value="open">
                  Open project
                </L.LoongArkMenubarItem>
              </L.LoongArkMenubarContent>
            </L.LoongArkMenubarPositioner>
          </L.LoongArkPortal>
        </L.LoongArkMenubarRoot>
        <L.LoongArkMenubarRoot>
          <L.LoongArkMenubarTrigger>Edit</L.LoongArkMenubarTrigger>
          <L.LoongArkPortal>
            <L.LoongArkMenubarPositioner>
              <L.LoongArkMenubarContent>
                <L.LoongArkMenubarItem value="undo">Undo</L.LoongArkMenubarItem>
                <L.LoongArkMenubarItem value="redo">Redo</L.LoongArkMenubarItem>
              </L.LoongArkMenubarContent>
            </L.LoongArkMenubarPositioner>
          </L.LoongArkPortal>
        </L.LoongArkMenubarRoot>
      </L.LoongArkMenubar>
    </div>
  ),
};
