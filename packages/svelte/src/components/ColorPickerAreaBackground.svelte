<script lang="ts">
  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerAreaBackgroundProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.AreaBackground
  data-scope="color-picker"
  data-part="area-background"
  {...$$restProps}
>
  <slot />
</ColorPicker.AreaBackground>
