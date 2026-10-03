/**
 * Clipboard component - Solid wrapper.
 * Uses Ark UI Clipboard with data attributes for styling.
 */
import { type Component, type JSX, mergeProps, splitProps } from "solid-js";
import {
  Clipboard as ArkClipboard,
  type ClipboardRootProps as ArkClipboardRootProps,
  type ClipboardLabelProps as ArkClipboardLabelProps,
  type ClipboardControlProps as ArkClipboardControlProps,
  type ClipboardInputProps as ArkClipboardInputProps,
  type ClipboardTriggerProps as ArkClipboardTriggerProps,
  type ClipboardIndicatorProps as ArkClipboardIndicatorProps,
  type ClipboardValueTextProps as ArkClipboardValueTextProps,
} from "@ark-ui/solid/clipboard";
import type { ClipboardSize } from "@loongark/primitives";

export interface LoongArkClipboardRootProps extends Omit<
  ArkClipboardRootProps,
  "asChild"
> {
  size?: ClipboardSize;
  disabled?: boolean;
  children?: JSX.Element;
}

export const LoongArkClipboardRoot: Component<LoongArkClipboardRootProps> = (
  props,
) => {
  const merged = mergeProps(
    { size: "md" as ClipboardSize, disabled: false },
    props,
  );
  const [local, others] = splitProps(merged, ["children", "size", "disabled"]);

  return (
    <ArkClipboard.Root
      {...others}
      aria-disabled={local.disabled || undefined}
      inert={local.disabled || undefined}
      data-scope="clipboard"
      data-part="root"
      data-size={local.size}
      data-disabled={local.disabled ? "true" : undefined}
    >
      {local.children}
    </ArkClipboard.Root>
  );
};

export interface LoongArkClipboardLabelProps extends Omit<
  ArkClipboardLabelProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkClipboardLabel: Component<LoongArkClipboardLabelProps> = (
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkClipboard.Label {...others} data-scope="clipboard" data-part="label">
      {local.children}
    </ArkClipboard.Label>
  );
};

export interface LoongArkClipboardControlProps extends Omit<
  ArkClipboardControlProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkClipboardControl: Component<
  LoongArkClipboardControlProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkClipboard.Control
      {...others}
      data-scope="clipboard"
      data-part="control"
    >
      {local.children}
    </ArkClipboard.Control>
  );
};

export interface LoongArkClipboardInputProps extends Omit<
  ArkClipboardInputProps,
  "asChild"
> {}

export const LoongArkClipboardInput: Component<LoongArkClipboardInputProps> = (
  props,
) => {
  return (
    <ArkClipboard.Input {...props} data-scope="clipboard" data-part="input" />
  );
};

export interface LoongArkClipboardTriggerProps extends Omit<
  ArkClipboardTriggerProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkClipboardTrigger: Component<
  LoongArkClipboardTriggerProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkClipboard.Trigger
      {...others}
      data-scope="clipboard"
      data-part="trigger"
    >
      {local.children}
    </ArkClipboard.Trigger>
  );
};

export interface LoongArkClipboardIndicatorProps extends Omit<
  ArkClipboardIndicatorProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkClipboardIndicator: Component<
  LoongArkClipboardIndicatorProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkClipboard.Indicator
      {...others}
      data-scope="clipboard"
      data-part="indicator"
    >
      {local.children}
    </ArkClipboard.Indicator>
  );
};

export interface LoongArkClipboardValueTextProps extends Omit<
  ArkClipboardValueTextProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkClipboardValueText: Component<
  LoongArkClipboardValueTextProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkClipboard.ValueText
      {...others}
      data-scope="clipboard"
      data-part="value-text"
    >
      {local.children}
    </ArkClipboard.ValueText>
  );
};
