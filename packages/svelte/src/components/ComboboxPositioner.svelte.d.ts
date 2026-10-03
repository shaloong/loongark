import { SvelteComponent, type ComponentProps } from "svelte";
import { Combobox } from "@ark-ui/svelte/combobox";

export default class LoongArkComboboxPositioner extends SvelteComponent<
  Omit<ComponentProps<typeof Combobox.Positioner>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
