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

const buildControlProps = (dataKey: string, props: BaseInput) => {
  const merged = mergeProps(inputDefaults, props);
  const { size, state, disabled, readOnly, multiline, children, ...rest } =
    merged;

  return {
    ...rest,
    disabled,
    readonly: readOnly,
    children,
    [`data-${dataKey}`]: "",
    "data-size": size,
    "data-state": normalizeState(state),
    "data-multiline": boolAttr(multiline),
  };
};

export const LoongArkInputRoot: Component<BaseInput> = (props) =>
  Field.Root({
    ...buildControlProps("lk-input-wrapper", props),
    "data-disabled": boolAttr(props.disabled),
  });

export const LoongArkInputControl: Component<BaseInput> = (props) =>
  Field.Input(buildControlProps("lk-input", props));

export const LoongArkTextareaControl: Component<BaseInput> = (props) =>
  Field.Textarea(buildControlProps("lk-input", { ...props, multiline: true }));

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
    "data-lk-input-helper": "",
    "data-variant": variant === "default" ? undefined : variant,
  });
};

export const LoongArkInputLabel: Component<{ children?: unknown }> = (props) =>
  Field.Label({
    ...props,
    "data-lk-input-label": "",
  });

interface InputAddonProps {
  children?: unknown;
  [key: string]: unknown;
}

interface InputSuffixProps extends InputAddonProps {
  action?: "button" | "text";
}

export const LoongArkInputPrefix: Component<InputAddonProps> = (props) =>
  ark.span({
    ...props,
    "data-lk-input-prefix": "",
  });

export const LoongArkInputSuffix: Component<InputSuffixProps> = (props) => {
  const { action = "text", ...rest } = props;
  return ark.span({
    ...rest,
    "data-lk-input-suffix": "",
    "data-action": action === "button" ? "button" : undefined,
  });
};
