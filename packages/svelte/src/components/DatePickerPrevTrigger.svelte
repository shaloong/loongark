<script lang="ts">
  import { DatePicker } from "@ark-ui/svelte/date-picker";
</script>

<DatePicker.PrevTrigger
  data-scope="date-picker"
  data-part="prev-trigger"
  {...$$restProps}
>
  <slot />
</DatePicker.PrevTrigger>
