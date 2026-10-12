<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticDatePickerStyles } from "@loongark/primitives/automatic-styles/date-picker";
  registerAutomaticStyles(lkAutomaticDatePickerStyles);

  import { DatePicker } from "@ark-ui/svelte/date-picker";
</script>

<DatePicker.PrevTrigger
  data-scope="date-picker"
  data-part="prev-trigger"
  {...$$restProps}
>
  <slot />
</DatePicker.PrevTrigger>
