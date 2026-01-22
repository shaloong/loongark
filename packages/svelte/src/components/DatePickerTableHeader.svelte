<script lang="ts">
  import { DatePicker } from "@ark-ui/svelte/date-picker";
</script>

<DatePicker.TableHeader
  data-scope="date-picker"
  data-part="table-header"
  {...$$restProps}
>
  <slot />
</DatePicker.TableHeader>
