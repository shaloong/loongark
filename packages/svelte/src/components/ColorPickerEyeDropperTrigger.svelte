<script lang="ts">
  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerEyeDropperTriggerProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.EyeDropperTrigger
  data-scope="color-picker"
  data-part="eye-dropper-trigger"
  {...$$restProps}
>
  <slot />
</ColorPicker.EyeDropperTrigger>
