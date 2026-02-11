<script lang="ts">
  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerPositionerProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.Positioner
  data-scope="color-picker"
  data-part="positioner"
  {...$$restProps}
>
  <slot />
</ColorPicker.Positioner>
