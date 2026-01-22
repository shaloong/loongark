<script lang="ts">
  import { DatePicker } from "@ark-ui/svelte/date-picker";
</script>

<DatePicker.TableHead
  data-scope="date-picker"
  data-part="table-head"
  {...$$restProps}
>
  <slot />
</DatePicker.TableHead>
