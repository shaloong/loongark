/**
 * Password Input component - React wrapper.
 * Uses Ark UI Password Input with data attributes for styling.
 */
import React, { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { PasswordInput } from "@ark-ui/react/password-input";
import type { PasswordInputSize, PasswordInputState } from "@loongark/primitives";

type ArkPasswordInputRootProps = ComponentPropsWithoutRef<
  typeof PasswordInput.Root
>;
type ArkPasswordInputLabelProps = ComponentPropsWithoutRef<
  typeof PasswordInput.Label
>;
type ArkPasswordInputControlProps = ComponentPropsWithoutRef<
  typeof PasswordInput.Control
>;
type ArkPasswordInputInputProps = ComponentPropsWithoutRef<
  typeof PasswordInput.Input
>;
type ArkPasswordInputIndicatorProps = ComponentPropsWithoutRef<
  typeof PasswordInput.Indicator
>;
type ArkPasswordInputVisibilityTriggerProps = ComponentPropsWithoutRef<
  typeof PasswordInput.VisibilityTrigger
>;

export interface LoongArkPasswordInputRootProps
  extends Omit<ArkPasswordInputRootProps, "asChild"> {
  size?: PasswordInputSize;
  state?: PasswordInputState;
  children?: ReactNode;
}

export interface LoongArkPasswordInputLabelProps
  extends Omit<ArkPasswordInputLabelProps, "asChild"> {
  children?: ReactNode;
}

export interface LoongArkPasswordInputControlProps
  extends Omit<ArkPasswordInputControlProps, "asChild"> {
  size?: PasswordInputSize;
  state?: PasswordInputState;
  disabled?: boolean;
  children?: ReactNode;
}

export interface LoongArkPasswordInputInputProps
  extends Omit<ArkPasswordInputInputProps, "asChild"> {
  size?: PasswordInputSize;
  state?: PasswordInputState;
  disabled?: boolean;
  readOnly?: boolean;
}

export interface LoongArkPasswordInputIndicatorProps
  extends Omit<ArkPasswordInputIndicatorProps, "asChild"> {
  children?: ReactNode;
}

export interface LoongArkPasswordInputVisibilityTriggerProps
  extends Omit<ArkPasswordInputVisibilityTriggerProps, "asChild"> {
  disabled?: boolean;
  children?: ReactNode;
}

export const LoongArkPasswordInputRoot = forwardRef<
  HTMLDivElement,
  LoongArkPasswordInputRootProps
>(
  (
    {
      children,
      size = "md",
      state = "default",
      disabled = false,
      readOnly = false,
      ...props
    },
    ref
  ) => {
    return (
      <PasswordInput.Root
        {...props}
        ref={ref}
        disabled={disabled}
        readOnly={readOnly}
        data-scope="password-input"
        data-part="root"
        data-size={size}
        data-state={state !== "default" ? state : undefined}
        data-disabled={disabled ? "true" : undefined}
        data-readonly={readOnly ? "true" : undefined}
      >
        {children}
      </PasswordInput.Root>
    );
  }
);

LoongArkPasswordInputRoot.displayName = "LoongArkPasswordInputRoot";

export const LoongArkPasswordInputLabel = forwardRef<
  HTMLLabelElement,
  LoongArkPasswordInputLabelProps
>(({ children, ...props }, ref) => {
  return (
    <PasswordInput.Label
      {...props}
      ref={ref}
      data-scope="password-input"
      data-part="label"
    >
      {children}
    </PasswordInput.Label>
  );
});

LoongArkPasswordInputLabel.displayName = "LoongArkPasswordInputLabel";

export const LoongArkPasswordInputControl = forwardRef<
  HTMLDivElement,
  LoongArkPasswordInputControlProps
>(
  (
    { children, size = "md", state = "default", disabled = false, ...props },
    ref
  ) => {
    return (
      <PasswordInput.Control
        {...props}
        ref={ref}
        data-scope="password-input"
        data-part="control"
        data-size={size}
        data-state={state !== "default" ? state : undefined}
        data-disabled={disabled ? "true" : undefined}
      >
        {children}
      </PasswordInput.Control>
    );
  }
);

LoongArkPasswordInputControl.displayName = "LoongArkPasswordInputControl";

export const LoongArkPasswordInputInput = forwardRef<
  HTMLInputElement,
  LoongArkPasswordInputInputProps
>(
  (
    {
      size = "md",
      state = "default",
      disabled = false,
      readOnly = false,
      ...props
    },
    ref
  ) => {
    return (
      <PasswordInput.Input
        {...props}
        ref={ref}
        disabled={disabled}
        readOnly={readOnly}
        data-scope="password-input"
        data-part="input"
        data-size={size}
        data-state={state !== "default" ? state : undefined}
        data-disabled={disabled ? "true" : undefined}
        data-readonly={readOnly ? "true" : undefined}
      />
    );
  }
);

LoongArkPasswordInputInput.displayName = "LoongArkPasswordInputInput";

export const LoongArkPasswordInputIndicator = forwardRef<
  HTMLSpanElement,
  LoongArkPasswordInputIndicatorProps
>(({ children, ...props }, ref) => {
  return (
    <PasswordInput.Indicator
      {...props}
      ref={ref}
      data-scope="password-input"
      data-part="indicator"
    >
      {children}
    </PasswordInput.Indicator>
  );
});

LoongArkPasswordInputIndicator.displayName = "LoongArkPasswordInputIndicator";

export const LoongArkPasswordInputVisibilityTrigger = forwardRef<
  HTMLButtonElement,
  LoongArkPasswordInputVisibilityTriggerProps
>(({ children, disabled = false, ...props }, ref) => {
  return (
    <PasswordInput.VisibilityTrigger
      {...props}
      ref={ref}
      disabled={disabled}
      data-scope="password-input"
      data-part="visibility-trigger"
      data-disabled={disabled ? "true" : undefined}
    >
      {children}
    </PasswordInput.VisibilityTrigger>
  );
});

LoongArkPasswordInputVisibilityTrigger.displayName =
  "LoongArkPasswordInputVisibilityTrigger";
