import type { Component } from "solid-js";
import { createSignal } from "solid-js";
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
} from "@loongark/solid";
import type { ColorPickerSize } from "@loongark/primitives";

interface ColorPickerExampleProps {
  size?: ColorPickerSize;
}

const swatches = ["#0EA5E9", "#8B5CF6", "#F97316", "#10B981"];

export const ColorPickerExample: Component<ColorPickerExampleProps> = (props) => {
  const size = () => props.size ?? "md";
  const [value, setValue] = createSignal("#6366F1");

  return (
    <LoongArkColorPickerRoot
      size={size()}
      value={value()}
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
          <div style={{ display: "grid", gap: "12px" }}>
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
                <LoongArkColorPickerSwatchTrigger value={swatch}>
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
