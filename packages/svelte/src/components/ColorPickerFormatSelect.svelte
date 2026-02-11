<script lang="ts">
  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerFormatSelectProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.FormatSelect
  data-scope="color-picker"
  data-part="format-select"
  {...$$restProps}
>
  <slot />
</ColorPicker.FormatSelect>
