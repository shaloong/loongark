declare module "@ark-ui/react/number-input" {
  import React, { type ReactNode } from "react";

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
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface NumberInputLabelProps {
    ref?: React.Ref<HTMLLabelElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface NumberInputControlProps {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface NumberInputInputProps
    extends React.HTMLAttributes<HTMLInputElement> {
    ref?: React.Ref<HTMLInputElement>;
    asChild?: boolean;
  }

  export interface NumberInputIncrementTriggerProps
    extends React.HTMLAttributes<HTMLButtonElement> {
    ref?: React.Ref<HTMLButtonElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface NumberInputDecrementTriggerProps
    extends React.HTMLAttributes<HTMLButtonElement> {
    ref?: React.Ref<HTMLButtonElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface NumberInputValueTextProps {
    ref?: React.Ref<HTMLSpanElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface NumberInputScrubberProps {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export namespace NumberInput {
    export const Root: React.FC<NumberInputRootProps>;
    export const Label: React.FC<NumberInputLabelProps>;
    export const Control: React.FC<NumberInputControlProps>;
    export const Input: React.FC<NumberInputInputProps>;
    export const IncrementTrigger: React.FC<NumberInputIncrementTriggerProps>;
    export const DecrementTrigger: React.FC<NumberInputDecrementTriggerProps>;
    export const ValueText: React.FC<NumberInputValueTextProps>;
    export const Scrubber: React.FC<NumberInputScrubberProps>;
  }
}
