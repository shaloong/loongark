import { SvelteComponent, type ComponentProps } from "svelte";
import { Pagination } from "@ark-ui/svelte/pagination";
import type { PaginationItemProps } from "@ark-ui/svelte/pagination";

export default class LoongArkPaginationItem extends SvelteComponent<
  Omit<
    ComponentProps<typeof Pagination.Item>,
    "children" | "value" | "type" | "disabled"
  > & {
    value: PaginationItemProps["value"];
    type?: PaginationItemProps["type"];
    disabled?: PaginationItemProps["disabled"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
