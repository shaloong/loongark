
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticSwitchStyles } from "@shaloong/loongark-primitives/automatic-styles/switch";
import { useFieldContext } from "@ark-ui/solid/field";
import { nativeSelectionFieldDescription } from "@shaloong/loongark-kit";
import { nativeSelectionRef } from "../native-selection";
import {
  useSwitchContext,
  type SwitchHiddenInputProps,
} from "@ark-ui/solid/switch";
import type { JSX } from "solid-js";
import { Switch as ArkSwitch } from "@ark-ui/solid/switch";
import { ark } from "@ark-ui/solid";
import type { SwitchPrimitiveProps } from "@shaloong/loongark-primitives";
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

const defaults: Required<Pick<LoongArkSwitchProps, "size">> = {
  size: "md",
};

export const LoongArkSwitchRoot: Component<LoongArkSwitchProps> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const merged = mergeProps(defaults, props);
  const [local, rest] = splitProps(merged, ["size"]);
  return ArkSwitch.Root(
    mergeProps(rest, {
      "data-scope": "switch",
      "data-part": "root",
      get "data-size"() {
        return local.size;
      },
      get "data-disabled"() {
        return boolAttr(merged.disabled);
      },
    }),
  );
}, lkAutomaticSwitchStyles);

export const LoongArkSwitchControl: Component<LoongArkSwitchProps> = /*#__PURE__*/ withAutomaticStyles((
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
}, lkAutomaticSwitchStyles);

export const LoongArkSwitchThumb: Component<
  Partial<SwitchPrimitiveProps> & Omit<JSX.HTMLAttributes<HTMLElement>, "ref">
> = /*#__PURE__*/ withAutomaticStyles((props) => {
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
}, lkAutomaticSwitchStyles);

export const LoongArkSwitchLabel: Component<{
  disabled?: boolean;
  children?: JSX.Element;
}> = /*#__PURE__*/ withAutomaticStyles((props) => {
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
}, lkAutomaticSwitchStyles);

export const LoongArkSwitchHiddenInput: Component<SwitchHiddenInputProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const field = useFieldContext();
  const api = useSwitchContext();
  const ref = nativeSelectionRef(() => ({ checked: api().checked }), props.ref);
  return ArkSwitch.HiddenInput(
    mergeProps(props, {
      ref,
      get "aria-describedby"() {
        return nativeSelectionFieldDescription(
          props["aria-describedby"],
          field?.(),
          api().getHiddenInputProps()["aria-invalid"],
        );
      },
    }),
  );
}, lkAutomaticSwitchStyles);
export const LoongArkSwitch = /*#__PURE__*/ withAutomaticStyles({
  Root: LoongArkSwitchRoot,
  Control: LoongArkSwitchControl,
  Thumb: LoongArkSwitchThumb,
  Label: LoongArkSwitchLabel,
  HiddenInput: LoongArkSwitchHiddenInput,
}, lkAutomaticSwitchStyles);
