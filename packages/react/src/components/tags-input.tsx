/**
 * Tags Input component - React wrapper.
 * Uses Ark UI Tags Input with data attributes for styling.
 */
import { useFieldContext } from "@ark-ui/react/field";
import {
  nativeSelectionProps,
  nativeSelectionFieldDescription,
} from "@loongark/kit";
import React, { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useNativeSelection } from "../native-selection";
import { useTagsInputContext } from "@ark-ui/react/tags-input";
import { TagsInput } from "@ark-ui/react/tags-input";
import type { TagsInputSize, TagsInputState } from "@loongark/primitives";

type ArkTagsInputRootProps = ComponentPropsWithoutRef<typeof TagsInput.Root>;
type ArkTagsInputLabelProps = ComponentPropsWithoutRef<typeof TagsInput.Label>;
type ArkTagsInputControlProps = ComponentPropsWithoutRef<
  typeof TagsInput.Control
>;
type ArkTagsInputInputProps = ComponentPropsWithoutRef<typeof TagsInput.Input>;
type ArkTagsInputItemProps = ComponentPropsWithoutRef<typeof TagsInput.Item>;
type ArkTagsInputItemPreviewProps = ComponentPropsWithoutRef<
  typeof TagsInput.ItemPreview
>;
type ArkTagsInputItemTextProps = ComponentPropsWithoutRef<
  typeof TagsInput.ItemText
>;
type ArkTagsInputItemInputProps = ComponentPropsWithoutRef<
  typeof TagsInput.ItemInput
>;
type ArkTagsInputItemDeleteTriggerProps = ComponentPropsWithoutRef<
  typeof TagsInput.ItemDeleteTrigger
>;
type ArkTagsInputClearTriggerProps = ComponentPropsWithoutRef<
  typeof TagsInput.ClearTrigger
>;
type ArkTagsInputHiddenInputProps = ComponentPropsWithoutRef<
  typeof TagsInput.HiddenInput
>;

export interface LoongArkTagsInputRootProps extends Omit<
  ArkTagsInputRootProps,
  "asChild"
> {
  size?: TagsInputSize;
  state?: TagsInputState;
  children?: ReactNode;
}

export interface LoongArkTagsInputLabelProps extends Omit<
  ArkTagsInputLabelProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkTagsInputControlProps extends Omit<
  ArkTagsInputControlProps,
  "asChild"
> {
  size?: TagsInputSize;
  state?: TagsInputState;
  disabled?: boolean;
  children?: ReactNode;
}

export interface LoongArkTagsInputInputProps extends Omit<
  ArkTagsInputInputProps,
  "asChild" | "size"
> {
  size?: TagsInputSize;
  state?: TagsInputState;
  disabled?: boolean;
  readOnly?: boolean;
}

export interface LoongArkTagsInputItemProps extends Omit<
  ArkTagsInputItemProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkTagsInputItemPreviewProps extends Omit<
  ArkTagsInputItemPreviewProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkTagsInputItemTextProps extends Omit<
  ArkTagsInputItemTextProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkTagsInputItemInputProps extends Omit<
  ArkTagsInputItemInputProps,
  "asChild" | "size"
> {}

export interface LoongArkTagsInputItemDeleteTriggerProps extends Omit<
  ArkTagsInputItemDeleteTriggerProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkTagsInputClearTriggerProps extends Omit<
  ArkTagsInputClearTriggerProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkTagsInputHiddenInputProps extends Omit<
  ArkTagsInputHiddenInputProps,
  "asChild" | "size"
> {}

export const LoongArkTagsInputRoot = forwardRef<
  HTMLDivElement,
  LoongArkTagsInputRootProps
>(
  (
    { children, size = "md", state = "default", disabled, readOnly, ...props },
    ref,
  ) => {
    return (
      <TagsInput.Root
        {...nativeSelectionProps({ ...props, disabled, readOnly })}
        ref={ref}
        data-scope="tags-input"
        data-part="root"
        data-size={size}
        data-state={state !== "default" ? state : undefined}
        data-disabled={disabled ? "true" : undefined}
        data-readonly={readOnly ? "true" : undefined}
      >
        {children}
      </TagsInput.Root>
    );
  },
);

LoongArkTagsInputRoot.displayName = "LoongArkTagsInputRoot";

export const LoongArkTagsInputLabel = forwardRef<
  HTMLLabelElement,
  LoongArkTagsInputLabelProps
>(({ children, ...props }, ref) => {
  return (
    <TagsInput.Label
      {...props}
      ref={ref}
      data-scope="tags-input"
      data-part="label"
    >
      {children}
    </TagsInput.Label>
  );
});

LoongArkTagsInputLabel.displayName = "LoongArkTagsInputLabel";

export const LoongArkTagsInputControl = forwardRef<
  HTMLDivElement,
  LoongArkTagsInputControlProps
