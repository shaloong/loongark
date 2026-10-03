import type { SvelteComponent } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export default class InputHelperText extends SvelteComponent<
  HTMLAttributes<HTMLSpanElement> & {
    variant?: "default" | "error" | "success";
  }
> {}
