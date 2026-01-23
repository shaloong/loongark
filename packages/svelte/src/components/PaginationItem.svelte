<script lang="ts">
  import { Pagination } from "@ark-ui/svelte/pagination";
  import type { PaginationItemProps } from "@ark-ui/svelte/pagination";

  export let page: PaginationItemProps["page"] = undefined;
  export let value: PaginationItemProps["value"] = undefined;
  export let index: PaginationItemProps["index"] = undefined;
  export let disabled: PaginationItemProps["disabled"] = undefined;
</script>

<Pagination.Item
  {page}
  {value}
  {index}
  {disabled}
  data-scope="pagination"
  data-part="item"
  {...$$restProps}
>
  <slot />
</Pagination.Item>
