import type { SvelteComponent } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export default class InputSuffix extends SvelteComponent<
  HTMLAttributes<HTMLSpanElement> & {
    action?: "clear" | "button" | "none" | "text";
  }
> {}
