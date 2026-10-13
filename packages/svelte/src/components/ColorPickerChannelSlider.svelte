<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticColorPickerStyles } from "@loongark/primitives/automatic-styles/color-picker";
  registerAutomaticStyles(lkAutomaticColorPickerStyles);

  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerChannelSliderProps } from "@ark-ui/svelte/color-picker";
  export let channel: ColorPickerChannelSliderProps["channel"];
</script>

<ColorPicker.ChannelSlider
  {channel}
  data-scope="color-picker"
  data-part="channel-slider"
  {...$$restProps}
>
  <slot />
</ColorPicker.ChannelSlider>
