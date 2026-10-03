import { SvelteComponent, type ComponentProps } from "svelte";
import { Tooltip } from "@ark-ui/svelte/tooltip";
import type { TooltipRootProps } from "@ark-ui/svelte/tooltip";

export default class LoongArkTooltipRoot extends SvelteComponent<
  Omit<TooltipRootProps, "id"> & { id?: string },
  Record<string, never>,
  { default: Record<string, never> }
> {}
