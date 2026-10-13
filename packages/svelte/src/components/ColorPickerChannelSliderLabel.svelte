<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticColorPickerStyles } from "@loongark/primitives/automatic-styles/color-picker";
  registerAutomaticStyles(lkAutomaticColorPickerStyles);

  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerChannelSliderLabelProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.ChannelSliderLabel
  data-scope="color-picker"
  data-part="channel-slider-label"
  {...$$restProps}
>
  <slot />
</ColorPicker.ChannelSliderLabel>
