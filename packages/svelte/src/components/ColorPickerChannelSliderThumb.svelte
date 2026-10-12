<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticColorPickerStyles } from "@loongark/primitives/automatic-styles/color-picker";
  registerAutomaticStyles(lkAutomaticColorPickerStyles);

  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerChannelSliderThumbProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.ChannelSliderThumb
  data-scope="color-picker"
  data-part="channel-slider-thumb"
  {...$$restProps}
>
  <slot />
</ColorPicker.ChannelSliderThumb>
