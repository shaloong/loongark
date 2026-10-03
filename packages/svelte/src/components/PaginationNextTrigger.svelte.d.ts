import { SvelteComponent, type ComponentProps } from "svelte";
import { Pagination } from "@ark-ui/svelte/pagination";
import type { PaginationNextTriggerProps } from "@ark-ui/svelte/pagination";

export default class LoongArkPaginationNextTrigger extends SvelteComponent<
  Omit<
    ComponentProps<typeof Pagination.NextTrigger>,
    "children" | "disabled"
  > & { disabled?: PaginationNextTriggerProps["disabled"] },
  Record<string, never>,
  { default: Record<string, never> }
> {}
