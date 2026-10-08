import { SvelteComponent, type ComponentProps } from "svelte";
import { HoverCard } from "@ark-ui/svelte/hover-card";
import type { HoverCardArrowTipProps } from "@ark-ui/svelte/hover-card";

export default class LoongArkHoverCardArrowTip extends SvelteComponent<
  Omit<ComponentProps<typeof HoverCard.ArrowTip>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
