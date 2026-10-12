"use client";
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticSwitchStyles } from "@loongark/primitives/automatic-styles/switch";


import { useFieldContext } from "@ark-ui/react/field";
import { nativeSelectionFieldDescription } from "@loongark/kit";
import type {
  HTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ButtonHTMLAttributes,
} from "react";
import { nativeSelectionProps } from "@loongark/kit";
import { dataProps } from "../data-props";
import { useNativeSelection } from "../native-selection";
import {
  useSwitchContext,
  type SwitchHiddenInputProps,
} from "@ark-ui/react/switch";
import { Switch as ArkSwitch } from "@ark-ui/react/switch";
import type { SwitchPrimitiveProps } from "@loongark/primitives";
import { forwardRef, createElement } from "react";
import type { ReactNode } from "react";

export type SwitchSize = NonNullable<SwitchPrimitiveProps["size"]>;

type ArkSwitchRootProps = {
  onCheckedChange?: (details: { checked: boolean }) => void;
};

export interface LoongArkSwitchProps
  extends Partial<SwitchPrimitiveProps>, HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  disabled?: boolean;
  name?: string;
  form?: string;
  value?: string;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: ArkSwitchRootProps["onCheckedChange"];
}

export const LoongArkSwitchRoot = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLLabelElement,
  LoongArkSwitchProps
>(({ children, size = "md", disabled, onCheckedChange, ...rest }, ref) =>
  createElement(
    ArkSwitch.Root,
    dataProps(
      nativeSelectionProps({
        ...rest,
        onCheckedChange,
        disabled,
        ref,
        "data-scope": "switch",
        "data-part": "root",
        "data-size": size,
        "data-disabled": disabled ? "true" : undefined,
      }),
    ),
    children,
  ),
), lkAutomaticSwitchStyles);

LoongArkSwitchRoot.displayName = "LoongArkSwitchRoot";

export const LoongArkSwitchControl = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLButtonElement,
  LoongArkSwitchProps
>(({ size = "md", disabled, ...rest }, ref) =>
  createElement(
    ArkSwitch.Control,
    dataProps({
      ...rest,
      disabled,
      ref,
      "data-scope": "switch",
      "data-part": "control",
      "data-size": size,
      "data-disabled": disabled ? "true" : undefined,
    }),
  ),
), lkAutomaticSwitchStyles);

LoongArkSwitchControl.displayName = "LoongArkSwitchControl";

export const LoongArkSwitchThumb = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLSpanElement,
  Partial<SwitchPrimitiveProps>
>(({ size = "md", ...rest }, ref) =>
  createElement(
    ArkSwitch.Thumb,
    dataProps({
      ...rest,
      ref,
      "data-scope": "switch",
      "data-part": "thumb",
      "data-size": size,
    }),
  ),
), lkAutomaticSwitchStyles);

LoongArkSwitchThumb.displayName = "LoongArkSwitchThumb";

export const LoongArkSwitchLabel = /*#__PURE__*/ withAutomaticStyles(({
  children,
  disabled,
  ...rest
}: {
  children?: ReactNode;
  disabled?: boolean;
}) =>
  createElement(
    ArkSwitch.Label,
    dataProps({
      ...rest,
      "data-scope": "switch",
      "data-part": "label",
      "data-disabled": disabled ? "true" : undefined,
    }),
    children,
  ), lkAutomaticSwitchStyles);

export const LoongArkSwitchHiddenInput = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLInputElement,
  SwitchHiddenInputProps
>((props, ref) => {
  const field = useFieldContext();
  const api = useSwitchContext();
  const input = useNativeSelection(api, "checkbox", ref);
  return createElement(ArkSwitch.HiddenInput, {
    ...props,
    ref: input,
    "aria-describedby": nativeSelectionFieldDescription(
      props["aria-describedby"],
      field,
      api.getHiddenInputProps()["aria-invalid"],
    ),
  });
}), lkAutomaticSwitchStyles);
LoongArkSwitchHiddenInput.displayName = "LoongArkSwitchHiddenInput";

export const LoongArkSwitch = /*#__PURE__*/ withAutomaticStyles({
  Root: LoongArkSwitchRoot,
  Control: LoongArkSwitchControl,
  Thumb: LoongArkSwitchThumb,
  Label: LoongArkSwitchLabel,
  HiddenInput: LoongArkSwitchHiddenInput,
}, lkAutomaticSwitchStyles);
