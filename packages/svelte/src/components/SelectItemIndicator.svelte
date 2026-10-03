<script lang="ts">
  import { Select } from "@ark-ui/svelte/select";
</script>

<Select.ItemIndicator
  data-scope="select"
  data-part="item-indicator"
  {...$$restProps}
>
  <slot />
</Select.ItemIndicator>
