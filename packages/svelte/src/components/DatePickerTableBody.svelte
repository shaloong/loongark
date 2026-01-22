<script lang="ts">
  import { DatePicker } from "@ark-ui/svelte/date-picker";
</script>

<DatePicker.TableBody
  data-scope="date-picker"
  data-part="table-body"
  {...$$restProps}
>
  <slot />
</DatePicker.TableBody>
