import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  LoongArkSegmentGroupRoot,
  LoongArkSegmentGroupItem,
} from "@loongark/react";

const meta: Meta = {
  title: "Components/Segment Group",
  parameters: {
    docs: {
      description: {
        component:
          "LoongArkSegmentGroup provides a segmented control style on top of Ark UI Toggle Group.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

interface SegmentGroupDemoProps {
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
}

const SegmentGroupDemo = ({
  size = "md",
  orientation = "horizontal",
}: SegmentGroupDemoProps) => (
  <LoongArkSegmentGroupRoot
    defaultValue={["overview"]}
    size={size}
    orientation={orientation}
  >
    <LoongArkSegmentGroupItem value="overview">Overview</LoongArkSegmentGroupItem>
    <LoongArkSegmentGroupItem value="activity">Activity</LoongArkSegmentGroupItem>
    <LoongArkSegmentGroupItem value="settings">Settings</LoongArkSegmentGroupItem>
  </LoongArkSegmentGroupRoot>
);

export const Basic: Story = {
  render: () => <SegmentGroupDemo />,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <SegmentGroupDemo size="sm" />
      <SegmentGroupDemo size="md" />
      <SegmentGroupDemo size="lg" />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => <SegmentGroupDemo orientation="vertical" />,
};
