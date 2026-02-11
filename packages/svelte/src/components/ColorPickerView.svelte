<script lang="ts">
  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerViewProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.View
  data-scope="color-picker"
  data-part="view"
  {...$$restProps}
>
  <slot />
</ColorPicker.View>
