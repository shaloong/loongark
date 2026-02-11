import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  LoongArkSplitterRoot,
  LoongArkSplitterPanel,
  LoongArkSplitterResizeTrigger,
  LoongArkSplitterResizeTriggerIndicator,
} from "@loongark/react";

const meta: Meta = {
  title: "Components/Splitter",
  parameters: {
    docs: {
      description: {
        component: "LoongArkSplitter arranges resizable panels with a handle.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

interface SplitterDemoProps {
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
  locked?: boolean;
}

const SplitterDemo = ({
  size = "md",
  orientation = "horizontal",
  locked = false,
}: SplitterDemoProps) => {
  const height = orientation === "vertical" ? 240 : 160;

  return (
    <LoongArkSplitterRoot
      size={size}
      orientation={orientation}
      style={{ height }}
    >
      <LoongArkSplitterPanel minSize={20}>
        <div style={{ padding: 12 }}>Notes</div>
      </LoongArkSplitterPanel>
      <LoongArkSplitterResizeTrigger disabled={locked}>
        <LoongArkSplitterResizeTriggerIndicator />
      </LoongArkSplitterResizeTrigger>
      <LoongArkSplitterPanel minSize={20}>
        <div style={{ padding: 12 }}>Preview</div>
      </LoongArkSplitterPanel>
    </LoongArkSplitterRoot>
  );
};

export const Basic: Story = {
  render: () => <SplitterDemo />,
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <SplitterDemo orientation="horizontal" />
      <SplitterDemo orientation="vertical" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <SplitterDemo locked={false} />
      <SplitterDemo locked />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <SplitterDemo size="sm" />
      <SplitterDemo size="md" />
      <SplitterDemo size="lg" />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => <SplitterDemo />,
};
