
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticTagsInputStyles } from "@loongark/primitives/automatic-styles/tags-input";
import { useFieldContext } from "@ark-ui/solid/field";
import { nativeSelectionFieldDescription } from "@loongark/kit";
/**
 * Tags Input component - Solid wrapper.
 * Uses Ark UI Tags Input with data attributes for styling.
 */
import { type Component, type JSX, mergeProps, splitProps } from "solid-js";
import {
  TagsInput as ArkTagsInput,
  type TagsInputRootProps as ArkTagsInputRootProps,
  type TagsInputLabelProps as ArkTagsInputLabelProps,
  type TagsInputControlProps as ArkTagsInputControlProps,
  type TagsInputInputProps as ArkTagsInputInputProps,
  type TagsInputItemProps as ArkTagsInputItemProps,
  type TagsInputItemPreviewProps as ArkTagsInputItemPreviewProps,
  type TagsInputItemTextProps as ArkTagsInputItemTextProps,
  type TagsInputItemInputProps as ArkTagsInputItemInputProps,
  type TagsInputItemDeleteTriggerProps as ArkTagsInputItemDeleteTriggerProps,
  type TagsInputClearTriggerProps as ArkTagsInputClearTriggerProps,
  type TagsInputHiddenInputProps as ArkTagsInputHiddenInputProps,
} from "@ark-ui/solid/tags-input";
import { nativeSelectionRef } from "../native-selection";
import { useTagsInputContext } from "@ark-ui/solid/tags-input";
import type { TagsInputSize, TagsInputState } from "@loongark/primitives";

export interface LoongArkTagsInputRootProps extends Omit<
  ArkTagsInputRootProps,
  "asChild"
> {
  size?: TagsInputSize;
  state?: TagsInputState;
  disabled?: boolean;
  readOnly?: boolean;
  children?: JSX.Element;
}

export const LoongArkTagsInputRoot: Component<LoongArkTagsInputRootProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const merged = mergeProps(
    {
      size: "md" as TagsInputSize,
      state: "default" as TagsInputState,
    },
    props,
  );
  const [local, others] = splitProps(merged, ["children", "size", "state"]);

  return (
    <ArkTagsInput.Root
      {...others}
      data-scope="tags-input"
      data-part="root"
      data-size={local.size}
      data-state={local.state !== "default" ? local.state : undefined}
      data-disabled={merged.disabled ? "true" : undefined}
      data-readonly={merged.readOnly ? "true" : undefined}
    >
      {local.children}
    </ArkTagsInput.Root>
  );
}, lkAutomaticTagsInputStyles);

export interface LoongArkTagsInputLabelProps extends Omit<
  ArkTagsInputLabelProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTagsInputLabel: Component<LoongArkTagsInputLabelProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkTagsInput.Label {...others} data-scope="tags-input" data-part="label">
      {local.children}
    </ArkTagsInput.Label>
  );
}, lkAutomaticTagsInputStyles);

export interface LoongArkTagsInputControlProps extends Omit<
  ArkTagsInputControlProps,
  "asChild"
> {
  size?: TagsInputSize;
  state?: TagsInputState;
  disabled?: boolean;
  children?: JSX.Element;
}

export const LoongArkTagsInputControl: Component<
  LoongArkTagsInputControlProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const merged = mergeProps(
    {
      size: "md" as TagsInputSize,
      state: "default" as TagsInputState,
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
    <ArkTagsInput.Control
      {...others}
      data-scope="tags-input"
      data-part="control"
      data-size={local.size}
      data-state={local.state !== "default" ? local.state : undefined}
      data-disabled={local.disabled ? "true" : undefined}
    >
      {local.children}
    </ArkTagsInput.Control>
  );
}, lkAutomaticTagsInputStyles);

export interface LoongArkTagsInputInputProps extends Omit<
  ArkTagsInputInputProps,
  "asChild"
> {
  size?: TagsInputSize;
  state?: TagsInputState;
  disabled?: boolean;
  readOnly?: boolean;
}

