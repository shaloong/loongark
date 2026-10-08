import { SvelteComponent, type ComponentProps } from "svelte";
import { Listbox } from "@ark-ui/svelte/listbox";

export default class LoongArkListboxLabel extends SvelteComponent<
  Omit<ComponentProps<typeof Listbox.Label>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
