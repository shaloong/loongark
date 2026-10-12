<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticColorPickerStyles } from "@loongark/primitives/automatic-styles/color-picker";
  registerAutomaticStyles(lkAutomaticColorPickerStyles);

  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerTransparencyGridProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.TransparencyGrid
  data-scope="color-picker"
  data-part="transparency-grid"
  {...$$restProps}
>
  <slot />
</ColorPicker.TransparencyGrid>
