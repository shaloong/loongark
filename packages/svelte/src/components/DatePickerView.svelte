<script lang="ts">
  import { DatePicker } from "@ark-ui/svelte/date-picker";
  import type { DatePickerViewProps } from "@ark-ui/svelte/date-picker";

  export let view: DatePickerViewProps["view"] = "day";
</script>

<DatePicker.View
  {view}
  data-scope="date-picker"
  data-part="view"
  {...$$restProps}
>
  <slot />
</DatePicker.View>
