<script lang="ts">
  import { Select } from "@ark-ui/svelte/select";
</script>

<Select.ItemGroupLabel
  data-scope="select"
  data-part="item-group-label"
  {...$$restProps}
>
  <slot />
</Select.ItemGroupLabel>
