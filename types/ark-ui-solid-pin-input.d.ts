declare module "@ark-ui/solid/pin-input" {
  import type { Component, JSX } from "solid-js";

  export interface RootProps {
    children?: JSX.Element;
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
  }

  export interface InputProps {
    index: number;
  }

  export interface ControlProps {
    children?: JSX.Element;
  }

  export interface LabelProps {
    children?: JSX.Element;
  }

  export interface HiddenInputProps {}

  export const PinInput: {
    Root: Component<RootProps>;
    Input: Component<InputProps>;
    Control: Component<ControlProps>;
    Label: Component<LabelProps>;
    HiddenInput: Component<HiddenInputProps>;
  };
}
