import { SvelteComponent, type ComponentProps } from "svelte";
import { ToggleGroup } from "@ark-ui/svelte/toggle-group";
import type { ToggleGroupRootProps } from "@ark-ui/svelte/toggle-group";
import type {
  SegmentGroupOrientation,
  SegmentGroupSize,
} from "@loongark/primitives";

export default class LoongArkSegmentGroupRoot extends SvelteComponent<
  Omit<
    ComponentProps<typeof ToggleGroup.Root>,
    | "children"
    | "size"
    | "orientation"
    | "value"
    | "defaultValue"
    | "multiple"
    | "disabled"
    | "loopFocus"
    | "rovingFocus"
    | "deselectable"
    | "id"
    | "ids"
    | "onValueChange"
  > & {
    size?: SegmentGroupSize;
    orientation?: SegmentGroupOrientation;
    value?: ToggleGroupRootProps["value"];
    defaultValue?: ToggleGroupRootProps["defaultValue"];
    multiple?: ToggleGroupRootProps["multiple"];
    disabled?: ToggleGroupRootProps["disabled"];
    loopFocus?: ToggleGroupRootProps["loopFocus"];
    rovingFocus?: ToggleGroupRootProps["rovingFocus"];
    deselectable?: ToggleGroupRootProps["deselectable"];
    id?: ToggleGroupRootProps["id"];
    ids?: ToggleGroupRootProps["ids"];
    onValueChange?: ToggleGroupRootProps["onValueChange"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
