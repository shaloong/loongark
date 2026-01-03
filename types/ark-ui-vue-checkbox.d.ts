declare module "@ark-ui/vue/checkbox" {
  import type { Component } from "vue";

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
  }

  export const CheckboxRoot: Component<RootProps>;
  export const CheckboxControl: Component<any>;
  export const CheckboxLabel: Component<any>;
  export const CheckboxIndicator: Component<{ indeterminate?: boolean }>;
  export const CheckboxHiddenInput: Component<any>;
}
