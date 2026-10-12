<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticDatePickerStyles } from "@loongark/primitives/automatic-styles/date-picker";
  registerAutomaticStyles(lkAutomaticDatePickerStyles);

  import { DatePicker } from "@ark-ui/svelte/date-picker";
  import type { DatePickerInputProps } from "@ark-ui/svelte/date-picker";

  export let index: DatePickerInputProps["index"] = 0;
  export let fixOnBlur: DatePickerInputProps["fixOnBlur"] = undefined;
</script>

<DatePicker.Input
  {index}
  {fixOnBlur}
  data-scope="date-picker"
  data-part="input"
  {...$$restProps}
/>
