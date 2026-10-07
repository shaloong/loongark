import { useFieldContext } from "@ark-ui/solid/field";
import { useNumberInputContext } from "@ark-ui/solid/number-input";
import {
  nativeSelectionProps,
  nativeSelectionFieldDescription,
} from "@loongark/kit";
/** @jsxImportSource solid-js */
import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "./icon";
/**
 * Number Input component - Solid wrapper.
 * Uses Ark UI Number Input with data attributes for styling.
 */
import { type Component, type JSX, mergeProps, splitProps } from "solid-js";
import {
  NumberInput as ArkNumberInput,
  type NumberInputRootProps as ArkNumberInputRootProps,
  type NumberInputLabelProps as ArkNumberInputLabelProps,
  type NumberInputControlProps as ArkNumberInputControlProps,
  type NumberInputInputProps as ArkNumberInputInputProps,
  type NumberInputIncrementTriggerProps as ArkNumberInputIncrementTriggerProps,
  type NumberInputDecrementTriggerProps as ArkNumberInputDecrementTriggerProps,
  type NumberInputValueTextProps as ArkNumberInputValueTextProps,
  type NumberInputScrubberProps as ArkNumberInputScrubberProps,
} from "@ark-ui/solid/number-input";
import type { NumberInputSize, NumberInputState } from "@loongark/primitives";

export interface LoongArkNumberInputRootProps extends Omit<
  ArkNumberInputRootProps,
  "asChild"
> {
  size?: NumberInputSize;
  state?: NumberInputState;
  children?: JSX.Element;
}

export const LoongArkNumberInputRoot: Component<
  LoongArkNumberInputRootProps
> = (props) => {
  const merged = mergeProps(
    {
      size: "md" as NumberInputSize,
      state: "default" as NumberInputState,
    },
    props,
  );
  const [local, others] = splitProps(merged, [
    "children",
    "size",
    "state",
    "disabled",
    "readOnly",
  ]);

  return (
    <ArkNumberInput.Root
      {...others}
      {...nativeSelectionProps({
        disabled: local.disabled,
        readOnly: local.readOnly,
        "data-disabled":
          local.disabled === undefined ? undefined : String(local.disabled),
        "data-readonly":
          local.readOnly === undefined ? undefined : String(local.readOnly),
      })}

      data-scope="number-input"
      data-part="root"
      data-size={local.size}
      data-state={local.state !== "default" ? local.state : undefined}
    >
      {local.children}
    </ArkNumberInput.Root>
  );
};

export interface LoongArkNumberInputLabelProps extends Omit<
  ArkNumberInputLabelProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkNumberInputLabel: Component<
  LoongArkNumberInputLabelProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);

  return (
    <ArkNumberInput.Label
      {...others}
      data-scope="number-input"
      data-part="label"
    >
      {local.children}
    </ArkNumberInput.Label>
  );
};

export interface LoongArkNumberInputControlProps extends Omit<
  ArkNumberInputControlProps,
  "asChild"
> {
  size?: NumberInputSize;
  state?: NumberInputState;
  disabled?: boolean;
  children?: JSX.Element;
}

export const LoongArkNumberInputControl: Component<
  LoongArkNumberInputControlProps
