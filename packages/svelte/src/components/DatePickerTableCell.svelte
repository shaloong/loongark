<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticDatePickerStyles } from "@loongark/primitives/automatic-styles/date-picker";
  registerAutomaticStyles(lkAutomaticDatePickerStyles);

  import { DatePicker } from "@ark-ui/svelte/date-picker";
  import type { DatePickerTableCellProps } from "@ark-ui/svelte/date-picker";

  export let value: DatePickerTableCellProps["value"];
  export let disabled: DatePickerTableCellProps["disabled"] = undefined;
  export let columns: DatePickerTableCellProps["columns"] = undefined;
  export let visibleRange: DatePickerTableCellProps["visibleRange"] = undefined;
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
