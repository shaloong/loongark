<script lang="ts">
  import { Toggle } from "@ark-ui/svelte/toggle";
  import type { ToggleRootProps } from "@ark-ui/svelte/toggle";
  import type { ToggleSize } from "@loongark/primitives";

  export let size: ToggleSize = "md";
  export let pressed: ToggleRootProps["pressed"] = undefined;
  export let defaultPressed: ToggleRootProps["defaultPressed"] = undefined;
  export let disabled: ToggleRootProps["disabled"] = undefined;
  export let onPressedChange: ToggleRootProps["onPressedChange"] = undefined;
</script>

<Toggle.Root
  {pressed}
  {defaultPressed}
  {disabled}
  {onPressedChange}
  data-scope="toggle"
  data-part="root"
  data-size={size}
  {...$$restProps}
>
  <slot />
</Toggle.Root>
