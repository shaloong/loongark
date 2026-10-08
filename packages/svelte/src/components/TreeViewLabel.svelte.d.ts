import { SvelteComponent, type ComponentProps } from "svelte";
import { TreeView } from "@ark-ui/svelte/tree-view";
import type { TreeViewLabelProps } from "@ark-ui/svelte/tree-view";

export default class LoongArkTreeViewLabel extends SvelteComponent<
  Omit<ComponentProps<typeof TreeView.Label>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
