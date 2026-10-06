import { dataProps } from "../data-props";
import type { JSX } from "solid-js";
import { Field } from "@ark-ui/solid/field";
import { ark } from "@ark-ui/solid";
import type { InputPrimitiveProps } from "@loongark/primitives";
import { mergeProps, splitProps } from "solid-js";
import type { Component } from "solid-js";
import { boolAttr, normalizeState } from "../utils";

export type InputSize = NonNullable<InputPrimitiveProps["size"]>;
export type InputState = NonNullable<InputPrimitiveProps["state"]>;

type BaseInput = Partial<InputPrimitiveProps> & {
  disabled?: boolean;
  readOnly?: boolean;
  multiline?: boolean;
  children?: JSX.Element;
};

const inputDefaults: Required<
  Pick<BaseInput, "size" | "state" | "disabled" | "readOnly" | "multiline">
> = {
  size: "md",
  state: "default",
  disabled: false,
  readOnly: false,
  multiline: false,
};

const buildControlProps = <P extends BaseInput>(
  part: "root" | "control",
  props: P,
) => {
  const defaults: Required<Pick<BaseInput, "size" | "state" | "multiline">> &
    Pick<BaseInput, "disabled" | "readOnly"> =
    part === "root"
      ? inputDefaults
      : { size: "md", state: "default", multiline: false };
  const merged = mergeProps(defaults, props);
  const [local, rest] = splitProps(merged, [
    "size",
    "state",
    "disabled",
    "readOnly",
    "multiline",
  ]);
  return mergeProps(rest, {
    get disabled() {
      return local.disabled;
    },
    get invalid() {
      return local.state === "invalid";
    },
    get readOnly() {
      return local.readOnly;
    },
    "data-scope": "input",
    "data-part": part,
    get "data-size"() {
      return local.size;
    },
    get "data-state"() {
      return normalizeState(local.state);
    },
    get "data-multiline"() {
      return boolAttr(local.multiline);
    },
  });
};

export const LoongArkInputRoot: Component<
  BaseInput & import("@ark-ui/solid/field").FieldRootProps
> = (props) =>
  Field.Root(
    mergeProps(buildControlProps("root", props), {
      get "data-disabled"() {
        return boolAttr(props.disabled);
      },
    }),
  );

export const LoongArkInputControl: Component<
  BaseInput & Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "size">
> = (props) => Field.Input(buildControlProps("control", props));

export const LoongArkInputInput = LoongArkInputControl;

export const LoongArkInputGroup: Component<
  BaseInput & JSX.HTMLAttributes<HTMLDivElement>
> = (props) =>
  ark.div(mergeProps(props, { "data-scope": "input", "data-part": "group" }));

export const LoongArkTextareaControl: Component<
  BaseInput & JSX.TextareaHTMLAttributes<HTMLTextAreaElement>
> = (props) =>
  Field.Textarea(
    buildControlProps("control", mergeProps(props, { multiline: true })),
  );

interface HelperProps extends Omit<JSX.HTMLAttributes<HTMLElement>, "ref"> {
  variant?: "default" | "error" | "success";
  children?: JSX.Element;
}

export const LoongArkInputHelperText: Component<HelperProps> = (props) => {
  const { variant = "default", children, ...rest } = props;
  return (props.variant === "error" ? Field.ErrorText : Field.HelperText)(
    dataProps({
      ...rest,
      children,
      "data-scope": "input",
      "data-part": "helper-text",
      "data-variant": variant === "default" ? undefined : variant,
    }),
  );
};

export const LoongArkInputErrorText: Component<Omit<HelperProps, "variant">> = (
  props,
) =>
  Field.ErrorText(
    mergeProps(props, {
      "data-scope": "input",
      "data-part": "helper-text",
      "data-variant": "error",
    }),
  );

export const LoongArkInputLabel: Component<
  Omit<JSX.HTMLAttributes<HTMLElement>, "ref">
> = (props) =>
  Field.Label(
    dataProps({
      ...props,
      "data-scope": "input",
      "data-part": "label",
    }),
  );

interface InputAddonProps extends Omit<JSX.HTMLAttributes<HTMLElement>, "ref"> {
  children?: JSX.Element;
}

interface InputSuffixProps extends InputAddonProps {
  action?: "clear" | "button" | "none" | "text";
}

export const LoongArkInputPrefix: Component<InputAddonProps> = (props) =>
  ark.span(
    dataProps({
      ...props,
      "data-scope": "input",
      "data-part": "prefix",
    }),
  );

export const LoongArkInputSuffix: Component<InputSuffixProps> = (props) => {
  const { action = "none", ...rest } = props;
  const isAction =
    (action === "clear" || action === "button") &&
    typeof props.onClick === "function";
  const Element = isAction ? ark.button : ark.span;

  return Element(
    dataProps({
      ...rest,
      type: isAction ? "button" : undefined,
      "data-scope": "input",
      "data-part": "suffix",
      "data-action": isAction ? "clear" : undefined,
    }),
  );
};
