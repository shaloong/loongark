<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticToggleStyles } from "@shaloong/loongark-primitives/automatic-styles/toggle";
  registerAutomaticStyles(lkAutomaticToggleStyles);

  import { Toggle } from "@ark-ui/svelte/toggle";
  import type { ToggleRootProps } from "@ark-ui/svelte/toggle";
  import type { ToggleSize } from "@shaloong/loongark-primitives";

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
