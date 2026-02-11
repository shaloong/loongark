declare module "@ark-ui/solid/password-input" {
  import type { Component, JSX } from "solid-js";

  export interface PasswordInputRootProps {
    value?: string;
    defaultValue?: string;
    visible?: boolean;
    defaultVisible?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    invalid?: boolean;
    name?: string;
    form?: string;
    id?: string;
    ids?: any;
    onVisibilityChange?: (details: { visible: boolean }) => void;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface PasswordInputLabelProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface PasswordInputControlProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface PasswordInputInputProps {
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    readOnly?: boolean;
    placeholder?: string;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface PasswordInputIndicatorProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface PasswordInputVisibilityTriggerProps {
    disabled?: boolean;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export const PasswordInput: {
    Root: Component<PasswordInputRootProps>;
    Label: Component<PasswordInputLabelProps>;
    Control: Component<PasswordInputControlProps>;
    Input: Component<PasswordInputInputProps>;
    Indicator: Component<PasswordInputIndicatorProps>;
    VisibilityTrigger: Component<PasswordInputVisibilityTriggerProps>;
  };
}
