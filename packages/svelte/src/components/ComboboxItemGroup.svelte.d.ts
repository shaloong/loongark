import { SvelteComponent, type ComponentProps } from "svelte";
import { Combobox } from "@ark-ui/svelte/combobox";

export default class LoongArkComboboxItemGroup extends SvelteComponent<
  Omit<ComponentProps<typeof Combobox.ItemGroup>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
