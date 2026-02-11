<script lang="ts">
  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerAreaProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.Area
  data-scope="color-picker"
  data-part="area"
  {...$$restProps}
>
  <slot />
</ColorPicker.Area>
