import { SvelteComponent, type ComponentProps } from "svelte";
import { Pagination } from "@ark-ui/svelte/pagination";
import type { PaginationEllipsisProps } from "@ark-ui/svelte/pagination";

export default class LoongArkPaginationEllipsis extends SvelteComponent<
  Omit<ComponentProps<typeof Pagination.Ellipsis>, "children" | "index"> & {
    index: PaginationEllipsisProps["index"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
