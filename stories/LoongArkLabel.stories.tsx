import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/Label",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <L.LoongArkInputRoot>
        <L.LoongArkLabel htmlFor="label-demo">Name</L.LoongArkLabel>
        <L.LoongArkInputControl id="label-demo" />
      </L.LoongArkInputRoot>
    </div>
  ),
};
