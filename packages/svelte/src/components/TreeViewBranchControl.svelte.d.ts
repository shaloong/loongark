import { SvelteComponent, type ComponentProps } from "svelte";
import { TreeView } from "@ark-ui/svelte/tree-view";
import type { TreeViewBranchControlProps } from "@ark-ui/svelte/tree-view";

export default class LoongArkTreeViewBranchControl extends SvelteComponent<
  Omit<ComponentProps<typeof TreeView.BranchControl>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
