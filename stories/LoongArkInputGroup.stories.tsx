import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/InputGroup",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <L.LoongArkInputRoot>
        <L.LoongArkInputLabel>Website</L.LoongArkInputLabel>
        <L.LoongArkInputGroup>
          <L.LoongArkInputPrefix>https://</L.LoongArkInputPrefix>
          <L.LoongArkInputControl placeholder="example.com" />
        </L.LoongArkInputGroup>
      </L.LoongArkInputRoot>
    </div>
  ),
};
