import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/NativeSelect",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <L.LoongArkNativeSelect aria-label="Select framework">
        <option>React</option>
        <option>Vue</option>
        <option>Solid</option>
        <option>Svelte</option>
      </L.LoongArkNativeSelect>
    </div>
  ),
};
