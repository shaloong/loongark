import { SvelteComponent } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import type { FloatingActionButtonOptions } from "@shaloong/loongark-kit";
export default class FloatingActionButton extends SvelteComponent<
  HTMLButtonAttributes & FloatingActionButtonOptions
> {}
