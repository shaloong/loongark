<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticSwitchStyles } from "@shaloong/loongark-primitives/automatic-styles/switch";
  registerAutomaticStyles(lkAutomaticSwitchStyles);

  import { Switch } from "@ark-ui/svelte/switch";
  import type { SwitchPrimitiveProps } from "@shaloong/loongark-primitives";

  export let size: NonNullable<SwitchPrimitiveProps["size"]> = "md";
</script>

<Switch.Thumb
  data-scope="switch"
  data-part="thumb"
  data-size={size}
  {...$$restProps}
/>
