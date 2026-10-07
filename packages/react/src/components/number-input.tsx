import { useFieldContext } from "@ark-ui/react/field";
import { useNumberInputContext } from "@ark-ui/react/number-input";
import {
  nativeSelectionProps,
  nativeSelectionFieldDescription,
} from "@loongark/kit";
import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "./icon";
/**
 * Number Input component - React wrapper.
 * Based on Ark UI Number Input with data-scope/data-part bindings.
 */
import React, { forwardRef, type ReactNode } from "react";
import {
  NumberInput as ArkNumberInput,
  type NumberInputRootProps as ArkNumberInputRootProps,
  type NumberInputLabelProps as ArkNumberInputLabelProps,
  type NumberInputControlProps as ArkNumberInputControlProps,
  type NumberInputInputProps as ArkNumberInputInputProps,
  type NumberInputIncrementTriggerProps as ArkNumberInputIncrementTriggerProps,
  type NumberInputDecrementTriggerProps as ArkNumberInputDecrementTriggerProps,
  type NumberInputValueTextProps as ArkNumberInputValueTextProps,
  type NumberInputScrubberProps as ArkNumberInputScrubberProps,
} from "@ark-ui/react/number-input";
import type {
  NumberInputPrimitiveProps,
  NumberInputSize,
  NumberInputState,
} from "@loongark/primitives";

export interface LoongArkNumberInputRootProps
  extends
    Omit<ArkNumberInputRootProps, "asChild">,
    Partial<NumberInputPrimitiveProps> {
  children?: ReactNode;
}

export interface LoongArkNumberInputLabelProps extends Omit<
  ArkNumberInputLabelProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkNumberInputControlProps
  extends
    Omit<ArkNumberInputControlProps, "asChild">,
    Partial<NumberInputPrimitiveProps> {
  children?: ReactNode;
}

export interface LoongArkNumberInputInputProps
  extends
    Omit<ArkNumberInputInputProps, "asChild" | "size">,
    Partial<NumberInputPrimitiveProps> {}

export interface LoongArkNumberInputIncrementTriggerProps
  extends
    Omit<ArkNumberInputIncrementTriggerProps, "asChild">,
    Partial<NumberInputPrimitiveProps> {
  children?: ReactNode;
}

export interface LoongArkNumberInputDecrementTriggerProps
  extends
    Omit<ArkNumberInputDecrementTriggerProps, "asChild">,
    Partial<NumberInputPrimitiveProps> {
  children?: ReactNode;
}

export interface LoongArkNumberInputValueTextProps
  extends
    Omit<ArkNumberInputValueTextProps, "asChild">,
    Partial<NumberInputPrimitiveProps> {
  children?: ReactNode;
}

export interface LoongArkNumberInputScrubberProps extends Omit<
  ArkNumberInputScrubberProps,
  "asChild"
> {
  children?: ReactNode;
}

export const LoongArkNumberInputRoot = forwardRef<
  HTMLDivElement,
  LoongArkNumberInputRootProps
>(
  (
    { children, size = "md", state = "default", disabled, readOnly, ...props },
    ref,
  ) => {
    return (
      <ArkNumberInput.Root
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

        data-scope="number-input"
        data-part="root"
        data-size={size}
        data-state={state !== "default" ? state : undefined}
      >
        {children}
      </ArkNumberInput.Root>
    );
  },
);

LoongArkNumberInputRoot.displayName = "LoongArkNumberInputRoot";

export const LoongArkNumberInputLabel = forwardRef<
  HTMLLabelElement,
  LoongArkNumberInputLabelProps
>((props, ref) => {
  return (
    <ArkNumberInput.Label
      {...props}
      ref={ref}
      data-scope="number-input"
      data-part="label"
    />
  );
});

LoongArkNumberInputLabel.displayName = "LoongArkNumberInputLabel";

export const LoongArkNumberInputControl = forwardRef<
  HTMLDivElement,
  LoongArkNumberInputControlProps
