import { SvelteComponent, type ComponentProps } from "svelte";
import { Combobox } from "@ark-ui/svelte/combobox";

export default class LoongArkComboboxItemText extends SvelteComponent<
  Omit<ComponentProps<typeof Combobox.ItemText>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
