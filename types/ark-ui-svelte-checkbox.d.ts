declare module "@ark-ui/svelte/checkbox" {
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

  export const createCheckbox: (props: RootProps) => any;
  export const CheckboxRoot: any;
  export const CheckboxControl: any;
  export const CheckboxLabel: any;
  export const CheckboxIndicator: any;
  export const CheckboxHiddenInput: any;
}
