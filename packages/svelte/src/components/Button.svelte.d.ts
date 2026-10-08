import type { SvelteComponent } from "svelte";
import type { ButtonPrimitiveProps } from "@loongark/primitives";
import type { HTMLButtonAttributes } from "svelte/elements";

export default class Button extends SvelteComponent<
  HTMLButtonAttributes & {
    variant?: NonNullable<ButtonPrimitiveProps["variant"]>;
    size?: NonNullable<ButtonPrimitiveProps["size"]>;
    block?: boolean;
    loading?: boolean;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
  },
  { click: MouseEvent },
  { default: Record<string, never> }
> {}
