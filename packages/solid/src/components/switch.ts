import { nativeSelectionRef } from "../native-selection";
import {
  useSwitchContext,
  type SwitchHiddenInputProps,
} from "@ark-ui/solid/switch";
import type { JSX } from "solid-js";
import { Switch as ArkSwitch } from "@ark-ui/solid/switch";
import { ark } from "@ark-ui/solid";
import type { SwitchPrimitiveProps } from "@loongark/primitives";
import { mergeProps, splitProps, type Component } from "solid-js";
import { boolAttr } from "../utils";

export type SwitchSize = NonNullable<SwitchPrimitiveProps["size"]>;

export interface LoongArkSwitchProps
  extends
    Partial<SwitchPrimitiveProps>,
    Omit<JSX.HTMLAttributes<HTMLElement>, "ref"> {
  children?: JSX.Element;
  disabled?: boolean;
  name?: string;
  form?: string;
  value?: string;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (details: { checked: boolean }) => void;
}

const defaults: Required<Pick<LoongArkSwitchProps, "size" | "disabled">> = {
  size: "md",
  disabled: false,
};

export const LoongArkSwitchRoot: Component<LoongArkSwitchProps> = (props) => {
  const merged = mergeProps(defaults, props);
  const [local, rest] = splitProps(merged, ["size", "disabled"]);
  return ArkSwitch.Root(
    mergeProps(rest, {
      get disabled() {
        return local.disabled;
      },
      "data-scope": "switch",
      "data-part": "root",
      get "data-size"() {
        return local.size;
      },
      get "data-disabled"() {
        return boolAttr(local.disabled);
      },
    }),
  );
};

export const LoongArkSwitchControl: Component<LoongArkSwitchProps> = (
  props,
) => {
  const merged = mergeProps(defaults, props);
  const [local, rest] = splitProps(merged, ["size", "disabled"]);
  return ArkSwitch.Control(
    mergeProps(rest, {
      get disabled() {
        return local.disabled;
      },
      "data-scope": "switch",
      "data-part": "control",
      get "data-size"() {
        return local.size;
      },
      get "data-disabled"() {
        return boolAttr(local.disabled);
      },
    }),
  );
};

export const LoongArkSwitchThumb: Component<
  Partial<SwitchPrimitiveProps> & Omit<JSX.HTMLAttributes<HTMLElement>, "ref">
> = (props) => {
  const merged = mergeProps({ size: "md" as SwitchSize }, props);
  const [local, rest] = splitProps(merged, ["size"]);
  return ArkSwitch.Thumb(
    mergeProps(rest, {
      "data-scope": "switch",
      "data-part": "thumb",
      get "data-size"() {
        return local.size;
      },
    }),
  );
};

export const LoongArkSwitchLabel: Component<{
  disabled?: boolean;
  children?: JSX.Element;
}> = (props) => {
  const merged = mergeProps({ disabled: false }, props);
  const [local, rest] = splitProps(merged, ["disabled"]);
  return ArkSwitch.Label(
    mergeProps(rest, {
      "data-scope": "switch",
      "data-part": "label",
      get "data-disabled"() {
        return boolAttr(local.disabled);
      },
    }),
  );
};

export const LoongArkSwitchHiddenInput: Component<SwitchHiddenInputProps> = (
  props,
) => {
  const api = useSwitchContext();
  const ref = nativeSelectionRef(() => ({ checked: api().checked }), props.ref);
  return ArkSwitch.HiddenInput(mergeProps(props, { ref }));
};
export const LoongArkSwitch = {
  Root: LoongArkSwitchRoot,
  Control: LoongArkSwitchControl,
  Thumb: LoongArkSwitchThumb,
  Label: LoongArkSwitchLabel,
  HiddenInput: LoongArkSwitchHiddenInput,
};
