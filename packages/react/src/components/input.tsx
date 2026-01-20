import { Field } from "@ark-ui/react/field";
import { ark } from "@ark-ui/react";
import type { InputPrimitiveProps } from "@loongark/primitives";
import { createElement, forwardRef } from "react";
import type { ReactNode } from "react";

export type InputSize = NonNullable<InputPrimitiveProps["size"]>;
export type InputState = NonNullable<InputPrimitiveProps["state"]>;

export interface LoongArkInputRootProps extends Partial<InputPrimitiveProps> {
  children?: ReactNode;
  variant?: "default" | "floating";
  hasValue?: boolean;
  [key: string]: unknown;
}

export const LoongArkInputRoot = forwardRef<
  HTMLDivElement,
  LoongArkInputRootProps
>(
  (
    {
      children,
      size = "md",
      state = "default",
      disabled = false,
      readOnly = false,
      multiline = false,
      variant = "default",
      hasValue = false,
      ...rest
    },
    ref
  ) =>
    createElement(
      Field.Root,
      {
      ...rest,
      ref,
      disabled,
      readOnly,
      "data-scope": "input",
      "data-part": "root",
      "data-size": size,
      "data-state": state !== "default" ? state : undefined,
      "data-disabled": disabled ? "true" : undefined,
        "data-multiline": multiline ? "true" : undefined,
        "data-variant": variant === "floating" ? "floating" : undefined,
        "data-has-value":
          variant === "floating" && hasValue ? "true" : undefined,
      },
      children
    )
);

LoongArkInputRoot.displayName = "LoongArkInputRoot";

export interface LoongArkInputControlProps
  extends Partial<InputPrimitiveProps> {
  [key: string]: unknown;
}

export const LoongArkInputControl = forwardRef<
  HTMLInputElement,
  LoongArkInputControlProps
>(
  (
    {
      size = "md",
      state = "default",
      disabled = false,
      readOnly = false,
      multiline = false,
      ...rest
    },
    ref
  ) =>
    createElement(Field.Input, {
      ...rest,
      ref,
      disabled,
      readOnly,
      "data-scope": "input",
      "data-part": "control",
      "data-size": size,
      "data-state": state !== "default" ? state : undefined,
      "data-multiline": multiline ? "true" : undefined,
    })
);

LoongArkInputControl.displayName = "LoongArkInputControl";

export interface LoongArkTextareaControlProps
  extends Partial<InputPrimitiveProps> {
  [key: string]: unknown;
}

export const LoongArkTextareaControl = forwardRef<
  HTMLTextAreaElement,
  LoongArkTextareaControlProps
>(
  (
    {
      size = "md",
      state = "default",
      disabled = false,
      readOnly = false,
      multiline = true,
      ...rest
    },
    ref
  ) =>
    createElement(Field.Textarea, {
      ...rest,
      ref,
      disabled,
      readOnly,
      "data-scope": "input",
      "data-part": "control",
      "data-size": size,
      "data-state": state !== "default" ? state : undefined,
      "data-multiline": multiline ? "true" : undefined,
    })
);

LoongArkTextareaControl.displayName = "LoongArkTextareaControl";

export interface LoongArkInputHelperTextProps {
  children?: ReactNode;
  variant?: "default" | "error" | "success";
  [key: string]: unknown;
}

export const LoongArkInputHelperText = ({
  children,
  variant = "default",
  ...rest
}: LoongArkInputHelperTextProps) =>
  createElement(
    Field.HelperText,
    {
      ...rest,
      "data-scope": "input",
      "data-part": "helper-text",
      "data-variant": variant === "default" ? undefined : variant,
    },
    children
  );

export interface LoongArkInputLabelProps {
  children?: ReactNode;
  [key: string]: unknown;
}

export const LoongArkInputLabel = ({
  children,
  ...rest
}: LoongArkInputLabelProps) =>
  createElement(
    Field.Label,
    {
      ...rest,
      "data-scope": "input",
      "data-part": "label",
    },
    children
  );

export interface LoongArkInputAddonProps {
  children?: ReactNode;
  [key: string]: unknown;
}

export const LoongArkInputPrefix = ({
  children,
  ...rest
}: LoongArkInputAddonProps) =>
  createElement(
    ark.span,
    {
      ...rest,
      "data-scope": "input",
      "data-part": "prefix",
    },
    children
  );

export interface LoongArkInputSuffixProps extends LoongArkInputAddonProps {
  action?: "clear" | "button" | "none" | "text";
  onClick?: () => void;
}

export const LoongArkInputSuffix = ({
  children,
  action,
  onClick,
  ...rest
}: LoongArkInputSuffixProps) => {
  const isAction = action === "clear" || action === "button";
  const Element = isAction ? ark.button : ark.span;

  return createElement(
    Element,
    {
      ...rest,
      onClick,
      type: isAction ? "button" : undefined,
      "data-scope": "input",
      "data-part": "suffix",
      "data-action": isAction ? "clear" : undefined,
    },
    children
  );
};