>(({ children, size = "md", state = "default", disabled, ...props }, ref) => {
  return (
    <ArkNumberInput.Control
      {...props}
      ref={ref}
      data-scope="number-input"
      data-part="control"
      data-size={size}
      data-state={state !== "default" ? state : undefined}
      {...nativeSelectionProps({
        "data-disabled": disabled === undefined ? undefined : String(disabled),
      })}
    >
      {children}
    </ArkNumberInput.Control>
  );
});

LoongArkNumberInputControl.displayName = "LoongArkNumberInputControl";

export const LoongArkNumberInputInput = forwardRef<
  HTMLInputElement,
  LoongArkNumberInputInputProps
>(({ size = "md", state = "default", disabled, readOnly, ...props }, ref) => {
  const field = useFieldContext();
  const api = useNumberInputContext();
  return (
    <ArkNumberInput.Input
      {...props}
      ref={ref}
      {...nativeSelectionProps({
        disabled,
        readOnly,
        "data-disabled": disabled === undefined ? undefined : String(disabled),
        "data-readonly": readOnly === undefined ? undefined : String(readOnly),
      })}

      data-scope="number-input"
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

LoongArkNumberInputInput.displayName = "LoongArkNumberInputInput";

export const LoongArkNumberInputIncrementTrigger = forwardRef<
  HTMLButtonElement,
  LoongArkNumberInputIncrementTriggerProps
>(({ children, size = "md", state = "default", disabled, ...props }, ref) => {
  return (
    <ArkNumberInput.IncrementTrigger
      {...props}
      ref={ref}
      {...nativeSelectionProps({
        disabled,
        "data-disabled": disabled === undefined ? undefined : String(disabled),
      })}
      data-scope="number-input"
      data-part="increment-trigger"
      data-size={size}
      data-state={state !== "default" ? state : undefined}
    >
      {children ?? <LoongArkIcon icon={controlIcons.plus} size="sm" />}
    </ArkNumberInput.IncrementTrigger>
  );
});

LoongArkNumberInputIncrementTrigger.displayName =
  "LoongArkNumberInputIncrementTrigger";

export const LoongArkNumberInputDecrementTrigger = forwardRef<
  HTMLButtonElement,
  LoongArkNumberInputDecrementTriggerProps
>(({ children, size = "md", state = "default", disabled, ...props }, ref) => {
  return (
    <ArkNumberInput.DecrementTrigger
      {...props}
      ref={ref}
      {...nativeSelectionProps({
        disabled,
        "data-disabled": disabled === undefined ? undefined : String(disabled),
      })}
      data-scope="number-input"
      data-part="decrement-trigger"
      data-size={size}
      data-state={state !== "default" ? state : undefined}
    >
      {children ?? <LoongArkIcon icon={controlIcons.minus} size="sm" />}
    </ArkNumberInput.DecrementTrigger>
  );
});

LoongArkNumberInputDecrementTrigger.displayName =
  "LoongArkNumberInputDecrementTrigger";

export const LoongArkNumberInputValueText = forwardRef<
  HTMLSpanElement,
  LoongArkNumberInputValueTextProps
>(({ children, size = "md", ...props }, ref) => {
  return (
    <ArkNumberInput.ValueText
      {...props}
      ref={ref}
      data-scope="number-input"
      data-part="value-text"
      data-size={size}
    >
      {children}
    </ArkNumberInput.ValueText>
  );
});

LoongArkNumberInputValueText.displayName = "LoongArkNumberInputValueText";

export const LoongArkNumberInputScrubber = forwardRef<
  HTMLDivElement,
  LoongArkNumberInputScrubberProps
>(({ children, ...props }, ref) => {
  return (
    <ArkNumberInput.Scrubber
      {...props}
      ref={ref}
      data-scope="number-input"
      data-part="scrubber"
    >
      {children}
    </ArkNumberInput.Scrubber>
  );
});

LoongArkNumberInputScrubber.displayName = "LoongArkNumberInputScrubber";

export type { NumberInputSize, NumberInputState };
