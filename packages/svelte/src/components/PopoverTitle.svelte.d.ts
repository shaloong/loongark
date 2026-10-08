import { SvelteComponent, type ComponentProps } from "svelte";
import { Popover } from "@ark-ui/svelte/popover";
import type { PopoverTitleProps } from "@ark-ui/svelte/popover";

export default class LoongArkPopoverTitle extends SvelteComponent<
  Omit<ComponentProps<typeof Popover.Title>, "children" | "asChild" | "id"> & {
    asChild?: PopoverTitleProps["asChild"];
    id?: PopoverTitleProps["id"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
