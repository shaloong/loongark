import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  LoongArkColorPickerRoot,
  LoongArkColorPickerLabel,
  LoongArkColorPickerControl,
  LoongArkColorPickerTrigger,
  LoongArkColorPickerPositioner,
  LoongArkColorPickerContent,
  LoongArkColorPickerView,
  LoongArkColorPickerArea,
  LoongArkColorPickerAreaBackground,
  LoongArkColorPickerAreaThumb,
  LoongArkColorPickerChannelSlider,
  LoongArkColorPickerChannelSliderTrack,
  LoongArkColorPickerChannelSliderThumb,
  LoongArkColorPickerChannelInput,
  LoongArkColorPickerSwatchGroup,
  LoongArkColorPickerSwatchTrigger,
  LoongArkColorPickerSwatchIndicator,
  LoongArkColorPickerSwatch,
  LoongArkColorPickerValueText,
  LoongArkColorPickerValueSwatch,
} from "@loongark/react";

const meta: Meta = {
  title: "Components/ColorPicker",
  parameters: {
    docs: {
      description: {
        component: "LoongArkColorPicker wraps Ark UI color picker with panel styling.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

const swatches = ["#0EA5E9", "#8B5CF6", "#F97316", "#10B981"];

interface ColorPickerDemoProps {
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  showSwatches?: boolean;
}

const ColorPickerDemo = ({
  size = "md",
  disabled = false,
  showSwatches = true,
}: ColorPickerDemoProps) => {
  const [value, setValue] = React.useState("#6366F1");

  return (
    <LoongArkColorPickerRoot
      size={size}
      disabled={disabled}
      value={value}
      onValueChange={(details: { value: string }) => setValue(details.value)}
    >
      <LoongArkColorPickerLabel>Brand color</LoongArkColorPickerLabel>
      <LoongArkColorPickerControl>
        <LoongArkColorPickerTrigger disabled={disabled}>
          <LoongArkColorPickerValueSwatch />
          <LoongArkColorPickerValueText />
        </LoongArkColorPickerTrigger>
      </LoongArkColorPickerControl>
      <LoongArkColorPickerPositioner>
        <LoongArkColorPickerContent>
          <div style={{ display: "grid", gap: 12 }}>
            <LoongArkColorPickerView>
              <LoongArkColorPickerArea>
                <LoongArkColorPickerAreaBackground />
                <LoongArkColorPickerAreaThumb />
              </LoongArkColorPickerArea>
              <LoongArkColorPickerChannelSlider channel="h">
                <LoongArkColorPickerChannelSliderTrack />
                <LoongArkColorPickerChannelSliderThumb />
              </LoongArkColorPickerChannelSlider>
            </LoongArkColorPickerView>
            <LoongArkColorPickerChannelInput channel="hex" />
            {showSwatches && (
              <LoongArkColorPickerSwatchGroup>
                {swatches.map((swatch) => (
                  <LoongArkColorPickerSwatchTrigger key={swatch} value={swatch}>
                    <LoongArkColorPickerSwatch value={swatch} />
                    <LoongArkColorPickerSwatchIndicator />
                  </LoongArkColorPickerSwatchTrigger>
                ))}
              </LoongArkColorPickerSwatchGroup>
            )}
          </div>
        </LoongArkColorPickerContent>
      </LoongArkColorPickerPositioner>
    </LoongArkColorPickerRoot>
  );
};

export const Basic: Story = {
  render: () => <ColorPickerDemo />,
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <ColorPickerDemo showSwatches />
      <ColorPickerDemo showSwatches={false} />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <ColorPickerDemo disabled={false} />
      <ColorPickerDemo disabled />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <ColorPickerDemo size="sm" />
      <ColorPickerDemo size="md" />
      <ColorPickerDemo size="lg" />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => <ColorPickerDemo />,
};
