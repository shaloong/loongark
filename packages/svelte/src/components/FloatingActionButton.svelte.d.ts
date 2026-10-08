import { SvelteComponent } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import type { FloatingActionButtonOptions } from "@loongark/kit";
export default class FloatingActionButton extends SvelteComponent<
  HTMLButtonAttributes & FloatingActionButtonOptions
> {}
