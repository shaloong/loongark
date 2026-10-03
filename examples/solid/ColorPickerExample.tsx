/** @jsxImportSource solid-js */
import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import {
  parseColor,
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

const swatches = ["#006EFF", "#0A3565", "#5AC8FA", "#F58220"];

export const ColorPickerExample: Component<ColorPickerExampleProps> = (
  props,
) => {
  const size = () => props.size ?? "md";
  const [value, setValue] = createSignal(parseColor("#006EFF"));

  return (
    <LoongArkColorPickerRoot
      defaultFormat="hsla"
      size={size()}
      value={value()}
      onValueChange={(details) => setValue(details.value)}
    >
      <LoongArkColorPickerLabel>Brand color</LoongArkColorPickerLabel>
      <LoongArkColorPickerControl>
        <LoongArkColorPickerTrigger>
          <LoongArkColorPickerValueSwatch />
          <LoongArkColorPickerValueText />
        </LoongArkColorPickerTrigger>
      </LoongArkColorPickerControl>
      <LoongArkColorPickerPositioner>
        <LoongArkColorPickerContent aria-label="Choose brand color">
          <div style={{ display: "grid", gap: "12px" }}>
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
            <LoongArkColorPickerSwatchGroup>
              {swatches.map((swatch) => (
                <LoongArkColorPickerSwatchTrigger value={swatch}>
                  <LoongArkColorPickerSwatch value={swatch}>
                    <LoongArkColorPickerSwatchIndicator />
                  </LoongArkColorPickerSwatch>
                </LoongArkColorPickerSwatchTrigger>
              ))}
            </LoongArkColorPickerSwatchGroup>
          </div>
        </LoongArkColorPickerContent>
      </LoongArkColorPickerPositioner>
    </LoongArkColorPickerRoot>
  );
};
