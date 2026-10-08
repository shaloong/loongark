import { SvelteComponent, type ComponentProps } from "svelte";
import { Splitter } from "@ark-ui/svelte/splitter";
import type { SplitterRootProps } from "@ark-ui/svelte/splitter";
import type { SplitterSize } from "@loongark/primitives";

export default class LoongArkSplitterRoot extends SvelteComponent<
  Omit<ComponentProps<typeof Splitter.Root>, "children" | "size" | "panels"> & {
    size?: SplitterSize;
    panels: SplitterRootProps["panels"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
