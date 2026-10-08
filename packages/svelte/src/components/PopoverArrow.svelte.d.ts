import { SvelteComponent, type ComponentProps } from "svelte";
import { Popover } from "@ark-ui/svelte/popover";
import type { PopoverArrowProps } from "@ark-ui/svelte/popover";

export default class LoongArkPopoverArrow extends SvelteComponent<
  Omit<ComponentProps<typeof Popover.Arrow>, "children" | "asChild" | "id"> & {
    asChild?: PopoverArrowProps["asChild"];
    id?: PopoverArrowProps["id"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
