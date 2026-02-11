<script lang="ts">
  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerTransparencyGridProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.TransparencyGrid
  data-scope="color-picker"
  data-part="transparency-grid"
  {...$$restProps}
>
  <slot />
</ColorPicker.TransparencyGrid>
