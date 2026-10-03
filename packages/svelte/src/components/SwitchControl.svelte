<script lang="ts">
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
