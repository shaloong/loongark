import { SvelteComponent, type ComponentProps } from "svelte";
import { Popover } from "@ark-ui/svelte/popover";
import type { PopoverPositionerProps } from "@ark-ui/svelte/popover";

export default class LoongArkPopoverPositioner extends SvelteComponent<
  Omit<ComponentProps<typeof Popover.Positioner>, "children" | "id"> & {
    id?: PopoverPositionerProps["id"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
