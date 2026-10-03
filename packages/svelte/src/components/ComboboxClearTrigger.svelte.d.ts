import { SvelteComponent, type ComponentProps } from "svelte";
import { Combobox } from "@ark-ui/svelte/combobox";

export default class LoongArkComboboxClearTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof Combobox.ClearTrigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
