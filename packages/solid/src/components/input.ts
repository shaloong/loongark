import { Field } from "@ark-ui/solid/field";
import { ark } from "@ark-ui/solid";
import type { InputPrimitiveProps } from "@loongark/primitives";
import { mergeProps } from "solid-js";
import type { Component } from "solid-js";
import { boolAttr, normalizeState } from "../utils";

export type InputSize = NonNullable<InputPrimitiveProps["size"]>;
export type InputState = NonNullable<InputPrimitiveProps["state"]>;

type BaseInput = Partial<InputPrimitiveProps> & {
  disabled?: boolean;
  readOnly?: boolean;
  multiline?: boolean;
  children?: unknown;
  [key: string]: unknown;
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

const buildControlProps = (
  part: "root" | "control",
  props: BaseInput
) => {
  const merged = mergeProps(inputDefaults, props);
  const { size, state, disabled, readOnly, multiline, children, ...rest } =
    merged;

  return {
    ...rest,
    disabled,
    readonly: readOnly,
    children,
    "data-scope": "input",
    "data-part": part,
    "data-size": size,
    "data-state": normalizeState(state),
    "data-multiline": boolAttr(multiline),
  };
};

export const LoongArkInputRoot: Component<BaseInput> = (props) =>
  Field.Root({
    ...buildControlProps("root", props),
    "data-disabled": boolAttr(props.disabled),
  });

export const LoongArkInputControl: Component<BaseInput> = (props) =>
  Field.Input(buildControlProps("control", props));

export const LoongArkTextareaControl: Component<BaseInput> = (props) =>
  Field.Textarea(buildControlProps("control", { ...props, multiline: true }));

interface HelperProps {
  variant?: "default" | "error" | "success";
  children?: unknown;
  [key: string]: unknown;
}

export const LoongArkInputHelperText: Component<HelperProps> = (props) => {
  const { variant = "default", children, ...rest } = props;
  return Field.HelperText({
    ...rest,
    children,
    "data-scope": "input",
    "data-part": "helper-text",
    "data-variant": variant === "default" ? undefined : variant,
  });
};

export const LoongArkInputLabel: Component<{ children?: unknown }> = (props) =>
  Field.Label({
    ...props,
    "data-scope": "input",
    "data-part": "label",
  });

interface InputAddonProps {
  children?: unknown;
  [key: string]: unknown;
}

interface InputSuffixProps extends InputAddonProps {
  action?: "clear" | "button" | "none" | "text";
}

export const LoongArkInputPrefix: Component<InputAddonProps> = (props) =>
  ark.span({
    ...props,
    "data-scope": "input",
    "data-part": "prefix",
  });

export const LoongArkInputSuffix: Component<InputSuffixProps> = (props) => {
  const { action = "none", ...rest } = props;
  const isAction = action === "clear" || action === "button";
  const Element = isAction ? ark.button : ark.span;

  return Element({
    ...rest,
    type: isAction ? "button" : undefined,
    "data-scope": "input",
    "data-part": "suffix",
    "data-action": isAction ? "clear" : undefined,
  });
};
