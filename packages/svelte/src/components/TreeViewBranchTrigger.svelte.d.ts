import { SvelteComponent, type ComponentProps } from "svelte";
import { TreeView } from "@ark-ui/svelte/tree-view";
import type { TreeViewBranchTriggerProps } from "@ark-ui/svelte/tree-view";

export default class LoongArkTreeViewBranchTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof TreeView.BranchTrigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
