declare module "@ark-ui/react/pin-input" {
  import type { ComponentPropsWithoutRef, ReactNode } from "react";

  export interface RootProps extends ComponentPropsWithoutRef<"div"> {
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (details: {
      value: string[];
      valueAsString: string;
    }) => void;
    onValueComplete?: (details: {
      value: string[];
      valueAsString: string;
    }) => void;
    type?: "alphanumeric" | "numeric" | "alphabetic";
    mask?: boolean;
    otp?: boolean;
    placeholder?: string;
    disabled?: boolean;
    autoFocus?: boolean;
    selectOnFocus?: boolean;
    blurOnComplete?: boolean;
    children?: ReactNode;
  }

  export interface InputProps extends ComponentPropsWithoutRef<"input"> {
    index: number;
  }

  export interface ControlProps extends ComponentPropsWithoutRef<"div"> {}
  export interface LabelProps extends ComponentPropsWithoutRef<"label"> {}
  export interface HiddenInputProps extends ComponentPropsWithoutRef<"input"> {}

  export namespace PinInput {
    export const Root: React.ForwardRefExoticComponent<RootProps>;
    export const Input: React.ForwardRefExoticComponent<InputProps>;
    export const Control: React.ForwardRefExoticComponent<ControlProps>;
    export const Label: React.ForwardRefExoticComponent<LabelProps>;
    export const HiddenInput: React.ForwardRefExoticComponent<HiddenInputProps>;
  }

  export const Root: React.ForwardRefExoticComponent<RootProps>;
  export const Input: React.ForwardRefExoticComponent<InputProps>;
  export const Control: React.ForwardRefExoticComponent<ControlProps>;
  export const Label: React.ForwardRefExoticComponent<LabelProps>;
  export const HiddenInput: React.ForwardRefExoticComponent<HiddenInputProps>;
}
