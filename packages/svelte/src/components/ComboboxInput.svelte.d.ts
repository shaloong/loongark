import { SvelteComponent, type ComponentProps } from "svelte";
import { Combobox } from "@ark-ui/svelte/combobox";

export default class LoongArkComboboxInput extends SvelteComponent<
  Omit<ComponentProps<typeof Combobox.Input>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
