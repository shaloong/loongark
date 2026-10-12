<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticDatePickerStyles } from "@loongark/primitives/automatic-styles/date-picker";
  registerAutomaticStyles(lkAutomaticDatePickerStyles);

  import { DatePicker } from "@ark-ui/svelte/date-picker";
</script>

<DatePicker.TableCellTrigger
  data-scope="date-picker"
  data-part="table-cell-trigger"
  {...$$restProps}
>
  <slot />
</DatePicker.TableCellTrigger>
