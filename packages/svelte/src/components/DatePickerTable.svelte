<script lang="ts">
  import { DatePicker } from "@ark-ui/svelte/date-picker";
  import type { DatePickerTableProps } from "@ark-ui/svelte/date-picker";

  export let columns: DatePickerTableProps["columns"] = undefined;
  export let id: DatePickerTableProps["id"] = undefined;
</script>

<DatePicker.Table
  {columns}
  {id}
  data-scope="date-picker"
  data-part="table"
  {...$$restProps}
>
  <slot />
</DatePicker.Table>
