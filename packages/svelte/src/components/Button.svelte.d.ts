import type { SvelteComponent } from "svelte";
import type { ButtonPrimitiveProps } from "@loongark/primitives";

export default class Button extends SvelteComponent<{
  variant?: NonNullable<ButtonPrimitiveProps["variant"]>;
  size?: NonNullable<ButtonPrimitiveProps["size"]>;
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}> {}
