import { SvelteComponent, type ComponentProps } from "svelte";
import { Combobox } from "@ark-ui/svelte/combobox";

export default class LoongArkComboboxList extends SvelteComponent<
  Omit<ComponentProps<typeof Combobox.List>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
