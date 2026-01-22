<script lang="ts">
  import { DatePicker } from "@ark-ui/svelte/date-picker";
</script>

<DatePicker.MonthSelect
  data-scope="date-picker"
  data-part="month-select"
  {...$$restProps}
>
  <slot />
</DatePicker.MonthSelect>
