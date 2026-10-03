import { SvelteComponent, type ComponentProps } from "svelte";
import { Popover } from "@ark-ui/svelte/popover";
import type { PopoverCloseTriggerProps } from "@ark-ui/svelte/popover";

export default class LoongArkPopoverCloseTrigger extends SvelteComponent<
  Omit<
    ComponentProps<typeof Popover.CloseTrigger>,
    "children" | "asChild" | "id"
  > & {
    asChild?: PopoverCloseTriggerProps["asChild"];
    id?: PopoverCloseTriggerProps["id"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
