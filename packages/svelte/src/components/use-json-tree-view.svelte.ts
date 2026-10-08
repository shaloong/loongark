import { untrack } from "svelte";
import type {
  UseJsonTreeViewProps,
  UseJsonTreeViewReturn,
} from "@ark-ui/svelte/json-tree-view";
import { createTreeCollection, useTreeView } from "@ark-ui/svelte/tree-view";
import {
  expandedJsonBranches,
  jsonCollectionOptions,
  splitJsonTreeProps,
} from "@loongark/kit";
export function useJsonTreeView(
  props: UseJsonTreeViewProps | (() => UseJsonTreeViewProps),
): UseJsonTreeViewReturn {
  const data = $derived((typeof props === "function" ? props() : props).data);
  const collection = $derived(
    createTreeCollection(jsonCollectionOptions(data)),
  );
  const split = $derived(
    splitJsonTreeProps(typeof props === "function" ? props() : props),
  );
  const machine = $derived.by(() => {
    const { defaultExpandedDepth, treeProps } = split;
    return {
      ...treeProps,
      defaultExpandedValue:
        treeProps.defaultExpandedValue ??
        untrack(() => expandedJsonBranches(collection, defaultExpandedDepth)),
      collection,
      typeahead: false,
    };
  });
  const tree = useTreeView(() => machine);
  return () => ({ ...tree(), options: split.options });
}
