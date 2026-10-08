import { SvelteComponent, type ComponentProps } from "svelte";
import { HoverCard } from "@ark-ui/svelte/hover-card";
import type { HoverCardRootProps } from "@ark-ui/svelte/hover-card";
import type { HoverCardSize } from "@loongark/primitives";

export default class LoongArkHoverCardRoot extends SvelteComponent<
  Omit<ComponentProps<typeof HoverCard.Root>, "children" | "size"> & {
    size?: HoverCardSize;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
