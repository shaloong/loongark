<script lang="ts">
  import { Select } from "@ark-ui/svelte/select";
</script>

<Select.ItemGroup data-scope="select" data-part="item-group" {...$$restProps}>
  <slot />
</Select.ItemGroup>
