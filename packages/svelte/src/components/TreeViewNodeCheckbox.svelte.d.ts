import { SvelteComponent, type ComponentProps } from "svelte";
import { TreeView } from "@ark-ui/svelte/tree-view";
import type { TreeViewNodeCheckboxProps } from "@ark-ui/svelte/tree-view";

export default class LoongArkTreeViewNodeCheckbox extends SvelteComponent<
  Omit<ComponentProps<typeof TreeView.NodeCheckbox>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
