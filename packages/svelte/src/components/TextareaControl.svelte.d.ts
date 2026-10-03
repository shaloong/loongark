import type { SvelteComponent } from "svelte";
import type { InputPrimitiveProps } from "@loongark/primitives";

export default class TextareaControl extends SvelteComponent<{
  size?: NonNullable<InputPrimitiveProps["size"]>;
  state?: NonNullable<InputPrimitiveProps["state"]>;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
}> {}
