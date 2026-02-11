<script lang="ts">
  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerTriggerProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.Trigger
  data-scope="color-picker"
  data-part="trigger"
  {...$$restProps}
>
  <slot />
</ColorPicker.Trigger>
