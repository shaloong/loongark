<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticColorPickerStyles } from "@shaloong/loongark-primitives/automatic-styles/color-picker";
  registerAutomaticStyles(lkAutomaticColorPickerStyles);

  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerSwatchTriggerProps } from "@ark-ui/svelte/color-picker";
  export let value: ColorPickerSwatchTriggerProps["value"];
</script>

<ColorPicker.SwatchTrigger
  {value}
  data-scope="color-picker"
  data-part="swatch-trigger"
  {...$$restProps}
>
  <slot />
</ColorPicker.SwatchTrigger>
