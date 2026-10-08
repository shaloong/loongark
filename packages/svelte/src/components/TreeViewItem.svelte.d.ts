import { SvelteComponent, type ComponentProps } from "svelte";
import { TreeView } from "@ark-ui/svelte/tree-view";
import type { TreeViewItemProps } from "@ark-ui/svelte/tree-view";

export default class LoongArkTreeViewItem extends SvelteComponent<
  Omit<ComponentProps<typeof TreeView.Item>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
