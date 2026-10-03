import { SvelteComponent, type ComponentProps } from "svelte";
import { ScrollArea } from "@ark-ui/svelte/scroll-area";
import type { ScrollAreaRootProps } from "@ark-ui/svelte/scroll-area";
import type { ScrollAreaSize } from "@loongark/primitives";

export default class LoongArkScrollAreaRoot extends SvelteComponent<
  Omit<ComponentProps<typeof ScrollArea.Root>, "children" | "size"> & {
    size?: ScrollAreaSize;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
