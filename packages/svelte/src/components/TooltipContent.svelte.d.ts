import { SvelteComponent, type ComponentProps } from "svelte";
import { Tooltip } from "@ark-ui/svelte/tooltip";
import type { TooltipContentProps } from "@ark-ui/svelte/tooltip";

export default class LoongArkTooltipContent extends SvelteComponent<
  Omit<ComponentProps<typeof Tooltip.Content>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
