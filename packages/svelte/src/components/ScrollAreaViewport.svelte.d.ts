import { SvelteComponent, type ComponentProps } from "svelte";
import { ScrollArea } from "@ark-ui/svelte/scroll-area";
import type { ScrollAreaViewportProps } from "@ark-ui/svelte/scroll-area";

export default class LoongArkScrollAreaViewport extends SvelteComponent<
  Omit<ComponentProps<typeof ScrollArea.Viewport>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
