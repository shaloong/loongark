<script lang="ts">
  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerValueSwatchProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.ValueSwatch
  data-scope="color-picker"
  data-part="value-swatch"
  {...$$restProps}
>
  <slot />
</ColorPicker.ValueSwatch>
