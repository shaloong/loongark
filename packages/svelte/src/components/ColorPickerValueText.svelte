<script lang="ts">
  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerValueTextProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.ValueText
  data-scope="color-picker"
  data-part="value-text"
  {...$$restProps}
>
  <slot />
</ColorPicker.ValueText>
