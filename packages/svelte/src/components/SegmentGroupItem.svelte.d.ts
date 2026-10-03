import { SvelteComponent, type ComponentProps } from "svelte";
import { ToggleGroup } from "@ark-ui/svelte/toggle-group";
import type { ToggleGroupItemProps } from "@ark-ui/svelte/toggle-group";

export default class LoongArkSegmentGroupItem extends SvelteComponent<
  Omit<
    ComponentProps<typeof ToggleGroup.Item>,
    "children" | "value" | "disabled"
  > & {
    value: ToggleGroupItemProps["value"];
    disabled?: ToggleGroupItemProps["disabled"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
