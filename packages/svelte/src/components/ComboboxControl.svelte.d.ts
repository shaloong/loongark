import { SvelteComponent, type ComponentProps } from "svelte";
import { Combobox } from "@ark-ui/svelte/combobox";

export default class LoongArkComboboxControl extends SvelteComponent<
  Omit<ComponentProps<typeof Combobox.Control>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
