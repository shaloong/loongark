
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticEditableStyles } from "@loongark/primitives/automatic-styles/editable";
/**
 * Editable component - Solid wrapper.
 * Uses Ark UI Editable with data attributes for styling.
 */
import { type Component, type JSX, mergeProps, splitProps } from "solid-js";
import {
  Editable as ArkEditable,
  type EditableRootProps as ArkEditableRootProps,
  type EditableLabelProps as ArkEditableLabelProps,
  type EditableAreaProps as ArkEditableAreaProps,
  type EditableControlProps as ArkEditableControlProps,
  type EditableInputProps as ArkEditableInputProps,
  type EditablePreviewProps as ArkEditablePreviewProps,
  type EditableEditTriggerProps as ArkEditableEditTriggerProps,
  type EditableSubmitTriggerProps as ArkEditableSubmitTriggerProps,
  type EditableCancelTriggerProps as ArkEditableCancelTriggerProps,
} from "@ark-ui/solid/editable";
import type { EditableSize, EditableState } from "@loongark/primitives";

export interface LoongArkEditableRootProps extends Omit<
  ArkEditableRootProps,
  "asChild"
> {
  size?: EditableSize;
  state?: EditableState;
  disabled?: boolean;
  children?: JSX.Element;
}

export const LoongArkEditableRoot: Component<LoongArkEditableRootProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const merged = mergeProps(
    {
      size: "md" as EditableSize,
      state: "default" as EditableState,
      disabled: false,
    },
    props,
  );
  const [local, others] = splitProps(merged, [
    "children",
    "size",
    "state",
    "disabled",
  ]);

  return (
    <ArkEditable.Root
      {...others}
      disabled={local.disabled}
      data-scope="editable"
      data-part="root"
      data-size={local.size}
      data-state={local.state !== "default" ? local.state : undefined}
      data-disabled={local.disabled ? "true" : undefined}
    >
      {local.children}
    </ArkEditable.Root>
  );
}, lkAutomaticEditableStyles);

export interface LoongArkEditableLabelProps extends Omit<
  ArkEditableLabelProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkEditableLabel: Component<LoongArkEditableLabelProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkEditable.Label {...others} data-scope="editable" data-part="label">
      {local.children}
    </ArkEditable.Label>
  );
}, lkAutomaticEditableStyles);

export interface LoongArkEditableAreaProps extends Omit<
  ArkEditableAreaProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkEditableArea: Component<LoongArkEditableAreaProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkEditable.Area {...others} data-scope="editable" data-part="area">
      {local.children}
    </ArkEditable.Area>
  );
}, lkAutomaticEditableStyles);

export interface LoongArkEditableControlProps extends Omit<
  ArkEditableControlProps,
  "asChild"
> {
  state?: EditableState;
  children?: JSX.Element;
}

export const LoongArkEditableControl: Component<
  LoongArkEditableControlProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const merged = mergeProps({ state: "default" as EditableState }, props);
  const [local, others] = splitProps(merged, ["children", "state"]);
  return (
    <ArkEditable.Control
      {...others}
      data-scope="editable"
      data-part="control"
      data-state={local.state !== "default" ? local.state : undefined}
    >
      {local.children}
    </ArkEditable.Control>
  );
}, lkAutomaticEditableStyles);

export interface LoongArkEditableInputProps extends Omit<
  ArkEditableInputProps,
  "asChild"
> {
  state?: EditableState;
}

export const LoongArkEditableInput: Component<LoongArkEditableInputProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const merged = mergeProps({ state: "default" as EditableState }, props);
  const [local, others] = splitProps(merged, ["state"]);
  return (
    <ArkEditable.Input
      {...others}
      data-scope="editable"
      data-part="input"
      data-state={local.state !== "default" ? local.state : undefined}
    />
  );
}, lkAutomaticEditableStyles);

export interface LoongArkEditablePreviewProps extends Omit<
  ArkEditablePreviewProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkEditablePreview: Component<
  LoongArkEditablePreviewProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkEditable.Preview {...others} data-scope="editable" data-part="preview">
      {local.children}
    </ArkEditable.Preview>
  );
}, lkAutomaticEditableStyles);

export interface LoongArkEditableEditTriggerProps extends Omit<
  ArkEditableEditTriggerProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkEditableEditTrigger: Component<
  LoongArkEditableEditTriggerProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkEditable.EditTrigger
      {...others}
      data-scope="editable"
      data-part="edit-trigger"
    >
      {local.children}
    </ArkEditable.EditTrigger>
  );
}, lkAutomaticEditableStyles);

export interface LoongArkEditableSubmitTriggerProps extends Omit<
  ArkEditableSubmitTriggerProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkEditableSubmitTrigger: Component<
  LoongArkEditableSubmitTriggerProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkEditable.SubmitTrigger
      {...others}
      data-scope="editable"
      data-part="submit-trigger"
    >
      {local.children}
    </ArkEditable.SubmitTrigger>
  );
}, lkAutomaticEditableStyles);

export interface LoongArkEditableCancelTriggerProps extends Omit<
  ArkEditableCancelTriggerProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkEditableCancelTrigger: Component<
  LoongArkEditableCancelTriggerProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkEditable.CancelTrigger
      {...others}
      data-scope="editable"
      data-part="cancel-trigger"
    >
      {local.children}
    </ArkEditable.CancelTrigger>
  );
}, lkAutomaticEditableStyles);
