<script lang="ts">
  import { DatePicker } from "@ark-ui/svelte/date-picker";
</script>

<DatePicker.Positioner
  data-scope="date-picker"
  data-part="positioner"
  {...$$restProps}
>
  <slot />
</DatePicker.Positioner>
