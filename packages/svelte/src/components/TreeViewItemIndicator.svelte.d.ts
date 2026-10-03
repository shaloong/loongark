import { SvelteComponent, type ComponentProps } from "svelte";
import { TreeView } from "@ark-ui/svelte/tree-view";
import type { TreeViewItemIndicatorProps } from "@ark-ui/svelte/tree-view";

export default class LoongArkTreeViewItemIndicator extends SvelteComponent<
  Omit<ComponentProps<typeof TreeView.ItemIndicator>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
