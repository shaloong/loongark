import { SvelteComponent, type ComponentProps } from "svelte";
import { Combobox } from "@ark-ui/svelte/combobox";

export default class LoongArkComboboxContent extends SvelteComponent<
  Omit<ComponentProps<typeof Combobox.Content>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
