import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/Alert",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <L.LoongArkAlert>
        <L.LoongArkAlertTitle>Changes saved</L.LoongArkAlertTitle>
        <L.LoongArkAlertDescription>
          Your workspace settings are up to date.
        </L.LoongArkAlertDescription>
      </L.LoongArkAlert>
    </div>
  ),
};
