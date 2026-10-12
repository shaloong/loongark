
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticClipboardStyles } from "@loongark/primitives/automatic-styles/clipboard";
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

export const LoongArkClipboardRoot: Component<LoongArkClipboardRootProps> = /*#__PURE__*/ withAutomaticStyles((
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
}, lkAutomaticClipboardStyles);

export interface LoongArkClipboardLabelProps extends Omit<
  ArkClipboardLabelProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkClipboardLabel: Component<LoongArkClipboardLabelProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkClipboard.Label {...others} data-scope="clipboard" data-part="label">
      {local.children}
    </ArkClipboard.Label>
  );
}, lkAutomaticClipboardStyles);

export interface LoongArkClipboardControlProps extends Omit<
  ArkClipboardControlProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkClipboardControl: Component<
  LoongArkClipboardControlProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
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
}, lkAutomaticClipboardStyles);

export interface LoongArkClipboardInputProps extends Omit<
  ArkClipboardInputProps,
  "asChild"
> {}

export const LoongArkClipboardInput: Component<LoongArkClipboardInputProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  return (
    <ArkClipboard.Input {...props} data-scope="clipboard" data-part="input" />
  );
}, lkAutomaticClipboardStyles);

export interface LoongArkClipboardTriggerProps extends Omit<
  ArkClipboardTriggerProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkClipboardTrigger: Component<
  LoongArkClipboardTriggerProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
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
}, lkAutomaticClipboardStyles);

export interface LoongArkClipboardIndicatorProps extends Omit<
  ArkClipboardIndicatorProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkClipboardIndicator: Component<
  LoongArkClipboardIndicatorProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
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
}, lkAutomaticClipboardStyles);

export interface LoongArkClipboardValueTextProps extends Omit<
  ArkClipboardValueTextProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkClipboardValueText: Component<
  LoongArkClipboardValueTextProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
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
}, lkAutomaticClipboardStyles);
