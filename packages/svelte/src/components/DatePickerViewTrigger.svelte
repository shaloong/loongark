<script lang="ts">
  import { DatePicker } from "@ark-ui/svelte/date-picker";
</script>

<DatePicker.ViewTrigger
  data-scope="date-picker"
  data-part="view-trigger"
  {...$$restProps}
>
  <slot />
</DatePicker.ViewTrigger>
