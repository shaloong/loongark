import { SvelteComponent, type ComponentProps } from "svelte";
import { Splitter } from "@ark-ui/svelte/splitter";
import type { SplitterResizeTriggerIndicatorProps } from "@ark-ui/svelte/splitter";

export default class LoongArkSplitterResizeTriggerIndicator extends SvelteComponent<
  Omit<ComponentProps<typeof Splitter.ResizeTriggerIndicator>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
