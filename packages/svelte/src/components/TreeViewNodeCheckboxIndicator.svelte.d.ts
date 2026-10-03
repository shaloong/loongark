import { SvelteComponent, type ComponentProps } from "svelte";
import { TreeView } from "@ark-ui/svelte/tree-view";
import type { TreeViewNodeCheckboxIndicatorProps } from "@ark-ui/svelte/tree-view";

export default class LoongArkTreeViewNodeCheckboxIndicator extends SvelteComponent<
  Omit<ComponentProps<typeof TreeView.NodeCheckboxIndicator>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
