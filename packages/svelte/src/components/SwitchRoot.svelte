<script lang="ts">
  import { Switch } from "@ark-ui/svelte/switch";
  import type { SwitchPrimitiveProps } from "@loongark/primitives";

  export let size: NonNullable<SwitchPrimitiveProps["size"]> = "md";
  export let disabled: boolean = false;
  export let checked: boolean | undefined = undefined;
  export let onCheckedChange: ((details: { checked: boolean }) => void) | undefined = undefined;
</script>

<Switch.Root
  {disabled}
  {checked}
  {onCheckedChange}
  data-lk-switch=""
  data-size={size}
  data-disabled={disabled || undefined}
  {...$$restProps}
>
  <slot />
</Switch.Root>
