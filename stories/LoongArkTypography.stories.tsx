import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/Typography",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <div style={{ display: "grid", gap: 16 }}>
        <L.LoongArkTypography as="h1">The Taxing Laugh</L.LoongArkTypography>
        <L.LoongArkTypography as="h2">
          A neutral foundation
        </L.LoongArkTypography>
        <L.LoongArkTypography>
          Consistent rhythm, clear hierarchy and familiar controls.
        </L.LoongArkTypography>
      </div>
    </div>
  ),
};

export const Muted: StoryObj = {
  render: () => (
    <L.LoongArkStack gap="sm">
      <L.LoongArkTypography>Workspace details</L.LoongArkTypography>
      <L.LoongArkTypography variant="muted">
        Secondary information stays readable in both themes.
      </L.LoongArkTypography>
    </L.LoongArkStack>
  ),
};
