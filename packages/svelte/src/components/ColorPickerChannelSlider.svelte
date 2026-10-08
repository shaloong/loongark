<script lang="ts">
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
