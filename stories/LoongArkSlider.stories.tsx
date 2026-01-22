import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  LoongArkSliderRoot,
  LoongArkSliderLabel,
  LoongArkSliderValueText,
  LoongArkSliderControl,
  LoongArkSliderTrack,
  LoongArkSliderRange,
  LoongArkSliderThumb,
  LoongArkSliderHiddenInput,
  LoongArkSliderDraggingIndicator,
  LoongArkSliderMarkerGroup,
  LoongArkSliderMarker,
} from "@loongark/react";

const meta: Meta = {
  title: "Components/Slider",
  parameters: {
    docs: {
      description: {
        component:
          "LoongArkSlider wraps Ark UI Slider with size/orientation variants and range support.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

interface SliderDemoProps {
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
}

const SliderDemo = ({ size = "md", orientation = "horizontal" }: SliderDemoProps) => {
  const [value, setValue] = React.useState<number[]>([32]);
  return (
    <LoongArkSliderRoot
      size={size}
      orientation={orientation}
      value={value}
      min={0}
      max={100}
      onValueChange={(details) => setValue(details.value)}
    >
      <LoongArkSliderLabel>Volume</LoongArkSliderLabel>
      <LoongArkSliderValueText>{value[0]}</LoongArkSliderValueText>
      <LoongArkSliderControl>
        <LoongArkSliderTrack>
          <LoongArkSliderRange />
        </LoongArkSliderTrack>
        <LoongArkSliderThumb index={0}>
          <LoongArkSliderHiddenInput />
          <LoongArkSliderDraggingIndicator />
        </LoongArkSliderThumb>
      </LoongArkSliderControl>
      <LoongArkSliderMarkerGroup>
        {[0, 25, 50, 75, 100].map((step) => (
          <LoongArkSliderMarker value={step} key={step}>
            {step}
          </LoongArkSliderMarker>
        ))}
      </LoongArkSliderMarkerGroup>
    </LoongArkSliderRoot>
  );
};

export const Basic: Story = {
  render: () => <SliderDemo />,
};

export const Range: Story = {
  render: () => {
    const [value, setValue] = React.useState<number[]>([20, 80]);
    return (
      <LoongArkSliderRoot
        value={value}
        min={0}
        max={100}
        onValueChange={(details) => setValue(details.value)}
      >
        <LoongArkSliderLabel>Range</LoongArkSliderLabel>
        <LoongArkSliderValueText>
          {value[0]} - {value[1]}
        </LoongArkSliderValueText>
        <LoongArkSliderControl>
          <LoongArkSliderTrack>
            <LoongArkSliderRange />
          </LoongArkSliderTrack>
          <LoongArkSliderThumb index={0}>
            <LoongArkSliderHiddenInput />
            <LoongArkSliderDraggingIndicator />
          </LoongArkSliderThumb>
          <LoongArkSliderThumb index={1}>
            <LoongArkSliderHiddenInput />
            <LoongArkSliderDraggingIndicator />
          </LoongArkSliderThumb>
        </LoongArkSliderControl>
      </LoongArkSliderRoot>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <SliderDemo size="sm" />
      <SliderDemo size="md" />
      <SliderDemo size="lg" />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ height: 220 }}>
      <SliderDemo orientation="vertical" />
    </div>
  ),
};
