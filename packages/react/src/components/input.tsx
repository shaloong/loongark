import type {
  HTMLAttributes,
  LabelHTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ButtonHTMLAttributes,
} from "react";
import { dataProps } from "../data-props";
import { Field } from "@ark-ui/react/field";
import { ark } from "@ark-ui/react";
import type { InputPrimitiveProps } from "@loongark/primitives";
import { createElement, forwardRef } from "react";
import type { ReactNode } from "react";

export type InputSize = NonNullable<InputPrimitiveProps["size"]>;
export type InputState = NonNullable<InputPrimitiveProps["state"]>;

export interface LoongArkInputRootProps
  extends Partial<InputPrimitiveProps>, HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  variant?: "default" | "floating";
  hasValue?: boolean;
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
    ref,
  ) =>
    createElement(
      Field.Root,
      dataProps({
        ...rest,
        ref,
        disabled,
        readOnly,
        invalid: state === "invalid",
        "data-scope": "input",
        "data-part": "root",
        "data-size": size,
        "data-state": state !== "default" ? state : undefined,
        "data-disabled": disabled ? "true" : undefined,
        "data-multiline": multiline ? "true" : undefined,
        "data-variant": variant === "floating" ? "floating" : undefined,
        "data-has-value":
          variant === "floating" && hasValue ? "true" : undefined,
      }),
      children,
    ),
);

LoongArkInputRoot.displayName = "LoongArkInputRoot";

export interface LoongArkInputControlProps
  extends
    Partial<InputPrimitiveProps>,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {}

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
    ref,
  ) =>
    createElement(
      Field.Input,
      dataProps({
        ...rest,
        ref,
        disabled,
        readOnly,
        "data-scope": "input",
        "data-part": "control",
        "data-size": size,
        "data-state": state !== "default" ? state : undefined,
        "data-multiline": multiline ? "true" : undefined,
      }),
    ),
);

LoongArkInputControl.displayName = "LoongArkInputControl";
export const LoongArkInputInput = LoongArkInputControl;

export interface LoongArkTextareaControlProps
  extends
    Partial<InputPrimitiveProps>,
    TextareaHTMLAttributes<HTMLTextAreaElement> {}

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
    ref,
  ) =>
    createElement(
      Field.Textarea,
      dataProps({
        ...rest,
        ref,
        disabled,
        readOnly,
        "data-scope": "input",
        "data-part": "control",
        "data-size": size,
        "data-state": state !== "default" ? state : undefined,
        "data-multiline": multiline ? "true" : undefined,
      }),
    ),
);

LoongArkTextareaControl.displayName = "LoongArkTextareaControl";

export interface LoongArkInputHelperTextProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  variant?: "default" | "error" | "success";
}

export const LoongArkInputHelperText = ({
  children,
  variant = "default",
  ...rest
}: LoongArkInputHelperTextProps) =>
  createElement(
    variant === "error" ? Field.ErrorText : Field.HelperText,
    dataProps({
      ...rest,
      "data-scope": "input",
      "data-part": "helper-text",
      "data-variant": variant === "default" ? undefined : variant,
    }),
    children,
  );

export interface LoongArkInputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children?: ReactNode;
}

export const LoongArkInputLabel = ({
  children,
  ...rest
}: LoongArkInputLabelProps) =>
  createElement(
    Field.Label,
    dataProps({
      ...rest,
      "data-scope": "input",
      "data-part": "label",
    }),
    children,
  );

export const LoongArkInputErrorText = ({
  children,
  ...rest
}: Omit<LoongArkInputHelperTextProps, "variant">) =>
  createElement(
    Field.ErrorText,
    dataProps({
      ...rest,
      "data-scope": "input",
      "data-part": "helper-text",
      "data-variant": "error",
    }),
    children,
  );

export interface LoongArkInputAddonProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

export const LoongArkInputGroup = ({
  children,
  ...rest
}: LoongArkInputAddonProps) =>
  createElement(
    ark.div,
    dataProps({ ...rest, "data-scope": "input", "data-part": "group" }),
    children,
  );

export const LoongArkInputPrefix = ({
  children,
  ...rest
}: LoongArkInputAddonProps) =>
  createElement(
    ark.span,
    dataProps({
      ...rest,
      "data-scope": "input",
      "data-part": "prefix",
    }),
    children,
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
  const isAction =
    (action === "clear" || action === "button") && Boolean(onClick);
  const Element = isAction ? ark.button : ark.span;

  return createElement(
    Element,
    dataProps({
      ...rest,
      onClick,
      type: isAction ? ("button" as const) : undefined,
      "data-scope": "input",
      "data-part": "suffix",
      "data-action": isAction ? "clear" : undefined,
    }),
    children,
  );
};
