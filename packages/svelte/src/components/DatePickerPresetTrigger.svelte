<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticDatePickerStyles } from "@shaloong/loongark-primitives/automatic-styles/date-picker";
  registerAutomaticStyles(lkAutomaticDatePickerStyles);

  import { DatePicker } from "@ark-ui/svelte/date-picker";
  import type { DatePickerPresetTriggerProps } from "@ark-ui/svelte/date-picker";

  export let value: DatePickerPresetTriggerProps["value"];
</script>

<DatePicker.PresetTrigger
  {value}
  data-scope="date-picker"
  data-part="preset-trigger"
  {...$$restProps}
>
  <slot />
</DatePicker.PresetTrigger>
