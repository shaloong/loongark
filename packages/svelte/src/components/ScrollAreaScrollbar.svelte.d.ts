import { SvelteComponent, type ComponentProps } from "svelte";
import { ScrollArea } from "@ark-ui/svelte/scroll-area";
import type { ScrollAreaScrollbarProps } from "@ark-ui/svelte/scroll-area";

export default class LoongArkScrollAreaScrollbar extends SvelteComponent<
  Omit<ComponentProps<typeof ScrollArea.Scrollbar>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
