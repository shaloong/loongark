<script lang="ts">
  import { ToggleGroup } from "@ark-ui/svelte/toggle-group";
  import type { ToggleGroupRootProps } from "@ark-ui/svelte/toggle-group";
  import type {
    SegmentGroupOrientation,
    SegmentGroupSize,
  } from "@loongark/primitives";

  export let size: SegmentGroupSize = "md";
  export let orientation: SegmentGroupOrientation = "horizontal";
  export let value: ToggleGroupRootProps["value"] = undefined;
  export let defaultValue: ToggleGroupRootProps["defaultValue"] = undefined;
  export let multiple: ToggleGroupRootProps["multiple"] = undefined;
  export let disabled: ToggleGroupRootProps["disabled"] = undefined;
  export let loopFocus: ToggleGroupRootProps["loopFocus"] = undefined;
  export let rovingFocus: ToggleGroupRootProps["rovingFocus"] = undefined;
  export let deselectable: ToggleGroupRootProps["deselectable"] = undefined;
  export let id: ToggleGroupRootProps["id"] = undefined;
  export let ids: ToggleGroupRootProps["ids"] = undefined;
  export let onValueChange: ToggleGroupRootProps["onValueChange"] = undefined;
</script>

<ToggleGroup.Root
  {value}
  {defaultValue}
  {multiple}
  {disabled}
  {loopFocus}
  {rovingFocus}
  {deselectable}
  {id}
  {ids}
  {onValueChange}
  {orientation}
  data-scope="segment-group"
  data-part="root"
  data-size={size}
  data-orientation={orientation}
  {...$$restProps}
>
  <slot />
</ToggleGroup.Root>
