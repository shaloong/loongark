import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/Kbd",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <p>
        Search{" "}
        <L.LoongArkKbdGroup>
          <L.LoongArkKbd>⌘</L.LoongArkKbd>
          <L.LoongArkKbd>K</L.LoongArkKbd>
        </L.LoongArkKbdGroup>
      </p>
    </div>
  ),
};
