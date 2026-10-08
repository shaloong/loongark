import { SvelteComponent, type ComponentProps } from "svelte";
import { CheckboxIndicator } from "@ark-ui/svelte/checkbox";

export default class LoongArkCheckboxIndicator extends SvelteComponent<
  Omit<
    ComponentProps<typeof CheckboxIndicator>,
    "children" | "indeterminate"
  > & { indeterminate?: boolean },
  Record<string, never>,
  { default: Record<string, never> }
> {}
