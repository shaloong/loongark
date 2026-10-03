<script lang="ts">
  import { Pagination } from "@ark-ui/svelte/pagination";
  import type { PaginationItemProps } from "@ark-ui/svelte/pagination";

  export let value: PaginationItemProps["value"];
  export let type: PaginationItemProps["type"] = "page";
  export let disabled: PaginationItemProps["disabled"] = undefined;
</script>

<Pagination.Item
  {value}
  {type}
  {disabled}
  data-scope="pagination"
  data-part="item"
  {...$$restProps}
>
  <slot />
</Pagination.Item>
