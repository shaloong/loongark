import { SvelteComponent, type ComponentProps } from "svelte";
import { TreeView } from "@ark-ui/svelte/tree-view";
import type { TreeViewBranchProps } from "@ark-ui/svelte/tree-view";

export default class LoongArkTreeViewBranch extends SvelteComponent<
  Omit<ComponentProps<typeof TreeView.Branch>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
