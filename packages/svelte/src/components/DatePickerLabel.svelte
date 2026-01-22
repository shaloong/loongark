<script lang="ts">
  import { DatePicker } from "@ark-ui/svelte/date-picker";
</script>

<DatePicker.Label data-scope="date-picker" data-part="label" {...$$restProps}>
  <slot />
</DatePicker.Label>
