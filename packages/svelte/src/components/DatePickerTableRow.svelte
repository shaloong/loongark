<script lang="ts">
  import { DatePicker } from "@ark-ui/svelte/date-picker";
</script>

<DatePicker.TableRow
  data-scope="date-picker"
  data-part="table-row"
  {...$$restProps}
>
  <slot />
</DatePicker.TableRow>
