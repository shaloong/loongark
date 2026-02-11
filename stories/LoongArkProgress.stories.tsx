import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  LoongArkProgressRoot,
  LoongArkProgressLabel,
  LoongArkProgressTrack,
  LoongArkProgressRange,
  LoongArkProgressValueText,
  LoongArkProgressView,
  LoongArkProgressCircle,
  LoongArkProgressCircleTrack,
  LoongArkProgressCircleRange,
} from "@loongark/react";

const meta: Meta = {
  title: "Components/Progress",
  parameters: {
    docs: {
      description: {
        component:
          "LoongArkProgress wraps Ark UI progress with linear and circular layouts.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

interface ProgressDemoProps {
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
  value?: number;
  variant?: "linear" | "circular";
}

const ProgressDemo = ({
  size = "md",
  orientation = "horizontal",
  value = 48,
  variant = "linear",
}: ProgressDemoProps) => {
  if (variant === "circular") {
    return (
      <LoongArkProgressRoot value={value} size={size}>
        <LoongArkProgressView>
          <LoongArkProgressCircle>
            <LoongArkProgressCircleTrack />
            <LoongArkProgressCircleRange />
          </LoongArkProgressCircle>
        </LoongArkProgressView>
        <LoongArkProgressValueText />
      </LoongArkProgressRoot>
    );
  }

  return (
    <LoongArkProgressRoot
      value={value}
      size={size}
      orientation={orientation}
    >
      <LoongArkProgressLabel>Loading</LoongArkProgressLabel>
      <LoongArkProgressTrack>
        <LoongArkProgressRange />
      </LoongArkProgressTrack>
      <LoongArkProgressValueText />
    </LoongArkProgressRoot>
  );
};

export const Basic: Story = {
  render: () => <ProgressDemo />,
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <ProgressDemo variant="linear" />
      <ProgressDemo variant="circular" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <ProgressDemo value={0} />
      <ProgressDemo value={50} />
      <ProgressDemo value={100} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <ProgressDemo size="sm" />
      <ProgressDemo size="md" />
      <ProgressDemo size="lg" />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = React.useState(32);
    return (
      <div style={{ display: "grid", gap: 16, width: 240 }}>
        <ProgressDemo value={value} />
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
        />
      </div>
    );
  },
};
