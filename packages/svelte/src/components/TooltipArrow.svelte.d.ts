import { SvelteComponent, type ComponentProps } from "svelte";
import { Tooltip } from "@ark-ui/svelte/tooltip";
import type { TooltipArrowProps } from "@ark-ui/svelte/tooltip";

export default class LoongArkTooltipArrow extends SvelteComponent<
  Omit<ComponentProps<typeof Tooltip.Arrow>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
