import { SvelteComponent, type ComponentProps } from "svelte";
import { HoverCard } from "@ark-ui/svelte/hover-card";
import type { HoverCardArrowProps } from "@ark-ui/svelte/hover-card";

export default class LoongArkHoverCardArrow extends SvelteComponent<
  Omit<ComponentProps<typeof HoverCard.Arrow>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
