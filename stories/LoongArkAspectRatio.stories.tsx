import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/AspectRatio",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <L.LoongArkAspectRatio ratio={16 / 9}>
        <div
          style={{
            height: "100%",
            display: "grid",
            placeItems: "center",
            background: "var(--lk-color-semantic-muted)",
          }}
        >
          16 : 9
        </div>
      </L.LoongArkAspectRatio>
    </div>
  ),
};
