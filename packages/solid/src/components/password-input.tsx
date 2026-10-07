import { useFieldContext } from "@ark-ui/solid/field";
import { usePasswordInputContext } from "@ark-ui/solid/password-input";
import {
  nativeSelectionProps,
  nativeSelectionFieldDescription,
} from "@loongark/kit";
/**
 * Password Input component - Solid wrapper.
 * Uses Ark UI Password Input with data attributes for styling.
 */
import { type Component, type JSX, mergeProps, splitProps } from "solid-js";
import {
  PasswordInput as ArkPasswordInput,
  type PasswordInputRootProps as ArkPasswordInputRootProps,
  type PasswordInputLabelProps as ArkPasswordInputLabelProps,
  type PasswordInputControlProps as ArkPasswordInputControlProps,
  type PasswordInputInputProps as ArkPasswordInputInputProps,
  type PasswordInputIndicatorProps as ArkPasswordInputIndicatorProps,
  type PasswordInputVisibilityTriggerProps as ArkPasswordInputVisibilityTriggerProps,
} from "@ark-ui/solid/password-input";
import type {
  PasswordInputSize,
  PasswordInputState,
} from "@loongark/primitives";

export interface LoongArkPasswordInputRootProps extends Omit<
  ArkPasswordInputRootProps,
  "asChild"
> {
  size?: PasswordInputSize;
  state?: PasswordInputState;
  disabled?: boolean;
  readOnly?: boolean;
  children?: JSX.Element;
}

export const LoongArkPasswordInputRoot: Component<
  LoongArkPasswordInputRootProps
> = (props) => {
  const merged = mergeProps(
    {
      size: "md" as PasswordInputSize,
      state: "default" as PasswordInputState,
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
    <ArkPasswordInput.Root
      {...others}
      {...nativeSelectionProps({
        disabled: local.disabled,
        readOnly: local.readOnly,
        "data-disabled":
          local.disabled === undefined ? undefined : String(local.disabled),
        "data-readonly":
          local.readOnly === undefined ? undefined : String(local.readOnly),
      })}

      data-scope="password-input"
      data-part="root"
      data-size={local.size}
      data-state={local.state !== "default" ? local.state : undefined}
    >
      {local.children}
    </ArkPasswordInput.Root>
  );
};

export interface LoongArkPasswordInputLabelProps extends Omit<
  ArkPasswordInputLabelProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkPasswordInputLabel: Component<
  LoongArkPasswordInputLabelProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkPasswordInput.Label
      {...others}
      data-scope="password-input"
      data-part="label"
    >
      {local.children}
    </ArkPasswordInput.Label>
  );
};

export interface LoongArkPasswordInputControlProps extends Omit<
  ArkPasswordInputControlProps,
  "asChild"
> {
  size?: PasswordInputSize;
  state?: PasswordInputState;
  disabled?: boolean;
  children?: JSX.Element;
}

export const LoongArkPasswordInputControl: Component<
  LoongArkPasswordInputControlProps
> = (props) => {
  const merged = mergeProps(
    {
      size: "md" as PasswordInputSize,
      state: "default" as PasswordInputState,
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
    <ArkPasswordInput.Control
      {...others}
      data-scope="password-input"
      data-part="control"
      data-size={local.size}
      data-state={local.state !== "default" ? local.state : undefined}
      {...nativeSelectionProps({
        "data-disabled":
          local.disabled === undefined ? undefined : String(local.disabled),
      })}
    >
      {local.children}
    </ArkPasswordInput.Control>
  );
};

export interface LoongArkPasswordInputInputProps extends Omit<
  ArkPasswordInputInputProps,
  "asChild"
> {
  size?: PasswordInputSize;
  state?: PasswordInputState;
  disabled?: boolean;
  readOnly?: boolean;
}

export const LoongArkPasswordInputInput: Component<
  LoongArkPasswordInputInputProps
> = (props) => {
  const field = useFieldContext();
  const api = usePasswordInputContext();
  const merged = mergeProps(
    {
      size: "md" as PasswordInputSize,
      state: "default" as PasswordInputState,
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
    <ArkPasswordInput.Input
      {...others}
      {...nativeSelectionProps({
        disabled: local.disabled,
        "data-disabled":
          local.disabled === undefined ? undefined : String(local.disabled),
        "data-readonly":
          local.readOnly === undefined ? undefined : String(local.readOnly),
      })}

      data-scope="password-input"
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

export interface LoongArkPasswordInputIndicatorProps extends Omit<
  ArkPasswordInputIndicatorProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkPasswordInputIndicator: Component<
  LoongArkPasswordInputIndicatorProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkPasswordInput.Indicator
      {...others}
      data-scope="password-input"
      data-part="indicator"
    >
      {local.children}
    </ArkPasswordInput.Indicator>
  );
};

export interface LoongArkPasswordInputVisibilityTriggerProps extends Omit<
  ArkPasswordInputVisibilityTriggerProps,
  "asChild"
> {
  disabled?: boolean;
  children?: JSX.Element;
}

export const LoongArkPasswordInputVisibilityTrigger: Component<
  LoongArkPasswordInputVisibilityTriggerProps
> = (props) => {
  const [local, others] = splitProps(props, ["children", "disabled"]);
  return (
    <ArkPasswordInput.VisibilityTrigger
      {...others}
      {...nativeSelectionProps({
        disabled: local.disabled,
        "data-disabled":
          local.disabled === undefined ? undefined : String(local.disabled),
      })}
      data-scope="password-input"
      data-part="visibility-trigger"
    >
      {local.children}
    </ArkPasswordInput.VisibilityTrigger>
  );
};
