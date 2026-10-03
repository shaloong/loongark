import { SvelteComponent, type ComponentProps } from "svelte";
import { Combobox } from "@ark-ui/svelte/combobox";

export default class LoongArkComboboxTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof Combobox.Trigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
