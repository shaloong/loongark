import React from "react";
import { LoongArkAngleSlider } from "@loongark/react";
export function AngleSliderBasicExample() {
  return (
    <LoongArkAngleSlider.Root defaultValue={45}>
      <LoongArkAngleSlider.Label>旋转角度</LoongArkAngleSlider.Label>
      <LoongArkAngleSlider.Control>
        <LoongArkAngleSlider.Thumb />
      </LoongArkAngleSlider.Control>
      <LoongArkAngleSlider.ValueText />
      <LoongArkAngleSlider.HiddenInput name="rotation" />
    </LoongArkAngleSlider.Root>
  );
}
