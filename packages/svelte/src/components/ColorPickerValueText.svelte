<script lang="ts">
  import type { ComponentProps } from "svelte";
  import { ColorPicker } from "@ark-ui/svelte/color-picker";
  let { children, ...props }: ComponentProps<typeof ColorPicker.ValueText> =
    $props();
</script>

<ColorPicker.ValueText
  {...props}
  {children}
  data-scope="color-picker"
  data-part="value-text"
/>
