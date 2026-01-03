import type { SvelteComponent } from "svelte";
import type { CheckboxSize } from "@loongark/primitives";
import type { CheckedState } from "@ark-ui/svelte/checkbox";

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

declare class CheckboxRootComponent extends SvelteComponent<CheckboxRootProps> {}
export default CheckboxRootComponent;
