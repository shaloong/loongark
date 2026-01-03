declare module "@ark-ui/react/checkbox" {
  import type {
    ReactNode,
    Ref,
    FC,
    ForwardRefExoticComponent,
    RefAttributes,
  } from "react";

  export type CheckedState = boolean | "indeterminate";

  export interface CheckedChangeDetails {
    checked: CheckedState;
  }

  export interface RootProps {
    checked?: CheckedState;
    defaultChecked?: CheckedState;
    disabled?: boolean;
    invalid?: boolean;
    readOnly?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    onCheckedChange?: (details: CheckedChangeDetails) => void;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ControlProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface LabelProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface IndicatorProps {
    indeterminate?: boolean;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface HiddenInputProps {
    asChild?: boolean;
  }

  export const Root: ForwardRefExoticComponent<
    RootProps & RefAttributes<HTMLLabelElement>
  >;
  export const Control: ForwardRefExoticComponent<
    ControlProps & RefAttributes<HTMLDivElement>
  >;
  export const Label: ForwardRefExoticComponent<
    LabelProps & RefAttributes<HTMLSpanElement>
  >;
  export const Indicator: ForwardRefExoticComponent<
    IndicatorProps & RefAttributes<HTMLDivElement>
  >;
  export const HiddenInput: ForwardRefExoticComponent<
    HiddenInputProps & RefAttributes<HTMLInputElement>
  >;

  export const Checkbox: {
    Root: typeof Root;
    Control: typeof Control;
    Label: typeof Label;
    Indicator: typeof Indicator;
    HiddenInput: typeof HiddenInput;
  };
}
