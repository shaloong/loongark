declare module "@ark-ui/solid/checkbox" {
  import type { JSX, Component } from "solid-js";

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
    children?: JSX.Element;
  }

  export namespace Checkbox {
    export const Root: Component<RootProps>;
    export const Control: Component<{ children?: JSX.Element }>;
    export const Label: Component<{ children?: JSX.Element }>;
    export const Indicator: Component<{
      indeterminate?: boolean;
      children?: JSX.Element;
    }>;
    export const HiddenInput: Component<any>;
  }
}
