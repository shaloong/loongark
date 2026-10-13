<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticColorPickerStyles } from "@loongark/primitives/automatic-styles/color-picker";
  registerAutomaticStyles(lkAutomaticColorPickerStyles);

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
