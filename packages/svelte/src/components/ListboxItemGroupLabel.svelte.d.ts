import { SvelteComponent, type ComponentProps } from "svelte";
import { Listbox } from "@ark-ui/svelte/listbox";

export default class LoongArkListboxItemGroupLabel extends SvelteComponent<
  Omit<ComponentProps<typeof Listbox.ItemGroupLabel>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
