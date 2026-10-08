import { SvelteComponent, type ComponentProps } from "svelte";
import { Pagination } from "@ark-ui/svelte/pagination";
import type { PaginationPrevTriggerProps } from "@ark-ui/svelte/pagination";

export default class LoongArkPaginationPrevTrigger extends SvelteComponent<
  Omit<
    ComponentProps<typeof Pagination.PrevTrigger>,
    "children" | "disabled"
  > & { disabled?: PaginationPrevTriggerProps["disabled"] },
  Record<string, never>,
  { default: Record<string, never> }
> {}
