"use client";
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticClipboardStyles } from "@loongark/primitives/automatic-styles/clipboard";


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
type ArkClipboardControlProps = ComponentPropsWithoutRef<
  typeof Clipboard.Control
>;
type ArkClipboardInputProps = ComponentPropsWithoutRef<typeof Clipboard.Input>;
type ArkClipboardTriggerProps = ComponentPropsWithoutRef<
  typeof Clipboard.Trigger
>;
type ArkClipboardIndicatorProps = ComponentPropsWithoutRef<
  typeof Clipboard.Indicator
>;
type ArkClipboardValueTextProps = ComponentPropsWithoutRef<
  typeof Clipboard.ValueText
>;

export interface LoongArkClipboardRootProps extends Omit<
  ArkClipboardRootProps,
  "asChild"
> {
  size?: ClipboardSize;
  disabled?: boolean;
  children?: ReactNode;
}

export const LoongArkClipboardRoot = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticClipboardStyles);

LoongArkClipboardRoot.displayName = "LoongArkClipboardRoot";

export const LoongArkClipboardLabel = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticClipboardStyles);

LoongArkClipboardLabel.displayName = "LoongArkClipboardLabel";

export const LoongArkClipboardControl = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticClipboardStyles);

LoongArkClipboardControl.displayName = "LoongArkClipboardControl";

export const LoongArkClipboardInput = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticClipboardStyles);

LoongArkClipboardInput.displayName = "LoongArkClipboardInput";

export const LoongArkClipboardTrigger = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticClipboardStyles);

LoongArkClipboardTrigger.displayName = "LoongArkClipboardTrigger";

export const LoongArkClipboardIndicator = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
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
}), lkAutomaticClipboardStyles);

LoongArkClipboardIndicator.displayName = "LoongArkClipboardIndicator";

export const LoongArkClipboardValueText = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
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
}), lkAutomaticClipboardStyles);

LoongArkClipboardValueText.displayName = "LoongArkClipboardValueText";
