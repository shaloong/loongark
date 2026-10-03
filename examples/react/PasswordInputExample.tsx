import React from "react";
import {
  LoongArkPasswordInputRoot,
  LoongArkPasswordInputLabel,
  LoongArkPasswordInputControl,
  LoongArkPasswordInputInput,
  LoongArkPasswordInputIndicator,
  LoongArkPasswordInputVisibilityTrigger,
} from "@loongark/react";
import type {
  PasswordInputSize,
  PasswordInputState,
} from "@loongark/primitives";

interface PasswordInputExampleProps {
  size?: PasswordInputSize;
  state?: PasswordInputState;
  disabled?: boolean;
  readOnly?: boolean;
}

export const PasswordInputExample: React.FC<PasswordInputExampleProps> = ({
  size = "md",
  state = "default",
  disabled = false,
  readOnly = false,
}) => {
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
        <LoongArkPasswordInputIndicator>●●●</LoongArkPasswordInputIndicator>
        <LoongArkPasswordInputVisibilityTrigger disabled={disabled}>
          Show
        </LoongArkPasswordInputVisibilityTrigger>
      </LoongArkPasswordInputControl>
    </LoongArkPasswordInputRoot>
  );
};
