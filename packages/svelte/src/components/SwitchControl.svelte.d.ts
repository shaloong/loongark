import type { SvelteComponent } from "svelte";
import type { SwitchPrimitiveProps } from "@loongark/primitives";

export default class SwitchControl extends SvelteComponent<{
  size?: NonNullable<SwitchPrimitiveProps["size"]>;
  disabled?: boolean;
}> {}
