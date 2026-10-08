import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/QRCode",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <L.LoongArkQrCode.Root value="https://loongark.dev">
        <L.LoongArkQrCode.Frame>
          <L.LoongArkQrCode.Pattern />
        </L.LoongArkQrCode.Frame>
      </L.LoongArkQrCode.Root>
    </div>
  ),
};
