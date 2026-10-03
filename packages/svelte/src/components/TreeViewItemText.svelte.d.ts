import { SvelteComponent, type ComponentProps } from "svelte";
import { TreeView } from "@ark-ui/svelte/tree-view";
import type { TreeViewItemTextProps } from "@ark-ui/svelte/tree-view";

export default class LoongArkTreeViewItemText extends SvelteComponent<
  Omit<ComponentProps<typeof TreeView.ItemText>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
