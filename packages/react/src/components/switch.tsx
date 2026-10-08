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

export const LoongArkSwitchRoot = forwardRef<
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
);

LoongArkSwitchRoot.displayName = "LoongArkSwitchRoot";

export const LoongArkSwitchControl = forwardRef<
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
);

LoongArkSwitchControl.displayName = "LoongArkSwitchControl";

export const LoongArkSwitchThumb = forwardRef<
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
);

LoongArkSwitchThumb.displayName = "LoongArkSwitchThumb";

export const LoongArkSwitchLabel = ({
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
  );

export const LoongArkSwitchHiddenInput = forwardRef<
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
});
LoongArkSwitchHiddenInput.displayName = "LoongArkSwitchHiddenInput";

export const LoongArkSwitch = {
  Root: LoongArkSwitchRoot,
  Control: LoongArkSwitchControl,
  Thumb: LoongArkSwitchThumb,
  Label: LoongArkSwitchLabel,
  HiddenInput: LoongArkSwitchHiddenInput,
};
