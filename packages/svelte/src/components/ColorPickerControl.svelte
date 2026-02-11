<script lang="ts">
  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerControlProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.Control
  data-scope="color-picker"
  data-part="control"
  {...$$restProps}
>
  <slot />
</ColorPicker.Control>
