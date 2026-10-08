<script lang="ts">
  import { Select } from "@ark-ui/svelte/select";
</script>

<Select.Control data-scope="select" data-part="control" {...$$restProps}>
  <slot />
</Select.Control>
