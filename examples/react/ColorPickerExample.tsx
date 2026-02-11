import React from "react";
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
import type { ColorPickerSize } from "@loongark/primitives";

interface ColorPickerExampleProps {
  size?: ColorPickerSize;
}

const swatches = ["#0EA5E9", "#8B5CF6", "#F97316", "#10B981"];

export const ColorPickerExample: React.FC<ColorPickerExampleProps> = ({
  size = "md",
}) => {
  const [value, setValue] = React.useState("#6366F1");

  return (
    <LoongArkColorPickerRoot
      size={size}
      value={value}
      onValueChange={(details: { value: string }) => setValue(details.value)}
    >
      <LoongArkColorPickerLabel>Brand color</LoongArkColorPickerLabel>
      <LoongArkColorPickerControl>
        <LoongArkColorPickerTrigger>
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
            <LoongArkColorPickerSwatchGroup>
              {swatches.map((swatch) => (
                <LoongArkColorPickerSwatchTrigger key={swatch} value={swatch}>
                  <LoongArkColorPickerSwatch value={swatch} />
                  <LoongArkColorPickerSwatchIndicator />
                </LoongArkColorPickerSwatchTrigger>
              ))}
            </LoongArkColorPickerSwatchGroup>
          </div>
        </LoongArkColorPickerContent>
      </LoongArkColorPickerPositioner>
    </LoongArkColorPickerRoot>
  );
};
