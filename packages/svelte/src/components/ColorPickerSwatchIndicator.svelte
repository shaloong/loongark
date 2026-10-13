<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticColorPickerStyles } from "@loongark/primitives/automatic-styles/color-picker";
  registerAutomaticStyles(lkAutomaticColorPickerStyles);

  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerSwatchIndicatorProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.SwatchIndicator
  data-scope="color-picker"
  data-part="swatch-indicator"
  {...$$restProps}
>
  <slot />
</ColorPicker.SwatchIndicator>
