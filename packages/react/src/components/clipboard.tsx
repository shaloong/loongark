/**
 * Clipboard component - React wrapper.
 * Uses Ark UI Clipboard with data attributes for styling.
 */
import React, { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Clipboard } from "@ark-ui/react/clipboard";
import type { ClipboardSize } from "@loongark/primitives";

type ArkClipboardRootProps = ComponentPropsWithoutRef<typeof Clipboard.Root>;
type ArkClipboardLabelProps = ComponentPropsWithoutRef<typeof Clipboard.Label>;
type ArkClipboardControlProps = ComponentPropsWithoutRef<typeof Clipboard.Control>;
type ArkClipboardInputProps = ComponentPropsWithoutRef<typeof Clipboard.Input>;
type ArkClipboardTriggerProps = ComponentPropsWithoutRef<typeof Clipboard.Trigger>;
type ArkClipboardIndicatorProps = ComponentPropsWithoutRef<typeof Clipboard.Indicator>;
type ArkClipboardValueTextProps = ComponentPropsWithoutRef<typeof Clipboard.ValueText>;

export interface LoongArkClipboardRootProps
  extends Omit<ArkClipboardRootProps, "asChild"> {
  size?: ClipboardSize;
  disabled?: boolean;
  children?: ReactNode;
}

export const LoongArkClipboardRoot = forwardRef<
  HTMLDivElement,
  LoongArkClipboardRootProps
>(({ size = "md", disabled = false, children, ...props }, ref) => {
  return (
    <Clipboard.Root
      {...props}
      ref={ref}
      data-scope="clipboard"
      data-part="root"
      data-size={size}
      data-disabled={disabled ? "true" : undefined}
    >
      {children}
    </Clipboard.Root>
  );
});

LoongArkClipboardRoot.displayName = "LoongArkClipboardRoot";

export const LoongArkClipboardLabel = forwardRef<
  HTMLLabelElement,
  ArkClipboardLabelProps
>((props, ref) => {
  return (
    <Clipboard.Label
      {...props}
      ref={ref}
      data-scope="clipboard"
      data-part="label"
    />
  );
});

LoongArkClipboardLabel.displayName = "LoongArkClipboardLabel";

export const LoongArkClipboardControl = forwardRef<
  HTMLDivElement,
  ArkClipboardControlProps
>((props, ref) => {
  return (
    <Clipboard.Control
      {...props}
      ref={ref}
      data-scope="clipboard"
      data-part="control"
    />
  );
});

LoongArkClipboardControl.displayName = "LoongArkClipboardControl";

export const LoongArkClipboardInput = forwardRef<
  HTMLInputElement,
  ArkClipboardInputProps
>((props, ref) => {
  return (
    <Clipboard.Input
      {...props}
      ref={ref}
      data-scope="clipboard"
      data-part="input"
    />
  );
});

LoongArkClipboardInput.displayName = "LoongArkClipboardInput";

export const LoongArkClipboardTrigger = forwardRef<
  HTMLButtonElement,
  ArkClipboardTriggerProps
>((props, ref) => {
  return (
    <Clipboard.Trigger
      {...props}
      ref={ref}
      data-scope="clipboard"
      data-part="trigger"
    />
  );
});

LoongArkClipboardTrigger.displayName = "LoongArkClipboardTrigger";

export const LoongArkClipboardIndicator = forwardRef<
  HTMLSpanElement,
  ArkClipboardIndicatorProps
>((props, ref) => {
  return (
    <Clipboard.Indicator
      {...props}
      ref={ref}
      data-scope="clipboard"
      data-part="indicator"
    />
  );
});

LoongArkClipboardIndicator.displayName = "LoongArkClipboardIndicator";

export const LoongArkClipboardValueText = forwardRef<
  HTMLSpanElement,
  ArkClipboardValueTextProps
>((props, ref) => {
  return (
    <Clipboard.ValueText
      {...props}
      ref={ref}
      data-scope="clipboard"
      data-part="value-text"
    />
  );
});

LoongArkClipboardValueText.displayName = "LoongArkClipboardValueText";
