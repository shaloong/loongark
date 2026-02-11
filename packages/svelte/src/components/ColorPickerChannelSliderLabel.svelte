<script lang="ts">
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
