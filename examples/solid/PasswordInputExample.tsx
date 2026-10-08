/** @jsxImportSource solid-js */
import type { Component } from "solid-js";
import {
  LoongArkPasswordInputRoot,
  LoongArkPasswordInputLabel,
  LoongArkPasswordInputControl,
  LoongArkPasswordInputInput,
  LoongArkPasswordInputIndicator,
  LoongArkPasswordInputVisibilityTrigger,
} from "@loongark/solid";
import type {
  PasswordInputSize,
  PasswordInputState,
} from "@loongark/primitives";

export interface PasswordInputExampleProps {
  size?: PasswordInputSize;
  state?: PasswordInputState;
  disabled?: boolean;
  readOnly?: boolean;
}

export const PasswordInputExample: Component<PasswordInputExampleProps> = (
  props,
) => {
  const size = () => props.size ?? "md";
  const state = () => props.state ?? "default";
  const disabled = () => props.disabled ?? false;
  const readOnly = () => props.readOnly ?? false;

  return (
    <LoongArkPasswordInputRoot
      size={size()}
      state={state()}
      disabled={disabled()}
      readOnly={readOnly()}
    >
      <LoongArkPasswordInputLabel>Password</LoongArkPasswordInputLabel>
      <LoongArkPasswordInputControl
        size={size()}
        state={state()}
        disabled={disabled()}
      >
        <LoongArkPasswordInputInput
          size={size()}
          state={state()}
          disabled={disabled()}
          readOnly={readOnly()}
          placeholder="Enter your password"
        />
        <LoongArkPasswordInputIndicator>●●●</LoongArkPasswordInputIndicator>
        <LoongArkPasswordInputVisibilityTrigger disabled={disabled()}>
          Show
        </LoongArkPasswordInputVisibilityTrigger>
      </LoongArkPasswordInputControl>
    </LoongArkPasswordInputRoot>
  );
};
