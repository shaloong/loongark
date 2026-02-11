declare module "@ark-ui/solid/clipboard" {
  import type { Component, JSX } from "solid-js";

  type BaseProps = {
    children?: JSX.Element;
    asChild?: boolean;
    [key: string]: any;
  };

  export interface ClipboardRootProps extends BaseProps {}
  export interface ClipboardLabelProps extends BaseProps {}
  export interface ClipboardControlProps extends BaseProps {}
  export interface ClipboardInputProps extends BaseProps {}
  export interface ClipboardTriggerProps extends BaseProps {}
  export interface ClipboardIndicatorProps extends BaseProps {}
  export interface ClipboardValueTextProps extends BaseProps {}

  export namespace Clipboard {
    export const Root: Component<ClipboardRootProps>;
    export const Label: Component<ClipboardLabelProps>;
    export const Control: Component<ClipboardControlProps>;
    export const Input: Component<ClipboardInputProps>;
    export const Trigger: Component<ClipboardTriggerProps>;
    export const Indicator: Component<ClipboardIndicatorProps>;
    export const ValueText: Component<ClipboardValueTextProps>;
  }
}
