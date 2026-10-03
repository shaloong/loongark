import { SvelteComponent, type ComponentProps } from "svelte";
import { TreeView } from "@ark-ui/svelte/tree-view";
import type { TreeViewBranchIndentGuideProps } from "@ark-ui/svelte/tree-view";

export default class LoongArkTreeViewBranchIndentGuide extends SvelteComponent<
  Omit<ComponentProps<typeof TreeView.BranchIndentGuide>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
