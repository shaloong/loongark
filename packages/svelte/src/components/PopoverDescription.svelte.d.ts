import { SvelteComponent, type ComponentProps } from "svelte";
import { Popover } from "@ark-ui/svelte/popover";
import type { PopoverDescriptionProps } from "@ark-ui/svelte/popover";

export default class LoongArkPopoverDescription extends SvelteComponent<
  Omit<
    ComponentProps<typeof Popover.Description>,
    "children" | "asChild" | "id"
  > & {
    asChild?: PopoverDescriptionProps["asChild"];
    id?: PopoverDescriptionProps["id"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
