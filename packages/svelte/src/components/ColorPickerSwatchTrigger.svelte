<script lang="ts">
  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerSwatchTriggerProps } from "@ark-ui/svelte/color-picker";
  export let value: ColorPickerSwatchTriggerProps["value"];
</script>

<ColorPicker.SwatchTrigger
  {value}
  data-scope="color-picker"
  data-part="swatch-trigger"
  {...$$restProps}
>
  <slot />
</ColorPicker.SwatchTrigger>
