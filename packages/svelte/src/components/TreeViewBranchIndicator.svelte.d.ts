import { SvelteComponent, type ComponentProps } from "svelte";
import { TreeView } from "@ark-ui/svelte/tree-view";
import type { TreeViewBranchIndicatorProps } from "@ark-ui/svelte/tree-view";

export default class LoongArkTreeViewBranchIndicator extends SvelteComponent<
  Omit<ComponentProps<typeof TreeView.BranchIndicator>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
