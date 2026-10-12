<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticDatePickerStyles } from "@loongark/primitives/automatic-styles/date-picker";
  registerAutomaticStyles(lkAutomaticDatePickerStyles);

  import { datePickerPositionerStyle } from "@loongark/primitives";
  import { DatePicker } from "@ark-ui/svelte/date-picker";
</script>

<DatePicker.Positioner
  data-scope="date-picker"
  data-part="positioner"
  {...$$restProps}
  style={`${Object.entries(datePickerPositionerStyle($$restProps.style)).map(([key, value]) => `${key}:${value}`).join(";")};${$$restProps.style ?? ""}`}
>
  <slot />
</DatePicker.Positioner>
