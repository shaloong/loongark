<script lang="ts">
  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerSwatchGroupProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.SwatchGroup
  data-scope="color-picker"
  data-part="swatch-group"
  {...$$restProps}
>
  <slot />
</ColorPicker.SwatchGroup>
