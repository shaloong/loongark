<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticToggleGroupStyles } from "@loongark/primitives/automatic-styles/toggle-group";
  registerAutomaticStyles(lkAutomaticToggleGroupStyles);

  import { ToggleGroup } from "@ark-ui/svelte/toggle-group";
  import type { ToggleGroupItemProps } from "@ark-ui/svelte/toggle-group";

  export let value: ToggleGroupItemProps["value"];
  export let disabled: ToggleGroupItemProps["disabled"] = undefined;
</script>

<ToggleGroup.Item
  {value}
  {disabled}
  data-scope="toggle-group"
  data-part="item"
  {...$$restProps}
>
  <slot />
</ToggleGroup.Item>
