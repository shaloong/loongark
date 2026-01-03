import { Switch as ArkSwitch } from "@ark-ui/solid/switch";
import { ark } from "@ark-ui/solid";
import type { SwitchPrimitiveProps } from "@loongark/primitives";
import { mergeProps, type Component } from "solid-js";
import { boolAttr } from "../utils";

export type SwitchSize = NonNullable<SwitchPrimitiveProps["size"]>;

export interface LoongArkSwitchProps extends Partial<SwitchPrimitiveProps> {
  children?: unknown;
  disabled?: boolean;
  [key: string]: unknown;
}

const defaults: Required<Pick<LoongArkSwitchProps, "size" | "disabled">> = {
  size: "md",
  disabled: false,
};

export const LoongArkSwitchRoot: Component<LoongArkSwitchProps> = (props) => {
  const merged = mergeProps(defaults, props);
  const { size, disabled, children, ...rest } = merged;
  return ArkSwitch.Root({
    ...rest,
    children,
    "data-lk-switch": "",
    "data-size": size,
    "data-disabled": boolAttr(disabled),
  });
};

export const LoongArkSwitchControl: Component<LoongArkSwitchProps> = (
  props
) => {
  const merged = mergeProps(defaults, props);
  const { size, disabled, ...rest } = merged;
  return ArkSwitch.Control({
    ...rest,
    "data-lk-switch-control": "",
    "data-size": size,
    "data-disabled": boolAttr(disabled),
  });
};

export const LoongArkSwitchThumb: Component<Partial<SwitchPrimitiveProps>> = (
  props
) => {
  const merged = mergeProps({ size: "md" as SwitchSize }, props);
  const { size, ...rest } = merged;
  return ArkSwitch.Thumb({
    ...rest,
    "data-lk-switch-thumb": "",
    "data-size": size,
  });
};

export const LoongArkSwitchLabel: Component<{
  disabled?: boolean;
  children?: unknown;
  [k: string]: unknown;
}> = (props) => {
  const merged = mergeProps({ disabled: false }, props);
  const { disabled, children, ...rest } = merged;
  return ArkSwitch.Label({
    ...rest,
    children,
    "data-lk-switch-label": "",
    "data-disabled": boolAttr(disabled),
  });
};

export const LoongArkSwitch = {
  Root: LoongArkSwitchRoot,
  Control: LoongArkSwitchControl,
  Thumb: LoongArkSwitchThumb,
  Label: LoongArkSwitchLabel,
  HiddenInput: ArkSwitch.HiddenInput,
};
