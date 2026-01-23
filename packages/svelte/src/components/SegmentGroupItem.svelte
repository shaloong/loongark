<script lang="ts">
  import { ToggleGroup } from "@ark-ui/svelte/toggle-group";
  import type { ToggleGroupItemProps } from "@ark-ui/svelte/toggle-group";

  export let value: ToggleGroupItemProps["value"];
  export let disabled: ToggleGroupItemProps["disabled"] = undefined;
</script>

<ToggleGroup.Item
  {value}
  {disabled}
  data-scope="segment-group"
  data-part="item"
  {...$$restProps}
>
  <slot />
</ToggleGroup.Item>
