<script lang="ts">
  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerLabelProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.Label
  data-scope="color-picker"
  data-part="label"
  {...$$restProps}
>
  <slot />
</ColorPicker.Label>
