<script lang="ts">
  import { Switch } from "@ark-ui/svelte/switch";
  import type { SwitchPrimitiveProps } from "@loongark/primitives";

  export let size: NonNullable<SwitchPrimitiveProps["size"]> = "md";
  export let disabled: boolean = false;
</script>

<Switch.Control
  {disabled}
  data-scope="switch"
  data-part="control"
  data-size={size}
  data-disabled={disabled || undefined}
  {...$$restProps}
>
  <slot />
</Switch.Control>
