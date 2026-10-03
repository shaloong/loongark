<script lang="ts">
  import { Select } from "@ark-ui/svelte/select";
</script>

<Select.ClearTrigger
  data-scope="select"
  data-part="clear-trigger"
  {...$$restProps}
>
  <slot />
</Select.ClearTrigger>
