import { SvelteComponent, type ComponentProps } from "svelte";
import { Listbox } from "@ark-ui/svelte/listbox";

export default class LoongArkListboxItemGroup extends SvelteComponent<
  Omit<ComponentProps<typeof Listbox.ItemGroup>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
