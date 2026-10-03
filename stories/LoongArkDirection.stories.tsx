import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/Direction",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <L.LoongArkDirection dir="rtl">
        <L.LoongArkButtonGroup>
          <L.LoongArkButton variant="outline">السابق</L.LoongArkButton>
          <L.LoongArkButton>التالي</L.LoongArkButton>
        </L.LoongArkButtonGroup>
      </L.LoongArkDirection>
    </div>
  ),
};
