import { SvelteComponent, type ComponentProps } from "svelte";
import { Combobox } from "@ark-ui/svelte/combobox";

export default class LoongArkComboboxItemGroupLabel extends SvelteComponent<
  Omit<ComponentProps<typeof Combobox.ItemGroupLabel>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
