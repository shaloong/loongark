<script lang="ts">
  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  import type { ColorPickerContentProps } from "@ark-ui/svelte/color-picker";
</script>

<ColorPicker.Content
  data-scope="color-picker"
  data-part="content"
  {...$$restProps}
>
  <slot />
</ColorPicker.Content>
