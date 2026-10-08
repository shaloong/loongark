import type { SvelteComponent } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export default class InputSuffix extends SvelteComponent<
  HTMLAttributes<HTMLSpanElement> & {
    disabled?: boolean;
    action?: "clear" | "button" | "none" | "text";
  }
> {}
