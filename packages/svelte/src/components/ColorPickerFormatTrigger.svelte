<script lang="ts">
  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerFormatTriggerProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.FormatTrigger
  data-scope="color-picker"
  data-part="format-trigger"
  {...$$restProps}
>
  <slot />
</ColorPicker.FormatTrigger>
