import { SvelteComponent, type ComponentProps } from "svelte";
import { HoverCard } from "@ark-ui/svelte/hover-card";
import type { HoverCardContentProps } from "@ark-ui/svelte/hover-card";

export default class LoongArkHoverCardContent extends SvelteComponent<
  Omit<ComponentProps<typeof HoverCard.Content>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
