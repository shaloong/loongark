import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  LoongArkToggleGroupRoot,
  LoongArkToggleGroupItem,
} from "@loongark/react";

const meta: Meta = {
  title: "Components/Toggle Group",
  parameters: {
    docs: {
      description: {
        component:
          "LoongArkToggleGroup wraps Ark UI Toggle Group with token-driven styling and size/orientation variants.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

interface ToggleGroupDemoProps {
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
}

const ToggleGroupDemo = ({
  size = "md",
  orientation = "horizontal",
}: ToggleGroupDemoProps) => (
  <LoongArkToggleGroupRoot
    defaultValue={["overview"]}
    size={size}
    orientation={orientation}
  >
    <LoongArkToggleGroupItem value="overview">Overview</LoongArkToggleGroupItem>
    <LoongArkToggleGroupItem value="activity">Activity</LoongArkToggleGroupItem>
    <LoongArkToggleGroupItem value="settings">Settings</LoongArkToggleGroupItem>
  </LoongArkToggleGroupRoot>
);

export const Basic: Story = {
  render: () => <ToggleGroupDemo />,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <ToggleGroupDemo size="sm" />
      <ToggleGroupDemo size="md" />
      <ToggleGroupDemo size="lg" />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => <ToggleGroupDemo orientation="vertical" />,
};
