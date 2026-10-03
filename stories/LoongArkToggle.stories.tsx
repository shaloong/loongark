import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoongArkToggleRoot, LoongArkToggleIndicator } from "@loongark/react";

const meta: Meta = {
  title: "Components/Toggle",
  parameters: {
    docs: {
      description: {
        component:
          "LoongArkToggle wraps Ark UI Toggle with token-driven styling and size variants.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

interface ToggleDemoProps {
  size?: "sm" | "md" | "lg";
  defaultPressed?: boolean;
}

const ToggleDemo = ({
  size = "md",
  defaultPressed = false,
}: ToggleDemoProps) => (
  <LoongArkToggleRoot size={size} defaultPressed={defaultPressed}>
    <LoongArkToggleIndicator>✓</LoongArkToggleIndicator>
    Favorite
  </LoongArkToggleRoot>
);

export const Basic: Story = {
  render: () => <ToggleDemo defaultPressed />,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <ToggleDemo size="sm" />
      <ToggleDemo size="md" />
      <ToggleDemo size="lg" />
    </div>
  ),
};
