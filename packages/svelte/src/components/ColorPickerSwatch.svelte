<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticColorPickerStyles } from "@shaloong/loongark-primitives/automatic-styles/color-picker";
  registerAutomaticStyles(lkAutomaticColorPickerStyles);

  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerSwatchProps } from "@ark-ui/svelte/color-picker";
  export let value: ColorPickerSwatchProps["value"];
</script>

<ColorPicker.Swatch
  {value}
  data-scope="color-picker"
  data-part="swatch"
  {...$$restProps}
>
  <slot />
</ColorPicker.Swatch>
