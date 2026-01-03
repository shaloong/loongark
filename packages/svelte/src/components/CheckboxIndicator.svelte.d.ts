import type { SvelteComponent } from "svelte";

export interface CheckboxIndicatorProps {
  indeterminate?: boolean;
}

declare class CheckboxIndicatorComponent extends SvelteComponent<CheckboxIndicatorProps> {}
export default CheckboxIndicatorComponent;
