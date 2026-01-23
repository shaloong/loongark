import type { SvelteComponent } from "svelte";
import type { NumberInputPrimitiveProps } from "@loongark/primitives";

export default class NumberInputInput extends SvelteComponent<{
  size?: NonNullable<NumberInputPrimitiveProps["size"]>;
  state?: NonNullable<NumberInputPrimitiveProps["state"]>;
  disabled?: boolean;
  readOnly?: boolean;
}> {}
