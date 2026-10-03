import { SvelteComponent, type ComponentProps } from "svelte";
import { Tooltip } from "@ark-ui/svelte/tooltip";
import type { TooltipArrowTipProps } from "@ark-ui/svelte/tooltip";

export default class LoongArkTooltipArrowTip extends SvelteComponent<
  Omit<ComponentProps<typeof Tooltip.ArrowTip>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
