declare module "@ark-ui/solid/number-input" {
  import type { Component, JSX } from "solid-js";

  export interface NumberInputRootProps {
    value?: string;
    defaultValue?: string;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    invalid?: boolean;
    name?: string;
    form?: string;
    id?: string;
    ids?: any;
    inputMode?: "text" | "tel" | "numeric" | "decimal";
    locale?: string;
    formatOptions?: any;
    allowMouseWheel?: boolean;
    allowOverflow?: boolean;
    clampValueOnBlur?: boolean;
    focusInputOnChange?: boolean;
    spinOnPress?: boolean;
    onValueChange?: (details: { value: string; valueAsNumber?: number }) => void;
    onValueInvalid?: (details: any) => void;
    onFocusChange?: (details: any) => void;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface NumberInputLabelProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface NumberInputControlProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface NumberInputInputProps
    extends JSX.HTMLAttributes<HTMLInputElement> {
    asChild?: boolean;
  }

  export interface NumberInputIncrementTriggerProps
    extends JSX.HTMLAttributes<HTMLButtonElement> {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface NumberInputDecrementTriggerProps
    extends JSX.HTMLAttributes<HTMLButtonElement> {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface NumberInputValueTextProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface NumberInputScrubberProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export const NumberInput: {
    Root: Component<NumberInputRootProps>;
    Label: Component<NumberInputLabelProps>;
    Control: Component<NumberInputControlProps>;
    Input: Component<NumberInputInputProps>;
    IncrementTrigger: Component<NumberInputIncrementTriggerProps>;
    DecrementTrigger: Component<NumberInputDecrementTriggerProps>;
    ValueText: Component<NumberInputValueTextProps>;
    Scrubber: Component<NumberInputScrubberProps>;
  };
}
