<script lang="ts">
  import { DatePicker } from "@ark-ui/svelte/date-picker";
</script>

<DatePicker.YearSelect
  data-scope="date-picker"
  data-part="year-select"
  {...$$restProps}
>
  <slot />
</DatePicker.YearSelect>
