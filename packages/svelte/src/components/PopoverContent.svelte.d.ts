import { SvelteComponent, type ComponentProps } from "svelte";
import { Popover } from "@ark-ui/svelte/popover";
import type { PopoverContentProps } from "@ark-ui/svelte/popover";

export default class LoongArkPopoverContent extends SvelteComponent<
  Omit<
    ComponentProps<typeof Popover.Content>,
    "children" | "asChild" | "id" | "showArrow"
  > & {
    asChild?: PopoverContentProps["asChild"];
    id?: PopoverContentProps["id"];
    showArrow?: boolean;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
