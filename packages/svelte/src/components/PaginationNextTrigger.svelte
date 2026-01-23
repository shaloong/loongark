<script lang="ts">
  import { Pagination } from "@ark-ui/svelte/pagination";
  import type { PaginationNextTriggerProps } from "@ark-ui/svelte/pagination";

  export let disabled: PaginationNextTriggerProps["disabled"] = undefined;
</script>

<Pagination.NextTrigger
  {disabled}
  data-scope="pagination"
  data-part="next-trigger"
  {...$$restProps}
>
  <slot />
</Pagination.NextTrigger>
