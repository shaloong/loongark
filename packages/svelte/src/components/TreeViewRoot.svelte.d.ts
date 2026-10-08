import { SvelteComponent } from "svelte";
import type { TreeNode } from "@ark-ui/svelte/collection";
import type { TreeViewRootProps } from "@ark-ui/svelte/tree-view";
import type { TreeViewSize } from "@loongark/primitives";

export default class LoongArkTreeViewRoot<
  T extends TreeNode = TreeNode,
> extends SvelteComponent<
  Omit<TreeViewRootProps<T>, "children" | "size"> & {
    size?: TreeViewSize;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
