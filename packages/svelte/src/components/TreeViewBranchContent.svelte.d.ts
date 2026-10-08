import { SvelteComponent, type ComponentProps } from "svelte";
import { TreeView } from "@ark-ui/svelte/tree-view";
import type { TreeViewBranchContentProps } from "@ark-ui/svelte/tree-view";

export default class LoongArkTreeViewBranchContent extends SvelteComponent<
  Omit<ComponentProps<typeof TreeView.BranchContent>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
