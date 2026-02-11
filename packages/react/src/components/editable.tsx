/**
 * Editable component - React wrapper.
 * Uses Ark UI Editable with data attributes for styling.
 */
import React, { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Editable } from "@ark-ui/react/editable";
import type { EditableSize, EditableState } from "@loongark/primitives";

type ArkEditableRootProps = ComponentPropsWithoutRef<typeof Editable.Root>;
type ArkEditableLabelProps = ComponentPropsWithoutRef<typeof Editable.Label>;
type ArkEditableAreaProps = ComponentPropsWithoutRef<typeof Editable.Area>;
type ArkEditableControlProps = ComponentPropsWithoutRef<typeof Editable.Control>;
type ArkEditableInputProps = ComponentPropsWithoutRef<typeof Editable.Input>;
type ArkEditablePreviewProps = ComponentPropsWithoutRef<typeof Editable.Preview>;
type ArkEditableEditTriggerProps = ComponentPropsWithoutRef<
  typeof Editable.EditTrigger
>;
type ArkEditableSubmitTriggerProps = ComponentPropsWithoutRef<
  typeof Editable.SubmitTrigger
>;
type ArkEditableCancelTriggerProps = ComponentPropsWithoutRef<
  typeof Editable.CancelTrigger
>;

export interface LoongArkEditableRootProps
  extends Omit<ArkEditableRootProps, "asChild"> {
  size?: EditableSize;
  state?: EditableState;
  disabled?: boolean;
  children?: ReactNode;
}

export const LoongArkEditableRoot = forwardRef<
  HTMLDivElement,
  LoongArkEditableRootProps
>(
  (
    {
      size = "md",
      state = "default",
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Editable.Root
        {...props}
        ref={ref}
        disabled={disabled}
        data-scope="editable"
        data-part="root"
        data-size={size}
        data-state={state !== "default" ? state : undefined}
        data-disabled={disabled ? "true" : undefined}
      >
        {children}
      </Editable.Root>
    );
  }
);

LoongArkEditableRoot.displayName = "LoongArkEditableRoot";

export const LoongArkEditableLabel = forwardRef<
  HTMLLabelElement,
  ArkEditableLabelProps
>((props, ref) => {
  return (
    <Editable.Label
      {...props}
      ref={ref}
      data-scope="editable"
      data-part="label"
    />
  );
});

LoongArkEditableLabel.displayName = "LoongArkEditableLabel";

export const LoongArkEditableArea = forwardRef<
  HTMLDivElement,
  ArkEditableAreaProps
>((props, ref) => {
  return (
    <Editable.Area
      {...props}
      ref={ref}
      data-scope="editable"
      data-part="area"
    />
  );
});

LoongArkEditableArea.displayName = "LoongArkEditableArea";

export const LoongArkEditableControl = forwardRef<
  HTMLDivElement,
  ArkEditableControlProps & { state?: EditableState }
>(({ state, ...props }, ref) => {
  return (
    <Editable.Control
      {...props}
      ref={ref}
      data-scope="editable"
      data-part="control"
      data-state={state && state !== "default" ? state : undefined}
    />
  );
});

LoongArkEditableControl.displayName = "LoongArkEditableControl";

export const LoongArkEditableInput = forwardRef<
  HTMLInputElement,
  ArkEditableInputProps & { state?: EditableState }
>(({ state, ...props }, ref) => {
  return (
    <Editable.Input
      {...props}
      ref={ref}
      data-scope="editable"
      data-part="input"
      data-state={state && state !== "default" ? state : undefined}
    />
  );
});

LoongArkEditableInput.displayName = "LoongArkEditableInput";

export const LoongArkEditablePreview = forwardRef<
  HTMLSpanElement,
  ArkEditablePreviewProps
>((props, ref) => {
  return (
    <Editable.Preview
      {...props}
      ref={ref}
      data-scope="editable"
      data-part="preview"
    />
  );
});

LoongArkEditablePreview.displayName = "LoongArkEditablePreview";

export const LoongArkEditableEditTrigger = forwardRef<
  HTMLButtonElement,
  ArkEditableEditTriggerProps
>((props, ref) => {
  return (
    <Editable.EditTrigger
      {...props}
      ref={ref}
      data-scope="editable"
      data-part="edit-trigger"
    />
  );
});

LoongArkEditableEditTrigger.displayName = "LoongArkEditableEditTrigger";

export const LoongArkEditableSubmitTrigger = forwardRef<
  HTMLButtonElement,
  ArkEditableSubmitTriggerProps
>((props, ref) => {
  return (
    <Editable.SubmitTrigger
      {...props}
      ref={ref}
      data-scope="editable"
      data-part="submit-trigger"
    />
  );
});

LoongArkEditableSubmitTrigger.displayName = "LoongArkEditableSubmitTrigger";

export const LoongArkEditableCancelTrigger = forwardRef<
  HTMLButtonElement,
  ArkEditableCancelTriggerProps
>((props, ref) => {
  return (
    <Editable.CancelTrigger
      {...props}
      ref={ref}
      data-scope="editable"
      data-part="cancel-trigger"
    />
  );
});

LoongArkEditableCancelTrigger.displayName = "LoongArkEditableCancelTrigger";
