import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/AlertDialog",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <L.LoongArkAlertDialog.Root>
        <L.LoongArkAlertDialog.Trigger>
          Delete workspace
        </L.LoongArkAlertDialog.Trigger>
        <L.LoongArkAlertDialog.Portal>
          <L.LoongArkAlertDialog.Overlay />
          <L.LoongArkAlertDialog.Positioner>
            <L.LoongArkAlertDialog.Content>
              <L.LoongArkAlertDialog.Title>
                Are you sure?
              </L.LoongArkAlertDialog.Title>
              <L.LoongArkAlertDialog.Description>
                This action removes this workspace.
              </L.LoongArkAlertDialog.Description>
              <L.LoongArkAlertDialog.Cancel>
                Cancel
              </L.LoongArkAlertDialog.Cancel>
              <L.LoongArkAlertDialog.Action>
                Continue
              </L.LoongArkAlertDialog.Action>
            </L.LoongArkAlertDialog.Content>
          </L.LoongArkAlertDialog.Positioner>
        </L.LoongArkAlertDialog.Portal>
      </L.LoongArkAlertDialog.Root>
    </div>
  ),
};
