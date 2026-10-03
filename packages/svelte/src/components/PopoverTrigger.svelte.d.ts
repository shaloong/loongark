import { SvelteComponent, type ComponentProps } from "svelte";
import { Popover } from "@ark-ui/svelte/popover";
import type { PopoverTriggerProps } from "@ark-ui/svelte/popover";

export default class LoongArkPopoverTrigger extends SvelteComponent<
  Omit<
    ComponentProps<typeof Popover.Trigger>,
    "children" | "asChild" | "id" | "disabled"
  > & {
    asChild?: PopoverTriggerProps["asChild"] | undefined;
    id?: PopoverTriggerProps["id"];
    disabled?: PopoverTriggerProps["disabled"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
