import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/Fieldset",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <L.LoongArkFieldset.Root>
        <L.LoongArkFieldset.Legend>
          Contact information
        </L.LoongArkFieldset.Legend>
        <L.LoongArkFieldset.HelperText>
          We will use this to contact you.
        </L.LoongArkFieldset.HelperText>
        <L.LoongArkField.Root>
          <L.LoongArkField.Label>Name</L.LoongArkField.Label>
          <L.LoongArkField.Input />
        </L.LoongArkField.Root>
      </L.LoongArkFieldset.Root>
    </div>
  ),
};
