import type { SvelteComponent } from "svelte";
import type { InputPrimitiveProps } from "@loongark/primitives";

export default class InputInput extends SvelteComponent<{
  size?: NonNullable<InputPrimitiveProps["size"]>;
  state?: NonNullable<InputPrimitiveProps["state"]>;
  multiline?: boolean;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
}> {}
