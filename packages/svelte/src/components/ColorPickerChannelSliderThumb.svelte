<script lang="ts">
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
