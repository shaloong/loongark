import type { SvelteComponent } from "svelte";

export default class FilterChip extends SvelteComponent<{
  active?: boolean;
  type?: "button" | "submit" | "reset";
}> {}
