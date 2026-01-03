import type { SvelteComponent } from "svelte";
import type { CheckboxSize } from "@loongark/primitives";

export interface CheckboxControlProps {
  size?: CheckboxSize;
}

declare class CheckboxControlComponent extends SvelteComponent<CheckboxControlProps> {}
export default CheckboxControlComponent;
