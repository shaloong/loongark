import { SvelteComponent, type ComponentProps } from "svelte";
import { HoverCard } from "@ark-ui/svelte/hover-card";
import type { HoverCardPositionerProps } from "@ark-ui/svelte/hover-card";

export default class LoongArkHoverCardPositioner extends SvelteComponent<
  Omit<ComponentProps<typeof HoverCard.Positioner>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
