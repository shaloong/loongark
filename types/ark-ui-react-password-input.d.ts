declare module "@ark-ui/react/password-input" {
  import React, { type ReactNode } from "react";

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
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface PasswordInputLabelProps {
    ref?: React.Ref<HTMLLabelElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface PasswordInputControlProps
    extends React.HTMLAttributes<HTMLDivElement> {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface PasswordInputInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    ref?: React.Ref<HTMLInputElement>;
    asChild?: boolean;
  }

  export interface PasswordInputIndicatorProps
    extends React.HTMLAttributes<HTMLSpanElement> {
    ref?: React.Ref<HTMLSpanElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface PasswordInputVisibilityTriggerProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: React.Ref<HTMLButtonElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export namespace PasswordInput {
    export const Root: React.FC<PasswordInputRootProps>;
    export const Label: React.FC<PasswordInputLabelProps>;
    export const Control: React.FC<PasswordInputControlProps>;
    export const Input: React.FC<PasswordInputInputProps>;
    export const Indicator: React.FC<PasswordInputIndicatorProps>;
    export const VisibilityTrigger: React.FC<PasswordInputVisibilityTriggerProps>;
  }
}
