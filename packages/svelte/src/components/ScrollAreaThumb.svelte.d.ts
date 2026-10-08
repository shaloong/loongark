import { SvelteComponent, type ComponentProps } from "svelte";
import { ScrollArea } from "@ark-ui/svelte/scroll-area";
import type { ScrollAreaThumbProps } from "@ark-ui/svelte/scroll-area";

export default class LoongArkScrollAreaThumb extends SvelteComponent<
  Omit<ComponentProps<typeof ScrollArea.Thumb>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
