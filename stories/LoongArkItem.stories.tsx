import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/Item",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <L.LoongArkItem variant="outline">
        <L.LoongArkItemContent>
          <L.LoongArkItemTitle>Project Alpha</L.LoongArkItemTitle>
          <L.LoongArkItemDescription>
            Updated a moment ago
          </L.LoongArkItemDescription>
        </L.LoongArkItemContent>
        <L.LoongArkItemActions>
          <L.LoongArkButton variant="outline">Open</L.LoongArkButton>
        </L.LoongArkItemActions>
      </L.LoongArkItem>
    </div>
  ),
};
