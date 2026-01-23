import type { SvelteComponent } from "svelte";
import type { NumberInputPrimitiveProps } from "@loongark/primitives";

export default class NumberInputIncrementTrigger extends SvelteComponent<{
  size?: NonNullable<NumberInputPrimitiveProps["size"]>;
  state?: NonNullable<NumberInputPrimitiveProps["state"]>;
  disabled?: boolean;
}> {}
