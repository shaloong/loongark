import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  LoongArkNumberInputRoot,
  LoongArkNumberInputLabel,
  LoongArkNumberInputControl,
  LoongArkNumberInputInput,
  LoongArkNumberInputIncrementTrigger,
  LoongArkNumberInputDecrementTrigger,
  LoongArkNumberInputValueText,
  LoongArkNumberInputScrubber,
} from "@loongark/react";

const meta: Meta = {
  title: "Components/NumberInput",
  parameters: {
    docs: {
      description: {
        component:
          "LoongArkNumberInput wraps Ark UI with size/state styling and control triggers.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

interface NumberInputDemoProps {
  size?: "sm" | "md" | "lg";
  state?: "default" | "invalid" | "success";
  disabled?: boolean;
}

const NumberInputDemo = ({
  size = "md",
  state = "default",
  disabled = false,
}: NumberInputDemoProps) => {
  const [value, setValue] = React.useState("24");

  return (
    <LoongArkNumberInputRoot
      value={value}
      min={0}
      max={100}
      step={1}
      size={size}
      state={state}
      disabled={disabled}
      onValueChange={(details: { value: string }) => setValue(details.value)}
    >
      <LoongArkNumberInputLabel>Amount</LoongArkNumberInputLabel>
      <LoongArkNumberInputControl size={size} state={state} disabled={disabled}>
        <LoongArkNumberInputInput
          size={size}
          state={state}
          disabled={disabled}
        />
        <LoongArkNumberInputIncrementTrigger
          size={size}
          state={state}
          disabled={disabled}
        >
          +
        </LoongArkNumberInputIncrementTrigger>
        <LoongArkNumberInputDecrementTrigger
          size={size}
          state={state}
          disabled={disabled}
        >
          -
        </LoongArkNumberInputDecrementTrigger>
      </LoongArkNumberInputControl>
      <LoongArkNumberInputScrubber>Drag to adjust</LoongArkNumberInputScrubber>
      <LoongArkNumberInputValueText size={size}>
        Value: {value || "0"}
      </LoongArkNumberInputValueText>
    </LoongArkNumberInputRoot>
  );
};

export const Basic: Story = {
  render: () => <NumberInputDemo />,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <NumberInputDemo size="sm" />
      <NumberInputDemo size="md" />
      <NumberInputDemo size="lg" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <NumberInputDemo state="default" />
      <NumberInputDemo state="invalid" />
      <NumberInputDemo state="success" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => <NumberInputDemo disabled />,
};
