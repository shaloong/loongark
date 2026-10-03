import type {
  HTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ButtonHTMLAttributes,
} from "react";
import { dataProps } from "../data-props";
import { PinInput } from "@ark-ui/react/pin-input";
import type { PinInputPrimitiveProps } from "@loongark/primitives";
import { createElement, forwardRef } from "react";
import type { ReactNode } from "react";

export type PinInputSize = NonNullable<PinInputPrimitiveProps["size"]>;
export type PinInputState = NonNullable<PinInputPrimitiveProps["state"]>;

export interface LoongArkPinInputRootProps
  extends Partial<PinInputPrimitiveProps>, HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (details: { value: string[]; valueAsString: string }) => void;
  onValueComplete?: (details: {
    value: string[];
    valueAsString: string;
  }) => void;
  type?: "alphanumeric" | "numeric" | "alphabetic";
  mask?: boolean;
  otp?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  selectOnFocus?: boolean;
  blurOnComplete?: boolean;
  autoCapitalize?: string;
}

export const LoongArkPinInputRoot = forwardRef<
  HTMLDivElement,
  LoongArkPinInputRootProps
>(
  (
    {
      children,
      size = "md",
      state = "default",
      disabled = false,
      autoCapitalize,
      ...rest
    },
    ref,
  ) =>
    createElement(
      PinInput.Root,
      dataProps({
        ...rest,
        ref,
        disabled,
        // 避免 boolean 透传到 DOM，Ark 内部若使用会自行消费，其余场景忽略
        autoCapitalize: autoCapitalize ? "characters" : undefined,
        "data-scope": "pin-input",
        "data-part": "root",
        "data-size": size,
        "data-state": state !== "default" ? state : undefined,
        "data-disabled": disabled ? "true" : undefined,
      }),
      children,
    ),
);

LoongArkPinInputRoot.displayName = "LoongArkPinInputRoot";

export interface LoongArkPinInputControlProps extends Partial<PinInputPrimitiveProps> {
  children?: ReactNode;
}

export const LoongArkPinInputControl = forwardRef<
  HTMLDivElement,
  LoongArkPinInputControlProps
>(({ children, size = "md", ...rest }, ref) =>
  createElement(
    PinInput.Control,
    dataProps({
      ...rest,
      ref,
      "data-scope": "pin-input",
      "data-part": "control",
      "data-size": size,
    }),
    children,
  ),
);

LoongArkPinInputControl.displayName = "LoongArkPinInputControl";

export interface LoongArkPinInputInputProps extends Partial<PinInputPrimitiveProps> {
  index: number;
  autoCapitalize?: boolean;
}

export const LoongArkPinInputInput = forwardRef<
  HTMLInputElement,
  LoongArkPinInputInputProps
>(
  (
    { size = "md", state = "default", index, autoCapitalize = false, ...rest },
    ref,
  ) =>
    createElement(
      PinInput.Input,
      dataProps({
        ...rest,
        ref,
        index,
        autoCapitalize: autoCapitalize ? "characters" : undefined,
        style: autoCapitalize ? { textTransform: "uppercase" } : undefined,
        "data-scope": "pin-input",
        "data-part": "input",
        "data-size": size,
        "data-state": state !== "default" ? state : undefined,
      }),
    ),
);

LoongArkPinInputInput.displayName = "LoongArkPinInputInput";

export interface LoongArkPinInputLabelProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

export const LoongArkPinInputLabel = ({
  children,
  ...rest
}: LoongArkPinInputLabelProps) =>
  createElement(
    PinInput.Label,
    dataProps({
      ...rest,
      "data-scope": "pin-input",
      "data-part": "label",
    }),
    children,
  );

export const LoongArkPinInputHiddenInput: React.ComponentType<
  React.ComponentPropsWithoutRef<typeof PinInput.HiddenInput>
> = PinInput.HiddenInput;

export const LoongArkPinInput: {
  Root: typeof LoongArkPinInputRoot;
  Control: typeof LoongArkPinInputControl;
  Input: typeof LoongArkPinInputInput;
  Label: typeof LoongArkPinInputLabel;
  HiddenInput: typeof LoongArkPinInputHiddenInput;
} = {
  Root: LoongArkPinInputRoot,
  Control: LoongArkPinInputControl,
  Input: LoongArkPinInputInput,
  Label: LoongArkPinInputLabel,
  HiddenInput: LoongArkPinInputHiddenInput,
};
