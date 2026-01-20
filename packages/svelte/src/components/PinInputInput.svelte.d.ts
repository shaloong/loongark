import type { SvelteComponent } from "svelte";
import type { PinInputPrimitiveProps } from "@loongark/primitives";

export default class PinInputInput extends SvelteComponent<{
  index: number;
  size?: NonNullable<PinInputPrimitiveProps["size"]>;
  state?: NonNullable<PinInputPrimitiveProps["state"]>;
  autoCapitalize?: boolean;
}> {}
