
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticInputStyles } from "@loongark/primitives/automatic-styles/input";
import { dataProps } from "../data-props";
import type { JSX } from "solid-js";
import { Field, useFieldContext } from "@ark-ui/solid/field";
import { inputSuffixDisabled } from "@loongark/kit";
import { ark } from "@ark-ui/solid";
import type { InputPrimitiveProps } from "@loongark/primitives";
import { mergeProps, splitProps, createComponent } from "solid-js";
import { Dynamic } from "solid-js/web";
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
> = /*#__PURE__*/ withAutomaticStyles((props) =>
  Field.Root(
    mergeProps(buildControlProps("root", props), {
      get "data-disabled"() {
        return boolAttr(props.disabled);
      },
    }),
  ), lkAutomaticInputStyles);

export const LoongArkInputControl: Component<
  BaseInput & Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "size">
> = /*#__PURE__*/ withAutomaticStyles((props) => Field.Input(buildControlProps("control", props)), lkAutomaticInputStyles);

export const LoongArkInputInput = /*#__PURE__*/ withAutomaticStyles(LoongArkInputControl, lkAutomaticInputStyles);

export const LoongArkInputGroup: Component<
  BaseInput & JSX.HTMLAttributes<HTMLDivElement>
> = /*#__PURE__*/ withAutomaticStyles((props) =>
  ark.div(mergeProps(props, { "data-scope": "input", "data-part": "group" })), lkAutomaticInputStyles);

export const LoongArkTextareaControl: Component<
  BaseInput & JSX.TextareaHTMLAttributes<HTMLTextAreaElement>
> = /*#__PURE__*/ withAutomaticStyles((props) =>
  Field.Textarea(
    buildControlProps("control", mergeProps(props, { multiline: true })),
  ), lkAutomaticInputStyles);

interface HelperProps extends Omit<JSX.HTMLAttributes<HTMLElement>, "ref"> {
  variant?: "default" | "error" | "success";
  children?: JSX.Element;
}

export const LoongArkInputHelperText: Component<HelperProps> = /*#__PURE__*/ withAutomaticStyles((props) => {
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
}, lkAutomaticInputStyles);

export const LoongArkInputErrorText: Component<Omit<HelperProps, "variant">> = /*#__PURE__*/ withAutomaticStyles((
  props,
) =>
  Field.ErrorText(
    mergeProps(props, {
      "data-scope": "input",
      "data-part": "helper-text",
      "data-variant": "error",
    }),
  ), lkAutomaticInputStyles);

export const LoongArkInputLabel: Component<
  Omit<JSX.HTMLAttributes<HTMLElement>, "ref">
> = /*#__PURE__*/ withAutomaticStyles((props) =>
  Field.Label(
    mergeProps(props, {
      "data-scope": "input",
      "data-part": "label",
    }),
  ), lkAutomaticInputStyles);

interface InputAddonProps extends Omit<JSX.HTMLAttributes<HTMLElement>, "ref"> {
  children?: JSX.Element;
}

interface InputSuffixProps extends InputAddonProps {
  disabled?: boolean;
  action?: "clear" | "button" | "none" | "text";
}

export const LoongArkInputPrefix: Component<InputAddonProps> = /*#__PURE__*/ withAutomaticStyles((props) =>
  ark.span(
    dataProps({
      ...props,
      "data-scope": "input",
      "data-part": "prefix",
    }),
  ), lkAutomaticInputStyles);

export const LoongArkInputSuffix: Component<InputSuffixProps> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const field = useFieldContext();
  const [local, rest] = splitProps(props, ["action", "disabled"]);
  const isAction = () =>
    (local.action === "clear" || local.action === "button") &&
    typeof props.onClick === "function";
  const attributes = mergeProps(rest, {
    get type() {
      return isAction() ? ("button" as const) : undefined;
    },
    get disabled() {
      return isAction()
        ? inputSuffixDisabled(local.action, local.disabled, field?.())
        : undefined;
    },
    "data-scope": "input",
    "data-part": "suffix",
    get "data-action"() {
      return isAction() ? local.action : undefined;
    },
  });
  return createComponent(
    Dynamic,
    mergeProps(attributes, {
      get component() {
        return isAction() ? ark.button : ark.span;
      },
    }),
  );
}, lkAutomaticInputStyles);
