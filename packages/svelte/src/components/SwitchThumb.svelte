<script lang="ts">
  import { Switch } from "@ark-ui/svelte/switch";
  import type { SwitchPrimitiveProps } from "@loongark/primitives";

  export let size: NonNullable<SwitchPrimitiveProps["size"]> = "md";
</script>

<Switch.Thumb
  data-lk-switch-thumb=""
  data-size={size}
  {...$$restProps}
/>
