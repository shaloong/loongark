import { SvelteComponent, type ComponentProps } from "svelte";
import { HoverCard } from "@ark-ui/svelte/hover-card";
import type { HoverCardTriggerProps } from "@ark-ui/svelte/hover-card";

export default class LoongArkHoverCardTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof HoverCard.Trigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
