import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/Skeleton",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <div style={{ display: "grid", gap: 12 }}>
        <L.LoongArkSkeleton
          style={{ height: 40, width: 40, borderRadius: "50%" }}
        />
        <L.LoongArkSkeleton style={{ width: "80%", height: 16 }} />
        <L.LoongArkSkeleton style={{ width: "60%", height: 16 }} />
      </div>
    </div>
  ),
};
