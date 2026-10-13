<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticDatePickerStyles } from "@loongark/primitives/automatic-styles/date-picker";
  registerAutomaticStyles(lkAutomaticDatePickerStyles);

  import { DatePicker } from "@ark-ui/svelte/date-picker";
</script>

<DatePicker.YearSelect
  data-scope="date-picker"
  data-part="year-select"
  {...$$restProps}
>
  <slot />
</DatePicker.YearSelect>
