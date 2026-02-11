<script lang="ts">
  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerSwatchTriggerProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.SwatchTrigger
  data-scope="color-picker"
  data-part="swatch-trigger"
  {...$$restProps}
>
  <slot />
</ColorPicker.SwatchTrigger>
