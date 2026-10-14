<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticColorPickerStyles } from "@shaloong/loongark-primitives/automatic-styles/color-picker";
  registerAutomaticStyles(lkAutomaticColorPickerStyles);

  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerFormatTriggerProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.FormatTrigger
  data-scope="color-picker"
  data-part="format-trigger"
  {...$$restProps}
>
  <slot />
</ColorPicker.FormatTrigger>
