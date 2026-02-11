<script lang="ts">
  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerSwatchProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.Swatch
  data-scope="color-picker"
  data-part="swatch"
  {...$$restProps}
>
  <slot />
</ColorPicker.Swatch>
