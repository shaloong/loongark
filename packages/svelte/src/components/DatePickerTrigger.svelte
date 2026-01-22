<script lang="ts">
  import { DatePicker } from "@ark-ui/svelte/date-picker";
</script>

<DatePicker.Trigger
  data-scope="date-picker"
  data-part="trigger"
  {...$$restProps}
>
  <slot />
</DatePicker.Trigger>
