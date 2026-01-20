import { Switch as ArkSwitch } from "@ark-ui/react/switch";
import type { SwitchPrimitiveProps } from "@loongark/primitives";
import { forwardRef, createElement } from "react";
import type { ReactNode } from "react";

export type SwitchSize = NonNullable<SwitchPrimitiveProps["size"]>;

type ArkSwitchRootProps = {
  onCheckedChange?: (details: { checked: boolean }) => void;
};

export interface LoongArkSwitchProps extends Partial<SwitchPrimitiveProps> {
  children?: ReactNode;
  disabled?: boolean;
  onCheckedChange?: ArkSwitchRootProps["onCheckedChange"];
  [key: string]: unknown;
}

export const LoongArkSwitchRoot = forwardRef<
  HTMLLabelElement,
  LoongArkSwitchProps
>(({ children, size = "md", disabled = false, onCheckedChange, ...rest }, ref) =>
  createElement(
    ArkSwitch.Root,
    {
      ...rest,
      onCheckedChange,
      disabled,
      ref,
      "data-scope": "switch",
      "data-part": "root",
      "data-size": size,
      "data-disabled": disabled ? "true" : undefined,
    },
    children
  )
);

LoongArkSwitchRoot.displayName = "LoongArkSwitchRoot";

export const LoongArkSwitchControl = forwardRef<
  HTMLButtonElement,
  LoongArkSwitchProps
>(({ size = "md", disabled = false, ...rest }, ref) =>
  createElement(ArkSwitch.Control, {
    ...rest,
    disabled,
    ref,
    "data-scope": "switch",
    "data-part": "control",
    "data-size": size,
    "data-disabled": disabled ? "true" : undefined,
  })
);

LoongArkSwitchControl.displayName = "LoongArkSwitchControl";

export const LoongArkSwitchThumb = forwardRef<
  HTMLSpanElement,
  Partial<SwitchPrimitiveProps>
>(({ size = "md", ...rest }, ref) =>
  createElement(ArkSwitch.Thumb, {
    ...rest,
    ref,
    "data-scope": "switch",
    "data-part": "thumb",
    "data-size": size,
  })
);

LoongArkSwitchThumb.displayName = "LoongArkSwitchThumb";

export const LoongArkSwitchLabel = ({
  children,
  disabled,
  ...rest
}: {
  children?: ReactNode;
  disabled?: boolean;
  [key: string]: unknown;
}) =>
  createElement(
    ArkSwitch.Label,
    {
      ...rest,
      "data-scope": "switch",
      "data-part": "label",
      "data-disabled": disabled ? "true" : undefined,
    },
    children
  );

export const LoongArkSwitch = {
  Root: LoongArkSwitchRoot,
  Control: LoongArkSwitchControl,
  Thumb: LoongArkSwitchThumb,
  Label: LoongArkSwitchLabel,
  HiddenInput: ArkSwitch.HiddenInput,
};
