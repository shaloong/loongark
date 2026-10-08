import { SvelteComponent, type ComponentProps } from "svelte";
import { ScrollArea } from "@ark-ui/svelte/scroll-area";
import type { ScrollAreaCornerProps } from "@ark-ui/svelte/scroll-area";

export default class LoongArkScrollAreaCorner extends SvelteComponent<
  Omit<ComponentProps<typeof ScrollArea.Corner>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
