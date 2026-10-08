import { SvelteComponent, type ComponentProps } from "svelte";
import { Listbox } from "@ark-ui/svelte/listbox";

export default class LoongArkListboxItemIndicator extends SvelteComponent<
  Omit<ComponentProps<typeof Listbox.ItemIndicator>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
