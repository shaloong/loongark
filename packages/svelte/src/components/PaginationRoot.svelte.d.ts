import { SvelteComponent, type ComponentProps } from "svelte";
import { Pagination } from "@ark-ui/svelte/pagination";
import type { PaginationRootProps } from "@ark-ui/svelte/pagination";
import type {
  PaginationOrientation,
  PaginationSize,
} from "@loongark/primitives";

export default class LoongArkPaginationRoot extends SvelteComponent<
  Omit<
    ComponentProps<typeof Pagination.Root>,
    | "children"
    | "size"
    | "orientation"
    | "count"
    | "pageSize"
    | "siblingCount"
    | "boundaryCount"
    | "page"
    | "defaultPage"
    | "id"
    | "onPageChange"
  > & {
    size?: PaginationSize;
    orientation?: PaginationOrientation;
    count?: PaginationRootProps["count"];
    pageSize?: PaginationRootProps["pageSize"];
    siblingCount?: PaginationRootProps["siblingCount"];
    boundaryCount?: PaginationRootProps["boundaryCount"];
    page?: PaginationRootProps["page"];
    defaultPage?: PaginationRootProps["defaultPage"];
    id?: PaginationRootProps["id"];
    onPageChange?: PaginationRootProps["onPageChange"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
