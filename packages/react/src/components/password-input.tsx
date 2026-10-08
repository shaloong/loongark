import { useFieldContext } from "@ark-ui/react/field";
import { usePasswordInputContext } from "@ark-ui/react/password-input";
import {
  nativeSelectionProps,
  nativeSelectionFieldDescription,
} from "@loongark/kit";
/**
 * Password Input component - React wrapper.
 * Uses Ark UI Password Input with data attributes for styling.
 */
import React, { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { PasswordInput } from "@ark-ui/react/password-input";
import type {
  PasswordInputSize,
  PasswordInputState,
} from "@loongark/primitives";

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

export interface LoongArkPasswordInputRootProps extends Omit<
  ArkPasswordInputRootProps,
  "asChild"
> {
  size?: PasswordInputSize;
  state?: PasswordInputState;
  children?: ReactNode;
}

export interface LoongArkPasswordInputLabelProps extends Omit<
  ArkPasswordInputLabelProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkPasswordInputControlProps extends Omit<
  ArkPasswordInputControlProps,
  "asChild"
> {
  size?: PasswordInputSize;
  state?: PasswordInputState;
  disabled?: boolean;
  children?: ReactNode;
}

export interface LoongArkPasswordInputInputProps extends Omit<
  ArkPasswordInputInputProps,
  "asChild" | "size"
> {
  size?: PasswordInputSize;
  state?: PasswordInputState;
  disabled?: boolean;
  readOnly?: boolean;
}

export interface LoongArkPasswordInputIndicatorProps extends Omit<
  ArkPasswordInputIndicatorProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkPasswordInputVisibilityTriggerProps extends Omit<
  ArkPasswordInputVisibilityTriggerProps,
  "asChild"
> {
  disabled?: boolean;
  children?: ReactNode;
}

export const LoongArkPasswordInputRoot = forwardRef<
  HTMLDivElement,
  LoongArkPasswordInputRootProps
>(
  (
    { children, size = "md", state = "default", disabled, readOnly, ...props },
    ref,
  ) => {
    return (
      <PasswordInput.Root
        {...props}
        ref={ref}
        {...nativeSelectionProps({
          disabled,
          readOnly,
          "data-disabled":
            disabled === undefined ? undefined : String(disabled),
          "data-readonly":
            readOnly === undefined ? undefined : String(readOnly),
        })}

        data-scope="password-input"
        data-part="root"
        data-size={size}
        data-state={state !== "default" ? state : undefined}
      >
        {children}
      </PasswordInput.Root>
    );
  },
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
>(({ children, size = "md", state = "default", disabled, ...props }, ref) => {
  return (
    <PasswordInput.Control
      {...props}
      ref={ref}
      data-scope="password-input"
      data-part="control"
      data-size={size}
      data-state={state !== "default" ? state : undefined}
      {...nativeSelectionProps({
        "data-disabled": disabled === undefined ? undefined : String(disabled),
      })}
    >
      {children}
    </PasswordInput.Control>
  );
});

LoongArkPasswordInputControl.displayName = "LoongArkPasswordInputControl";

export const LoongArkPasswordInputInput = forwardRef<
  HTMLInputElement,
  LoongArkPasswordInputInputProps
>(({ size = "md", state = "default", disabled, readOnly, ...props }, ref) => {
  const field = useFieldContext();
  const api = usePasswordInputContext();
  return (
    <PasswordInput.Input
      {...props}
      ref={ref}
      {...nativeSelectionProps({
        disabled,
        readOnly,
        "data-disabled": disabled === undefined ? undefined : String(disabled),
        "data-readonly": readOnly === undefined ? undefined : String(readOnly),
      })}

      data-scope="password-input"
      aria-describedby={nativeSelectionFieldDescription(
        props["aria-describedby"],
        field,
        api.getInputProps()["aria-invalid"],
      )}
      data-part="input"
      data-size={size}
      data-state={state !== "default" ? state : undefined}
    />
  );
});

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
>(({ children, disabled, ...props }, ref) => {
  return (
    <PasswordInput.VisibilityTrigger
      {...props}
      ref={ref}
      {...nativeSelectionProps({
        disabled,
        "data-disabled": disabled === undefined ? undefined : String(disabled),
      })}
      data-scope="password-input"
      data-part="visibility-trigger"
    >
      {children}
    </PasswordInput.VisibilityTrigger>
  );
});

LoongArkPasswordInputVisibilityTrigger.displayName =
  "LoongArkPasswordInputVisibilityTrigger";
