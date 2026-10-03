import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/ButtonGroup",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <L.LoongArkButtonGroup>
        <L.LoongArkButton variant="outline">Previous</L.LoongArkButton>
        <L.LoongArkButton variant="outline">Next</L.LoongArkButton>
      </L.LoongArkButtonGroup>
    </div>
  ),
};
