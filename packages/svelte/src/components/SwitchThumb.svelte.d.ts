import type { SvelteComponent } from "svelte";
import type { SwitchPrimitiveProps } from "@loongark/primitives";

export default class SwitchThumb extends SvelteComponent<{
  size?: NonNullable<SwitchPrimitiveProps["size"]>;
}> {}
