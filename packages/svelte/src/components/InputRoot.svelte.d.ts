import type { SvelteComponent } from "svelte";
import type { InputPrimitiveProps } from "@loongark/primitives";

export default class InputRoot extends SvelteComponent<{
  size?: NonNullable<InputPrimitiveProps["size"]>;
  state?: NonNullable<InputPrimitiveProps["state"]>;
  disabled?: boolean;
  readOnly?: boolean;
  multiline?: boolean;
  variant?: "default" | "floating";
  hasValue?: boolean;
}> {}
