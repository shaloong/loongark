import { SvelteComponent, type ComponentProps } from "svelte";
import { Tooltip } from "@ark-ui/svelte/tooltip";

export default class LoongArkTooltipTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof Tooltip.Trigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
