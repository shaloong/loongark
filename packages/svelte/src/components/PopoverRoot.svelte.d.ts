import { SvelteComponent, type ComponentProps } from "svelte";
import { Popover } from "@ark-ui/svelte/popover";
import type { PopoverRootProps } from "@ark-ui/svelte/popover";

export default class LoongArkPopoverRoot extends SvelteComponent<
  Omit<
    ComponentProps<typeof Popover.Root>,
    "children" | "id" | "positioning" | "defaultOpen" | "open" | "onOpenChange"
  > & {
    id?: PopoverRootProps["id"];
    positioning?: PopoverRootProps["positioning"];
    defaultOpen?: PopoverRootProps["defaultOpen"];
    open?: PopoverRootProps["open"];
    onOpenChange?: PopoverRootProps["onOpenChange"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
