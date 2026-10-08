import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/SignaturePad",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <L.LoongArkSignaturePad.Root>
        <L.LoongArkSignaturePad.Label>Signature</L.LoongArkSignaturePad.Label>
        <L.LoongArkSignaturePad.Control>
          <L.LoongArkSignaturePad.Segment />
          <L.LoongArkSignaturePad.Guide />
        </L.LoongArkSignaturePad.Control>
        <L.LoongArkSignaturePad.ClearTrigger>
          Clear signature
        </L.LoongArkSignaturePad.ClearTrigger>
      </L.LoongArkSignaturePad.Root>
    </div>
  ),
};
