<script lang="ts">
  import { Select } from "@ark-ui/svelte/select";
</script>

<Select.List data-scope="select" data-part="list" {...$$restProps}>
  <slot />
</Select.List>
