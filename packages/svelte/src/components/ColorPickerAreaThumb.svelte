<script lang="ts">
  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerAreaThumbProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.AreaThumb
  data-scope="color-picker"
  data-part="area-thumb"
  {...$$restProps}
>
  <slot />
</ColorPicker.AreaThumb>