export const LoongArkTagsInputInput: Component<LoongArkTagsInputInputProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const merged = mergeProps(
    {
      size: "md" as TagsInputSize,
      state: "default" as TagsInputState,
    },
    props,
  );
  const [local, others] = splitProps(merged, [
    "size",
    "state",
    "disabled",
    "readOnly",
  ]);

  const field = useFieldContext();
  const api = useTagsInputContext();
  const disabled = () =>
    local.disabled ?? !!api().getHiddenInputProps().disabled;
  const readOnly = () =>
    local.readOnly ?? !!api().getHiddenInputProps().readOnly;
  return (
    <ArkTagsInput.Input
      {...others}
      disabled={disabled()}
      readOnly={readOnly()}
      aria-describedby={nativeSelectionFieldDescription(
        others["aria-describedby"],
        field?.(),
        api().getInputProps()["aria-invalid"],
      )}
      data-scope="tags-input"
      data-part="input"
      data-size={local.size}
      data-state={local.state !== "default" ? local.state : undefined}
      data-disabled={disabled() ? "true" : undefined}
      data-readonly={readOnly() ? "true" : undefined}
    />
  );
}, lkAutomaticTagsInputStyles);

export interface LoongArkTagsInputItemProps extends Omit<
  ArkTagsInputItemProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTagsInputItem: Component<LoongArkTagsInputItemProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkTagsInput.Item {...others} data-scope="tags-input" data-part="item">
      {local.children}
    </ArkTagsInput.Item>
  );
}, lkAutomaticTagsInputStyles);

export interface LoongArkTagsInputItemPreviewProps extends Omit<
  ArkTagsInputItemPreviewProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTagsInputItemPreview: Component<
  LoongArkTagsInputItemPreviewProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkTagsInput.ItemPreview
      {...others}
      data-scope="tags-input"
      data-part="item-preview"
    >
      {local.children}
    </ArkTagsInput.ItemPreview>
  );
}, lkAutomaticTagsInputStyles);

export interface LoongArkTagsInputItemTextProps extends Omit<
  ArkTagsInputItemTextProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTagsInputItemText: Component<
  LoongArkTagsInputItemTextProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkTagsInput.ItemText
      {...others}
      data-scope="tags-input"
      data-part="item-text"
    >
      {local.children}
    </ArkTagsInput.ItemText>
  );
}, lkAutomaticTagsInputStyles);

export interface LoongArkTagsInputItemInputProps extends Omit<
  ArkTagsInputItemInputProps,
  "asChild"
> {}

export const LoongArkTagsInputItemInput: Component<
  LoongArkTagsInputItemInputProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkTagsInput.ItemInput
      {...props}
      data-scope="tags-input"
      data-part="item-input"
    />
  );
}, lkAutomaticTagsInputStyles);

export interface LoongArkTagsInputItemDeleteTriggerProps extends Omit<
  ArkTagsInputItemDeleteTriggerProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTagsInputItemDeleteTrigger: Component<
  LoongArkTagsInputItemDeleteTriggerProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkTagsInput.ItemDeleteTrigger
      {...others}
      data-scope="tags-input"
      data-part="item-delete-trigger"
    >
      {local.children}
    </ArkTagsInput.ItemDeleteTrigger>
  );
}, lkAutomaticTagsInputStyles);

export interface LoongArkTagsInputClearTriggerProps extends Omit<
  ArkTagsInputClearTriggerProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTagsInputClearTrigger: Component<
  LoongArkTagsInputClearTriggerProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkTagsInput.ClearTrigger
      {...others}
      data-scope="tags-input"
      data-part="clear-trigger"
    >
      {local.children}
    </ArkTagsInput.ClearTrigger>
  );
}, lkAutomaticTagsInputStyles);

export interface LoongArkTagsInputHiddenInputProps extends Omit<
  ArkTagsInputHiddenInputProps,
  "asChild"
> {}

export const LoongArkTagsInputHiddenInput: Component<
  LoongArkTagsInputHiddenInputProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const api = useTagsInputContext();
  const ref = nativeSelectionRef(
    () => ({
      formValue: api().valueAsString,
    }),
    props.ref,
  );
  return (
    <ArkTagsInput.HiddenInput
      {...props}
      ref={ref}
      data-scope="tags-input"
      data-part="hidden-input"
    />
  );
}, lkAutomaticTagsInputStyles);
