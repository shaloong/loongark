import React from "react";

import { parseColor } from "@ark-ui/react/color-picker";

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

const swatches = ["#006EFF", "#0A3565", "#5AC8FA", "#F58220"];

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
  const [value, setValue] = React.useState(parseColor("#006EFF"));

  return (
    <LoongArkColorPickerRoot
      defaultFormat="hsla"
      size={size}
      disabled={disabled}
      value={value}
      onValueChange={(details: { value: ReturnType<typeof parseColor> }) =>
        setValue(details.value)
      }
    >
      <LoongArkColorPickerLabel>Brand color</LoongArkColorPickerLabel>
      <LoongArkColorPickerControl>
        <LoongArkColorPickerTrigger disabled={disabled}>
          <LoongArkColorPickerValueSwatch />
          <LoongArkColorPickerValueText />
        </LoongArkColorPickerTrigger>
      </LoongArkColorPickerControl>
      <LoongArkColorPickerPositioner>
        <LoongArkColorPickerContent aria-label="Choose brand color">
          <div style={{ display: "grid", gap: 12 }}>
            <LoongArkColorPickerView format="hsla">
              <LoongArkColorPickerArea>
                <LoongArkColorPickerAreaBackground />
                <LoongArkColorPickerAreaThumb />
              </LoongArkColorPickerArea>
              <LoongArkColorPickerChannelSlider channel="hue">
                <LoongArkColorPickerChannelSliderTrack />
                <LoongArkColorPickerChannelSliderThumb />
              </LoongArkColorPickerChannelSlider>
            </LoongArkColorPickerView>
            <LoongArkColorPickerChannelInput channel="hex" />
            {showSwatches && (
              <LoongArkColorPickerSwatchGroup>
                {swatches.map((swatch) => (
                  <LoongArkColorPickerSwatchTrigger key={swatch} value={swatch}>
                    <LoongArkColorPickerSwatch value={swatch}>
                      <LoongArkColorPickerSwatchIndicator />
                    </LoongArkColorPickerSwatch>
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
export const ColorPickerExample = ColorPickerDemo;
export type ColorPickerExampleProps = Parameters<typeof ColorPickerDemo>[0];
