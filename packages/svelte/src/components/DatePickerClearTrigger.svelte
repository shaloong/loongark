<script lang="ts">
  import { DatePicker } from "@ark-ui/svelte/date-picker";
</script>

<DatePicker.ClearTrigger
  data-scope="date-picker"
  data-part="clear-trigger"
  {...$$restProps}
>
  <slot />
</DatePicker.ClearTrigger>
