<script lang="ts">
  import { DatePicker } from "@ark-ui/svelte/date-picker";
  import { getDatePickerSize } from "./datePickerContext";

  const sizeStore = getDatePickerSize();
</script>

<DatePicker.Content
  data-scope="date-picker"
  data-part="content"
  data-size={$sizeStore}
  {...$$restProps}
>
  <slot />
</DatePicker.Content>
