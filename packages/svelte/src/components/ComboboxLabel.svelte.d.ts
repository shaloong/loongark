import { SvelteComponent, type ComponentProps } from "svelte";
import { Combobox } from "@ark-ui/svelte/combobox";

export default class LoongArkComboboxLabel extends SvelteComponent<
  Omit<ComponentProps<typeof Combobox.Label>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
