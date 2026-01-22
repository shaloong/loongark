<script lang="ts">
  import { DatePicker } from "@ark-ui/svelte/date-picker";
</script>

<DatePicker.ViewControl
  data-scope="date-picker"
  data-part="view-control"
  {...$$restProps}
>
  <slot />
</DatePicker.ViewControl>
