<script lang="ts">
  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerChannelSliderProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.ChannelSlider
  data-scope="color-picker"
  data-part="channel-slider"
  {...$$restProps}
>
  <slot />
</ColorPicker.ChannelSlider>