>(({ children, size = "md", state = "default", disabled, ...props }, ref) => {
  return (
    <TagsInput.Control
      {...props}
      ref={ref}
      data-scope="tags-input"
      data-part="control"
      data-size={size}
      data-state={state !== "default" ? state : undefined}
      data-disabled={disabled ? "true" : undefined}
    >
      {children}
    </TagsInput.Control>
  );
});

LoongArkTagsInputControl.displayName = "LoongArkTagsInputControl";

export const LoongArkTagsInputInput = forwardRef<
  HTMLInputElement,
  LoongArkTagsInputInputProps
>(({ size = "md", state = "default", disabled, readOnly, ...props }, ref) => {
  const api = useTagsInputContext();
  const field = useFieldContext();
  const isDisabled = disabled ?? !!api.getHiddenInputProps().disabled;
  const isReadOnly = readOnly ?? !!api.getHiddenInputProps().readOnly;
  return (
    <TagsInput.Input
      {...props}
      ref={ref}
      disabled={isDisabled}
      readOnly={isReadOnly}
      aria-describedby={nativeSelectionFieldDescription(
        props["aria-describedby"],
        field,
        api.getInputProps()["aria-invalid"],
      )}
      data-scope="tags-input"
      data-part="input"
      data-size={size}
      data-state={state !== "default" ? state : undefined}
      data-disabled={isDisabled ? "true" : undefined}
      data-readonly={isReadOnly ? "true" : undefined}
    />
  );
});

LoongArkTagsInputInput.displayName = "LoongArkTagsInputInput";

export const LoongArkTagsInputItem = forwardRef<
  HTMLDivElement,
  LoongArkTagsInputItemProps
>(({ children, ...props }, ref) => {
  return (
    <TagsInput.Item
      {...props}
      ref={ref}
      data-scope="tags-input"
      data-part="item"
    >
      {children}
    </TagsInput.Item>
  );
});

LoongArkTagsInputItem.displayName = "LoongArkTagsInputItem";

export const LoongArkTagsInputItemPreview = forwardRef<
  HTMLDivElement,
  LoongArkTagsInputItemPreviewProps
>(({ children, ...props }, ref) => {
  return (
    <TagsInput.ItemPreview
      {...props}
      ref={ref}
      data-scope="tags-input"
      data-part="item-preview"
    >
      {children}
    </TagsInput.ItemPreview>
  );
});

LoongArkTagsInputItemPreview.displayName = "LoongArkTagsInputItemPreview";

export const LoongArkTagsInputItemText = forwardRef<
  HTMLSpanElement,
  LoongArkTagsInputItemTextProps
>(({ children, ...props }, ref) => {
  return (
    <TagsInput.ItemText
      {...props}
      ref={ref}
      data-scope="tags-input"
      data-part="item-text"
    >
      {children}
    </TagsInput.ItemText>
  );
});

LoongArkTagsInputItemText.displayName = "LoongArkTagsInputItemText";

export const LoongArkTagsInputItemInput = forwardRef<
  HTMLInputElement,
  LoongArkTagsInputItemInputProps
>((props, ref) => {
  return (
    <TagsInput.ItemInput
      {...props}
      ref={ref}
      data-scope="tags-input"
      data-part="item-input"
    />
  );
});

LoongArkTagsInputItemInput.displayName = "LoongArkTagsInputItemInput";

export const LoongArkTagsInputItemDeleteTrigger = forwardRef<
  HTMLButtonElement,
  LoongArkTagsInputItemDeleteTriggerProps
>(({ children, ...props }, ref) => {
  return (
    <TagsInput.ItemDeleteTrigger
      {...props}
      ref={ref}
      data-scope="tags-input"
      data-part="item-delete-trigger"
    >
      {children}
    </TagsInput.ItemDeleteTrigger>
  );
});

LoongArkTagsInputItemDeleteTrigger.displayName =
  "LoongArkTagsInputItemDeleteTrigger";

export const LoongArkTagsInputClearTrigger = forwardRef<
  HTMLButtonElement,
  LoongArkTagsInputClearTriggerProps
>(({ children, ...props }, ref) => {
  return (
    <TagsInput.ClearTrigger
      {...props}
      ref={ref}
      data-scope="tags-input"
      data-part="clear-trigger"
    >
      {children}
    </TagsInput.ClearTrigger>
  );
});

LoongArkTagsInputClearTrigger.displayName = "LoongArkTagsInputClearTrigger";

export const LoongArkTagsInputHiddenInput = forwardRef<
  HTMLInputElement,
  LoongArkTagsInputHiddenInputProps
>((props, ref) => {
  const input = useNativeSelection(useTagsInputContext(), "tags", ref);
  return (
    <TagsInput.HiddenInput
      {...props}
      ref={input}
      data-scope="tags-input"
      data-part="hidden-input"
    />
  );
});

LoongArkTagsInputHiddenInput.displayName = "LoongArkTagsInputHiddenInput";
