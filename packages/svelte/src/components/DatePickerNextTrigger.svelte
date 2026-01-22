<script lang="ts">
  import { DatePicker } from "@ark-ui/svelte/date-picker";
</script>

<DatePicker.NextTrigger
  data-scope="date-picker"
  data-part="next-trigger"
  {...$$restProps}
>
  <slot />
</DatePicker.NextTrigger>