> = (props) => {
  const merged = mergeProps(
    {
      size: "md" as NumberInputSize,
      state: "default" as NumberInputState,
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
    <ArkNumberInput.Control
      {...others}
      data-scope="number-input"
      data-part="control"
      data-size={local.size}
      data-state={local.state !== "default" ? local.state : undefined}
      {...nativeSelectionProps({
        "data-disabled":
          local.disabled === undefined ? undefined : String(local.disabled),
      })}
    >
      {local.children}
    </ArkNumberInput.Control>
  );
};

export interface LoongArkNumberInputInputProps extends Omit<
  ArkNumberInputInputProps,
  "asChild"
> {
  size?: NumberInputSize;
  state?: NumberInputState;
  disabled?: boolean;
  readOnly?: boolean;
}

export const LoongArkNumberInputInput: Component<
  LoongArkNumberInputInputProps
> = (props) => {
  const field = useFieldContext();
  const api = useNumberInputContext();
  const merged = mergeProps(
    {
      size: "md" as NumberInputSize,
      state: "default" as NumberInputState,
    },
    props,
  );
  const [local, others] = splitProps(merged, [
    "size",
    "state",
    "disabled",
    "readOnly",
  ]);

  // Solid 的原生属性使用 readonly；始终提供该键，覆盖规范化器省略 false 的动态路径。
  const isReadOnly = () => {
    const native = api().getInputProps();
    return (
      local.readOnly ??
      props.readonly ??
      native.readonly ??
      ("readOnly" in native && native.readOnly === true)
    );
  };
  return (
    <ArkNumberInput.Input
      {...others}
      {...nativeSelectionProps({
        disabled: local.disabled,
        "data-disabled":
          local.disabled === undefined ? undefined : String(local.disabled),
        "data-readonly":
          local.readOnly === undefined ? undefined : String(local.readOnly),
      })}

      data-scope="number-input"
      aria-describedby={nativeSelectionFieldDescription(
        props["aria-describedby"],
        field?.(),
        api().getInputProps()["aria-invalid"],
      )}
      readonly={isReadOnly()}
      data-part="input"
      data-size={local.size}
      data-state={local.state !== "default" ? local.state : undefined}
    />
  );
};

export interface LoongArkNumberInputIncrementTriggerProps extends Omit<
  ArkNumberInputIncrementTriggerProps,
  "asChild"
> {
  size?: NumberInputSize;
  state?: NumberInputState;
  disabled?: boolean;
  children?: JSX.Element;
}

export const LoongArkNumberInputIncrementTrigger: Component<
  LoongArkNumberInputIncrementTriggerProps
> = (props) => {
  const merged = mergeProps(
    {
      size: "md" as NumberInputSize,
      state: "default" as NumberInputState,
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
    <ArkNumberInput.IncrementTrigger
      {...others}
      {...nativeSelectionProps({
        disabled: local.disabled,
        "data-disabled":
          local.disabled === undefined ? undefined : String(local.disabled),
      })}
      data-scope="number-input"
      data-part="increment-trigger"
      data-size={local.size}
      data-state={local.state !== "default" ? local.state : undefined}
    >
      {local.children ?? <LoongArkIcon icon={controlIcons.plus} size="sm" />}
    </ArkNumberInput.IncrementTrigger>
  );
};

export interface LoongArkNumberInputDecrementTriggerProps extends Omit<
  ArkNumberInputDecrementTriggerProps,
  "asChild"
> {
  size?: NumberInputSize;
  state?: NumberInputState;
  disabled?: boolean;
  children?: JSX.Element;
}

export const LoongArkNumberInputDecrementTrigger: Component<
  LoongArkNumberInputDecrementTriggerProps
> = (props) => {
  const merged = mergeProps(
    {
      size: "md" as NumberInputSize,
      state: "default" as NumberInputState,
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
    <ArkNumberInput.DecrementTrigger
      {...others}
      {...nativeSelectionProps({
        disabled: local.disabled,
        "data-disabled":
          local.disabled === undefined ? undefined : String(local.disabled),
      })}
      data-scope="number-input"
      data-part="decrement-trigger"
      data-size={local.size}
      data-state={local.state !== "default" ? local.state : undefined}
    >
      {local.children ?? <LoongArkIcon icon={controlIcons.minus} size="sm" />}
    </ArkNumberInput.DecrementTrigger>
  );
};

export interface LoongArkNumberInputValueTextProps extends Omit<
  ArkNumberInputValueTextProps,
  "asChild"
> {
  size?: NumberInputSize;
  children?: JSX.Element;
}

export const LoongArkNumberInputValueText: Component<
  LoongArkNumberInputValueTextProps
> = (props) => {
  const merged = mergeProps({ size: "md" as NumberInputSize }, props);
  const [local, others] = splitProps(merged, ["children", "size"]);

  return (
    <ArkNumberInput.ValueText
      {...others}
      data-scope="number-input"
      data-part="value-text"
      data-size={local.size}
    >
      {local.children}
    </ArkNumberInput.ValueText>
  );
};

export interface LoongArkNumberInputScrubberProps extends Omit<
  ArkNumberInputScrubberProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkNumberInputScrubber: Component<
  LoongArkNumberInputScrubberProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);

  return (
    <ArkNumberInput.Scrubber
      {...others}
      data-scope="number-input"
      data-part="scrubber"
    >
      {local.children}
    </ArkNumberInput.Scrubber>
  );
};
