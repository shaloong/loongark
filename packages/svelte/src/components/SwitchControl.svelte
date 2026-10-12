<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticSwitchStyles } from "@loongark/primitives/automatic-styles/switch";
  registerAutomaticStyles(lkAutomaticSwitchStyles);

  import { Switch } from "@ark-ui/svelte/switch";
  import type { SwitchPrimitiveProps } from "@loongark/primitives";

  export let size: NonNullable<SwitchPrimitiveProps["size"]> = "md";
</script>

<Switch.Control
  data-scope="switch"
  data-part="control"
  data-size={size}
  {...$$restProps}
>
  <slot />
</Switch.Control>
