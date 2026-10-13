<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticColorPickerStyles } from "@loongark/primitives/automatic-styles/color-picker";
  registerAutomaticStyles(lkAutomaticColorPickerStyles);

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
