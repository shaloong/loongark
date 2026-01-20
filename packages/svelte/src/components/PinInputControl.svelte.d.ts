import type { SvelteComponent } from "svelte";
import type { PinInputPrimitiveProps } from "@loongark/primitives";

export default class PinInputControl extends SvelteComponent<{
  size?: NonNullable<PinInputPrimitiveProps["size"]>;
}> {}
