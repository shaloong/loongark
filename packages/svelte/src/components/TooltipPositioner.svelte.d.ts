import { SvelteComponent, type ComponentProps } from "svelte";
import { Tooltip } from "@ark-ui/svelte/tooltip";
import type { TooltipPositionerProps } from "@ark-ui/svelte/tooltip";

export default class LoongArkTooltipPositioner extends SvelteComponent<
  Omit<ComponentProps<typeof Tooltip.Positioner>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
