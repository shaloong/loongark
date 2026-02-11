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
import type { TagsInputSize, TagsInputState } from "@loongark/primitives";

export interface LoongArkTagsInputRootProps
  extends Omit<ArkTagsInputRootProps, "asChild"> {
  size?: TagsInputSize;
  state?: TagsInputState;
  disabled?: boolean;
  readOnly?: boolean;
  children?: JSX.Element;
}

export const LoongArkTagsInputRoot: Component<LoongArkTagsInputRootProps> = (
  props
) => {
  const merged = mergeProps(
    {
      size: "md" as TagsInputSize,
      state: "default" as TagsInputState,
      disabled: false,
      readOnly: false,
    },
    props
  );
  const [local, others] = splitProps(merged, [
    "children",
    "size",
    "state",
    "disabled",
    "readOnly",
  ]);

  return (
    <ArkTagsInput.Root
      {...(others as any)}
      disabled={local.disabled}
      readOnly={local.readOnly}
      data-scope="tags-input"
      data-part="root"
      data-size={local.size}
      data-state={local.state !== "default" ? local.state : undefined}
      data-disabled={local.disabled ? "true" : undefined}
      data-readonly={local.readOnly ? "true" : undefined}
    >
      {local.children}
    </ArkTagsInput.Root>
  );
};

export interface LoongArkTagsInputLabelProps
  extends Omit<ArkTagsInputLabelProps, "asChild"> {
  children?: JSX.Element;
}

export const LoongArkTagsInputLabel: Component<LoongArkTagsInputLabelProps> = (
  props
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkTagsInput.Label
      {...others}
      data-scope="tags-input"
      data-part="label"
    >
      {local.children}
    </ArkTagsInput.Label>
  );
};

export interface LoongArkTagsInputControlProps
  extends Omit<ArkTagsInputControlProps, "asChild"> {
  size?: TagsInputSize;
  state?: TagsInputState;
  disabled?: boolean;
  children?: JSX.Element;
}

export const LoongArkTagsInputControl: Component<
  LoongArkTagsInputControlProps
> = (props) => {
  const merged = mergeProps(
    {
      size: "md" as TagsInputSize,
      state: "default" as TagsInputState,
      disabled: false,
    },
    props
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
};

export interface LoongArkTagsInputInputProps
  extends Omit<ArkTagsInputInputProps, "asChild"> {
  size?: TagsInputSize;
  state?: TagsInputState;
  disabled?: boolean;
  readOnly?: boolean;
}

export const LoongArkTagsInputInput: Component<LoongArkTagsInputInputProps> = (
  props
) => {
  const merged = mergeProps(
    {
      size: "md" as TagsInputSize,
      state: "default" as TagsInputState,
      disabled: false,
      readOnly: false,
    },
    props
  );
  const [local, others] = splitProps(merged, [
    "size",
    "state",
    "disabled",
    "readOnly",
  ]);

  return (
    <ArkTagsInput.Input
      {...others}
      disabled={local.disabled}
      readOnly={local.readOnly}
      data-scope="tags-input"
      data-part="input"
      data-size={local.size}
      data-state={local.state !== "default" ? local.state : undefined}
      data-disabled={local.disabled ? "true" : undefined}
      data-readonly={local.readOnly ? "true" : undefined}
    />
  );
};

export interface LoongArkTagsInputItemProps
  extends Omit<ArkTagsInputItemProps, "asChild"> {
  children?: JSX.Element;
}

export const LoongArkTagsInputItem: Component<LoongArkTagsInputItemProps> = (
  props
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkTagsInput.Item {...others} data-scope="tags-input" data-part="item">
      {local.children}
    </ArkTagsInput.Item>
  );
};

export interface LoongArkTagsInputItemPreviewProps
  extends Omit<ArkTagsInputItemPreviewProps, "asChild"> {
  children?: JSX.Element;
}

export const LoongArkTagsInputItemPreview: Component<
  LoongArkTagsInputItemPreviewProps
> = (props) => {
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
};

export interface LoongArkTagsInputItemTextProps
  extends Omit<ArkTagsInputItemTextProps, "asChild"> {
  children?: JSX.Element;
}

export const LoongArkTagsInputItemText: Component<
  LoongArkTagsInputItemTextProps
> = (props) => {
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
};

export interface LoongArkTagsInputItemInputProps
  extends Omit<ArkTagsInputItemInputProps, "asChild"> {}

export const LoongArkTagsInputItemInput: Component<
  LoongArkTagsInputItemInputProps
> = (props) => {
  return (
    <ArkTagsInput.ItemInput
      {...props}
      data-scope="tags-input"
      data-part="item-input"
    />
  );
};

export interface LoongArkTagsInputItemDeleteTriggerProps
  extends Omit<ArkTagsInputItemDeleteTriggerProps, "asChild"> {
  children?: JSX.Element;
}

export const LoongArkTagsInputItemDeleteTrigger: Component<
  LoongArkTagsInputItemDeleteTriggerProps
> = (props) => {
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
};

export interface LoongArkTagsInputClearTriggerProps
  extends Omit<ArkTagsInputClearTriggerProps, "asChild"> {
  children?: JSX.Element;
}

export const LoongArkTagsInputClearTrigger: Component<
  LoongArkTagsInputClearTriggerProps
> = (props) => {
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
};

export interface LoongArkTagsInputHiddenInputProps
  extends Omit<ArkTagsInputHiddenInputProps, "asChild"> {}

export const LoongArkTagsInputHiddenInput: Component<
  LoongArkTagsInputHiddenInputProps
> = (props) => {
  return (
    <ArkTagsInput.HiddenInput
      {...props}
      data-scope="tags-input"
      data-part="hidden-input"
    />
  );
};
