<script lang="ts">
  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerChannelInputProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.ChannelInput
  data-scope="color-picker"
  data-part="channel-input"
  {...$$restProps}
/>
