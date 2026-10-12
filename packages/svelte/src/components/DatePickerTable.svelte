<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticDatePickerStyles } from "@loongark/primitives/automatic-styles/date-picker";
  registerAutomaticStyles(lkAutomaticDatePickerStyles);

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
