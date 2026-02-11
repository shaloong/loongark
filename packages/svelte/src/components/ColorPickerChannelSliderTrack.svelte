<script lang="ts">
  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerChannelSliderTrackProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.ChannelSliderTrack
  data-scope="color-picker"
  data-part="channel-slider-track"
  {...$$restProps}
>
  <slot />
</ColorPicker.ChannelSliderTrack>
