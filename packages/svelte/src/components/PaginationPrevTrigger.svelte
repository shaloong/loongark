<script lang="ts">
  import { Pagination } from "@ark-ui/svelte/pagination";
  import type { PaginationPrevTriggerProps } from "@ark-ui/svelte/pagination";

  export let disabled: PaginationPrevTriggerProps["disabled"] = undefined;
</script>

<Pagination.PrevTrigger
  {disabled}
  data-scope="pagination"
  data-part="prev-trigger"
  {...$$restProps}
>
  <slot />
</Pagination.PrevTrigger>
