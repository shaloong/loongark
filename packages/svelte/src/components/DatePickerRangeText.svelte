<script lang="ts">
  import type { ComponentProps } from "svelte";
  import { DatePicker } from "@ark-ui/svelte/date-picker";
  let { children, ...props }: ComponentProps<typeof DatePicker.RangeText> =
    $props();
</script>

<DatePicker.RangeText
  {...props}
  {children}
  data-scope="date-picker"
  data-part="range-text"
/>
