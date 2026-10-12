<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticColorPickerStyles } from "@loongark/primitives/automatic-styles/color-picker";
  registerAutomaticStyles(lkAutomaticColorPickerStyles);

  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerChannelInputProps } from "@ark-ui/svelte/color-picker";
  export let channel: ColorPickerChannelInputProps["channel"];
</script>

<ColorPicker.ChannelInput
  {channel}
  data-scope="color-picker"
  data-part="channel-input"
  {...$$restProps}
/>
