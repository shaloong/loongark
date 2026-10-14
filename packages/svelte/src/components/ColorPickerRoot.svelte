<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticColorPickerStyles } from "@shaloong/loongark-primitives/automatic-styles/color-picker";
  registerAutomaticStyles(lkAutomaticColorPickerStyles);

  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerRootProps } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerSize } from "@shaloong/loongark-primitives";

  export let size: ColorPickerSize = "md";
</script>

<ColorPicker.Root
  data-scope="color-picker"
  data-part="root"
  data-size={size}
  {...$$restProps}
>
  <slot />
</ColorPicker.Root>
