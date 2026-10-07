import { CompoundFieldExample } from "../examples/react/CompoundFieldExample";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FieldSelectionExample } from "../examples/react/FieldSelectionExample";
import * as L from "@loongark/react";
const meta = {
  title: "Components/Field",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <L.LoongArkField.Root invalid required>
        <L.LoongArkField.Label>
          Email <L.LoongArkField.RequiredIndicator />
        </L.LoongArkField.Label>
        <L.LoongArkField.Input placeholder="name@example.com" />
        <L.LoongArkField.ErrorText>
          Enter a valid email address.
        </L.LoongArkField.ErrorText>
      </L.LoongArkField.Root>
    </div>
  ),
};

export const InheritedSelections: StoryObj = {
  render: () => <FieldSelectionExample />,
};

export const CompoundInputs: StoryObj = {
  render: () => <CompoundFieldExample />,
};
