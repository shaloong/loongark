<script lang="ts">
  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerSwatchIndicatorProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.SwatchIndicator
  data-scope="color-picker"
  data-part="swatch-indicator"
  {...$$restProps}
>
  <slot />
</ColorPicker.SwatchIndicator>
