import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  LoongArkPasswordInputRoot,
  LoongArkPasswordInputLabel,
  LoongArkPasswordInputControl,
  LoongArkPasswordInputInput,
  LoongArkPasswordInputIndicator,
  LoongArkPasswordInputVisibilityTrigger,
} from "@loongark/react";

const meta: Meta = {
  title: "Components/PasswordInput",
  parameters: {
    docs: {
      description: {
        component:
          "LoongArkPasswordInput wraps Ark UI password input with size/state styling.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

interface PasswordInputDemoProps {
  size?: "sm" | "md" | "lg";
  state?: "default" | "invalid" | "success";
  disabled?: boolean;
  readOnly?: boolean;
  showIndicator?: boolean;
}

const PasswordInputDemo = ({
  size = "md",
  state = "default",
  disabled = false,
  readOnly = false,
  showIndicator = true,
}: PasswordInputDemoProps) => {
  return (
    <LoongArkPasswordInputRoot
      size={size}
      state={state}
      disabled={disabled}
      readOnly={readOnly}
    >
      <LoongArkPasswordInputLabel>Password</LoongArkPasswordInputLabel>
      <LoongArkPasswordInputControl
        size={size}
        state={state}
        disabled={disabled}
      >
        <LoongArkPasswordInputInput
          size={size}
          state={state}
          disabled={disabled}
          readOnly={readOnly}
          placeholder="Enter your password"
        />
        {showIndicator && (
          <LoongArkPasswordInputIndicator>●●●</LoongArkPasswordInputIndicator>
        )}
        <LoongArkPasswordInputVisibilityTrigger disabled={disabled}>
          Show
        </LoongArkPasswordInputVisibilityTrigger>
      </LoongArkPasswordInputControl>
    </LoongArkPasswordInputRoot>
  );
};

export const Basic: Story = {
  render: () => <PasswordInputDemo />,
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <PasswordInputDemo showIndicator />
      <PasswordInputDemo showIndicator={false} />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <PasswordInputDemo state="default" />
      <PasswordInputDemo state="invalid" />
      <PasswordInputDemo state="success" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <PasswordInputDemo size="sm" />
      <PasswordInputDemo size="md" />
      <PasswordInputDemo size="lg" />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => <PasswordInputDemo />,
};
