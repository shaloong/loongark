<script lang="ts">
  import { ark } from "@ark-ui/svelte";
</script>

<ark.div data-scope="filter-bar" data-part="filters" {...$$restProps}>
  <slot />
</ark.div>
