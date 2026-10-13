<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticColorPickerStyles } from "@loongark/primitives/automatic-styles/color-picker";
  registerAutomaticStyles(lkAutomaticColorPickerStyles);

  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerControlProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.Control
  data-scope="color-picker"
  data-part="control"
  {...$$restProps}
>
  <slot />
</ColorPicker.Control>
