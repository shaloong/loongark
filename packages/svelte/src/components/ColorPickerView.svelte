<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticColorPickerStyles } from "@shaloong/loongark-primitives/automatic-styles/color-picker";
  registerAutomaticStyles(lkAutomaticColorPickerStyles);

  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerViewProps } from "@ark-ui/svelte/color-picker";
  export let format: ColorPickerViewProps["format"];
</script>

<ColorPicker.View
  {format}
  data-scope="color-picker"
  data-part="view"
  {...$$restProps}
>
  <slot />
</ColorPicker.View>
