import { SvelteComponent, type ComponentProps } from "svelte";
import { Splitter } from "@ark-ui/svelte/splitter";
import type { SplitterPanelProps } from "@ark-ui/svelte/splitter";

export default class LoongArkSplitterPanel extends SvelteComponent<
  Omit<ComponentProps<typeof Splitter.Panel>, "children" | "id"> & {
    id: SplitterPanelProps["id"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
