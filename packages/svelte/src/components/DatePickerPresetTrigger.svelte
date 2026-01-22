<script lang="ts">
  import { DatePicker } from "@ark-ui/svelte/date-picker";
  import type { DatePickerPresetTriggerProps } from "@ark-ui/svelte/date-picker";

  export let value: DatePickerPresetTriggerProps["value"] = undefined;
</script>

<DatePicker.PresetTrigger
  {value}
  data-scope="date-picker"
  data-part="preset-trigger"
  {...$$restProps}
>
  <slot />
</DatePicker.PresetTrigger>
