import type { SvelteComponent } from "svelte";
import type { NumberInputPrimitiveProps } from "@loongark/primitives";

export default class NumberInputValueText extends SvelteComponent<{
  size?: NonNullable<NumberInputPrimitiveProps["size"]>;
}> {}
