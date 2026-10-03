import { SvelteComponent, type ComponentProps } from "svelte";
import { TreeView } from "@ark-ui/svelte/tree-view";
import type { TreeViewBranchTextProps } from "@ark-ui/svelte/tree-view";

export default class LoongArkTreeViewBranchText extends SvelteComponent<
  Omit<ComponentProps<typeof TreeView.BranchText>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
