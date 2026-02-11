<script lang="ts">
  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerRootProps } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerSize } from "@loongark/primitives";

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
