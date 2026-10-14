"use client";
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticInputStyles } from "@shaloong/loongark-primitives/automatic-styles/input";


import type {
  HTMLAttributes,
  LabelHTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ButtonHTMLAttributes,
} from "react";
import { dataProps } from "../data-props";
import { Field, useFieldContext } from "@ark-ui/react/field";
import { inputSuffixDisabled } from "@shaloong/loongark-kit";
import { ark } from "@ark-ui/react";
import type { InputPrimitiveProps } from "@shaloong/loongark-primitives";
import { createElement, forwardRef } from "react";
import type { ReactNode } from "react";

export type InputSize = NonNullable<InputPrimitiveProps["size"]>;
export type InputState = NonNullable<InputPrimitiveProps["state"]>;

export interface LoongArkInputRootProps
  extends Partial<InputPrimitiveProps>, HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  variant?: "default" | "floating";
  hasValue?: boolean;
  required?: boolean;
}

export const LoongArkInputRoot = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
), lkAutomaticInputStyles);

LoongArkInputRoot.displayName = "LoongArkInputRoot";

export interface LoongArkInputControlProps
  extends
    Partial<InputPrimitiveProps>,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {}

export const LoongArkInputControl = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLInputElement,
  LoongArkInputControlProps
>(
  (
    {
      size = "md",
      state = "default",
      disabled,
      readOnly,
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
), lkAutomaticInputStyles);

LoongArkInputControl.displayName = "LoongArkInputControl";
export const LoongArkInputInput = /*#__PURE__*/ withAutomaticStyles(LoongArkInputControl, lkAutomaticInputStyles);

export interface LoongArkTextareaControlProps
  extends
    Partial<InputPrimitiveProps>,
    TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const LoongArkTextareaControl = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLTextAreaElement,
  LoongArkTextareaControlProps
>(
  (
    {
      size = "md",
      state = "default",
      disabled,
      readOnly,
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
), lkAutomaticInputStyles);

LoongArkTextareaControl.displayName = "LoongArkTextareaControl";

export interface LoongArkInputHelperTextProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  variant?: "default" | "error" | "success";
}

export const LoongArkInputHelperText = /*#__PURE__*/ withAutomaticStyles(({
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
  ), lkAutomaticInputStyles);

export interface LoongArkInputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children?: ReactNode;
}

export const LoongArkInputLabel = /*#__PURE__*/ withAutomaticStyles(({
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
  ), lkAutomaticInputStyles);

export const LoongArkInputErrorText = /*#__PURE__*/ withAutomaticStyles(({
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
  ), lkAutomaticInputStyles);

export interface LoongArkInputAddonProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

export const LoongArkInputGroup = /*#__PURE__*/ withAutomaticStyles(({
  children,
  ...rest
}: LoongArkInputAddonProps) =>
  createElement(
    ark.div,
    dataProps({ ...rest, "data-scope": "input", "data-part": "group" }),
    children,
  ), lkAutomaticInputStyles);

export const LoongArkInputPrefix = /*#__PURE__*/ withAutomaticStyles(({
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
  ), lkAutomaticInputStyles);

export interface LoongArkInputSuffixProps extends LoongArkInputAddonProps {
  disabled?: boolean;
  action?: "clear" | "button" | "none" | "text";
  onClick?: () => void;
}

export const LoongArkInputSuffix = /*#__PURE__*/ withAutomaticStyles(({
  children,
  action,
  onClick,
  disabled,
  ...rest
}: LoongArkInputSuffixProps) => {
  const field = useFieldContext();
  const isAction =
    (action === "clear" || action === "button") && Boolean(onClick);
  const Element = isAction ? ark.button : ark.span;

  return createElement(
    Element,
    dataProps({
      ...rest,
      onClick,
      type: isAction ? ("button" as const) : undefined,
      disabled: isAction
        ? inputSuffixDisabled(action, disabled, field)
        : undefined,
      "data-scope": "input",
      "data-part": "suffix",
      "data-action": isAction ? action : undefined,
    }),
    children,
  );
}, lkAutomaticInputStyles);
