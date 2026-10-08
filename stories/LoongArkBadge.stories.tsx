import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/Badge",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <div style={{ display: "flex", gap: 8 }}>
        {["default", "secondary", "outline", "destructive"].map((variant) => (
          <L.LoongArkBadge key={variant} variant={variant as "default"}>
            {variant}
          </L.LoongArkBadge>
        ))}
      </div>
    </div>
  ),
};
