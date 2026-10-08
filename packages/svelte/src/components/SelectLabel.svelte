<script lang="ts">
  import { Select } from "@ark-ui/svelte/select";
</script>

<Select.Label data-scope="select" data-part="label" {...$$restProps}>
  <slot />
</Select.Label>
