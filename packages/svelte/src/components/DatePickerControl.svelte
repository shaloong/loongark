<script lang="ts">
  import { DatePicker } from "@ark-ui/svelte/date-picker";
</script>

<DatePicker.Control
  data-scope="date-picker"
  data-part="control"
  {...$$restProps}
>
  <slot />
</DatePicker.Control>
