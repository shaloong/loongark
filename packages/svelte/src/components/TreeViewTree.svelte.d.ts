import { SvelteComponent, type ComponentProps } from "svelte";
import { TreeView } from "@ark-ui/svelte/tree-view";
import type { TreeViewTreeProps } from "@ark-ui/svelte/tree-view";

export default class LoongArkTreeViewTree extends SvelteComponent<
  Omit<ComponentProps<typeof TreeView.Tree>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
