import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/AngleSlider",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <L.LoongArkAngleSlider.Root defaultValue={45}>
        <L.LoongArkAngleSlider.Label>Rotation</L.LoongArkAngleSlider.Label>
        <L.LoongArkAngleSlider.Control>
          <L.LoongArkAngleSlider.Thumb />
        </L.LoongArkAngleSlider.Control>
        <L.LoongArkAngleSlider.ValueText />
        <L.LoongArkAngleSlider.HiddenInput name="rotation" />
      </L.LoongArkAngleSlider.Root>
    </div>
  ),
};
