import { SvelteComponent, type ComponentProps } from "svelte";
import { ScrollArea } from "@ark-ui/svelte/scroll-area";
import type { ScrollAreaContentProps } from "@ark-ui/svelte/scroll-area";

export default class LoongArkScrollAreaContent extends SvelteComponent<
  Omit<ComponentProps<typeof ScrollArea.Content>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
