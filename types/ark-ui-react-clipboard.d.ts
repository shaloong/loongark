declare module "@ark-ui/react/clipboard" {
  import React, { type ReactNode } from "react";

  type BaseProps = React.HTMLAttributes<HTMLElement> & {
    children?: ReactNode;
    asChild?: boolean;
  };

  export interface ClipboardRootProps extends BaseProps {}
  export interface ClipboardLabelProps extends BaseProps {}
  export interface ClipboardControlProps extends BaseProps {}
  export interface ClipboardInputProps extends BaseProps {}
  export interface ClipboardTriggerProps extends BaseProps {}
  export interface ClipboardIndicatorProps extends BaseProps {}
  export interface ClipboardValueTextProps extends BaseProps {}

  export namespace Clipboard {
    export const Root: React.FC<ClipboardRootProps>;
    export const Label: React.FC<ClipboardLabelProps>;
    export const Control: React.FC<ClipboardControlProps>;
    export const Input: React.FC<ClipboardInputProps>;
    export const Trigger: React.FC<ClipboardTriggerProps>;
    export const Indicator: React.FC<ClipboardIndicatorProps>;
    export const ValueText: React.FC<ClipboardValueTextProps>;
  }
}
