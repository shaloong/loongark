import { SvelteComponent, type ComponentProps } from "svelte";
import { Combobox } from "@ark-ui/svelte/combobox";

export default class LoongArkComboboxItem extends SvelteComponent<
  Omit<
    ComponentProps<typeof Combobox.Item>,
    "children" | "item" | "persistFocus"
  > & { item: object; persistFocus?: boolean | undefined },
  Record<string, never>,
  { default: Record<string, never> }
> {}
