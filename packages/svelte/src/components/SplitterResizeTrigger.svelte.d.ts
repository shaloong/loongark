import { SvelteComponent, type ComponentProps } from "svelte";
import { Splitter } from "@ark-ui/svelte/splitter";
import type { SplitterResizeTriggerProps } from "@ark-ui/svelte/splitter";

export default class LoongArkSplitterResizeTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof Splitter.ResizeTrigger>, "children" | "id"> & {
    id: SplitterResizeTriggerProps["id"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
