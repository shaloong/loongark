<script lang="ts">
  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerHiddenInputProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.HiddenInput
  data-scope="color-picker"
  data-part="hidden-input"
  {...$$restProps}
/>
