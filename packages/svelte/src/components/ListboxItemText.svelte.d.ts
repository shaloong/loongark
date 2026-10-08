import { SvelteComponent, type ComponentProps } from "svelte";
import { Listbox } from "@ark-ui/svelte/listbox";

export default class LoongArkListboxItemText extends SvelteComponent<
  Omit<ComponentProps<typeof Listbox.ItemText>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
