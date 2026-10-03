import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ChartExample } from "../examples/react/ChartExample";
const meta = {
  title: "Compositions/Chart Overview",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <main style={{ width: "min(100%,800px)", marginInline: "auto" }}>
      <ChartExample />
    </main>
  ),
};
