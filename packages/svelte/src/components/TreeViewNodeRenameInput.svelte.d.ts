import { SvelteComponent, type ComponentProps } from "svelte";
import { TreeView } from "@ark-ui/svelte/tree-view";
import type { TreeViewNodeRenameInputProps } from "@ark-ui/svelte/tree-view";

export default class LoongArkTreeViewNodeRenameInput extends SvelteComponent<
  Omit<ComponentProps<typeof TreeView.NodeRenameInput>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
