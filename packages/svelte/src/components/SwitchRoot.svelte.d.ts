import type { SvelteComponent } from "svelte";
import type { SwitchPrimitiveProps } from "@loongark/primitives";

export default class SwitchRoot extends SvelteComponent<{
  size?: NonNullable<SwitchPrimitiveProps["size"]>;
  disabled?: boolean;
  checked?: boolean;
  onCheckedChange?: (details: { checked: boolean }) => void;
}> {}
