import { SvelteComponent, type ComponentProps } from "svelte";
import { Combobox } from "@ark-ui/svelte/combobox";

export default class LoongArkComboboxItemIndicator extends SvelteComponent<
  Omit<ComponentProps<typeof Combobox.ItemIndicator>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
