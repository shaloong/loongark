<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticColorPickerStyles } from "@loongark/primitives/automatic-styles/color-picker";
  registerAutomaticStyles(lkAutomaticColorPickerStyles);

  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerAreaThumbProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.AreaThumb
  data-scope="color-picker"
  data-part="area-thumb"
  {...$$restProps}
>
  <slot />
</ColorPicker.AreaThumb>
