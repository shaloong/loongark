import { SvelteComponent, type ComponentProps } from "svelte";
import { Listbox } from "@ark-ui/svelte/listbox";

export default class LoongArkListboxList extends SvelteComponent<
  Omit<ComponentProps<typeof Listbox.Content>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
