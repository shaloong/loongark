<script lang="ts">
  import { DatePicker } from "@ark-ui/svelte/date-picker";
  import type { DatePickerTableCellProps } from "@ark-ui/svelte/date-picker";

  export let value: DatePickerTableCellProps["value"];
  export let disabled: DatePickerTableCellProps["disabled"];
  export let columns: DatePickerTableCellProps["columns"];
  export let visibleRange: DatePickerTableCellProps["visibleRange"];
</script>

<DatePicker.TableCell
  {value}
  {disabled}
  {columns}
  {visibleRange}
  data-scope="date-picker"
  data-part="table-cell"
  {...$$restProps}
>
  <slot />
</DatePicker.TableCell>
