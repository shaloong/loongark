<script lang="ts">
  import { DatePicker } from "@ark-ui/svelte/date-picker";
</script>

<DatePicker.RangeText
  data-scope="date-picker"
  data-part="range-text"
  {...$$restProps}
>
  <slot />
</DatePicker.RangeText>
