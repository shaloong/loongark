import type { SvelteComponent } from "svelte";

export default class FilterBar extends SvelteComponent<{
  dense?: boolean;
  align?: "start" | "center";
}> {}
