<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticColorPickerStyles } from "@shaloong/loongark-primitives/automatic-styles/color-picker";
  registerAutomaticStyles(lkAutomaticColorPickerStyles);

  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerChannelSliderValueTextProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.ChannelSliderValueText
  data-scope="color-picker"
  data-part="channel-slider-value-text"
  {...$$restProps}
>
  <slot />
</ColorPicker.ChannelSliderValueText>
