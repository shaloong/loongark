<script lang="ts">
  import { DatePicker } from "@ark-ui/svelte/date-picker";
</script>

<DatePicker.TableCellTrigger
  data-scope="date-picker"
  data-part="table-cell-trigger"
  {...$$restProps}
>
  <slot />
</DatePicker.TableCellTrigger>
