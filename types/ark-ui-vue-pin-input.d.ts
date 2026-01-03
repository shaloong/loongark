declare module "@ark-ui/vue/pin-input" {
  import type { DefineComponent } from "vue";

  export interface RootProps {
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

  export interface ControlProps {}
  export interface LabelProps {}
  export interface HiddenInputProps {}

  export const PinInput: {
    Root: DefineComponent<RootProps>;
    Input: DefineComponent<InputProps>;
    Control: DefineComponent<ControlProps>;
    Label: DefineComponent<LabelProps>;
    HiddenInput: DefineComponent<HiddenInputProps>;
  };
}
