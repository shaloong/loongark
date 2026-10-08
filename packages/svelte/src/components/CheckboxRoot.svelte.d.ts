import { SvelteComponent, type ComponentProps } from "svelte";
import { CheckboxRoot } from "@ark-ui/svelte/checkbox";
import type { CheckboxSize } from "@loongark/primitives";
type CheckedState = boolean | "indeterminate";
export interface CheckboxRootProps {
  size?: CheckboxSize;
  checked?: CheckedState;
  defaultChecked?: CheckedState;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  onCheckedChange?: (details: { checked: CheckedState }) => void;
}
export interface CheckboxControlProps {
  size?: CheckboxSize;
}
export interface CheckboxIndicatorProps {
  indeterminate?: boolean;
}
type $$Props = CheckboxRootProps;
export default class LoongArkCheckboxRoot extends SvelteComponent<
  Omit<
    ComponentProps<typeof CheckboxRoot>,
    | "children"
    | "size"
    | "checked"
    | "defaultChecked"
    | "disabled"
    | "invalid"
    | "readOnly"
    | "required"
    | "name"
    | "value"
    | "onCheckedChange"
  > & {
    size?: CheckboxSize;
    checked?: CheckedState | undefined;
    defaultChecked?: CheckedState | undefined;
    disabled?: boolean;
    invalid?: boolean;
    readOnly?: boolean;
    required?: boolean;
    name?: string | undefined;
    value?: string | undefined;
    onCheckedChange?:
      ((details: { checked: CheckedState }) => void) | undefined;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
