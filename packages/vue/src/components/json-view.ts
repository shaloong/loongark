import { computed, defineComponent, h, toValue } from "vue";
import {
  JsonTreeView,
  type JsonTreeViewRootProps,
  type UseJsonTreeViewProps,
  type UseJsonTreeViewReturn,
} from "@ark-ui/vue/json-tree-view";
import { createTreeCollection, useTreeView } from "@ark-ui/vue/tree-view";
import {
  expandedJsonBranches,
  jsonCollectionOptions,
  splitJsonTreeProps,
} from "@loongark/kit";
/** Ark npm 版的 splitProps 在 setup 拍快照；每次计算重新分割以同步数据和格式选项。 */
export function useJsonTreeView(
  props: import("vue").MaybeRef<UseJsonTreeViewProps>,
  emit?: Parameters<
    typeof useTreeView<ReturnType<typeof jsonCollectionOptions>["rootNode"]>
  >[1],
): UseJsonTreeViewReturn {
  const data = computed(() => toValue(props).data);
  const collection = computed(() =>
    createTreeCollection(jsonCollectionOptions(data.value)),
  );
  const split = computed(() => splitJsonTreeProps(toValue(props)));
  const machine = computed(() => {
    const { defaultExpandedDepth, treeProps } = split.value;
    return {
      ...treeProps,
      defaultExpandedValue:
        treeProps.defaultExpandedValue ??
        expandedJsonBranches(collection.value, defaultExpandedDepth),
      collection: collection.value,
      typeahead: false,
    };
  });
  const tree = useTreeView(machine, emit);
  return computed(() => ({ ...tree.value, options: split.value.options }));
}
export type LoongArkJsonTreeViewRootProps = Omit<
  JsonTreeViewRootProps,
  "data"
> & { data: unknown };
export const LoongArkJsonTreeViewRoot = defineComponent(
  (props: LoongArkJsonTreeViewRootProps, { attrs, slots, emit }) => {
    const tree = useJsonTreeView(
      computed(() => ({ ...attrs, ...props })),
      emit,
    );
    return () =>
      h(
        JsonTreeView.RootProvider,
        {
          ...attrs,
          lazyMount: props.lazyMount,
          unmountOnExit: props.unmountOnExit,
          asChild: props.asChild,
          value: tree.value,
        },
        slots,
      );
  },
  {
    name: "LoongArkJsonTreeViewRoot",
    inheritAttrs: false,
    emits: [
      "expandedChange",
      "focusChange",
      "selectionChange",
      "checkedChange",
      "loadChildrenComplete",
      "loadChildrenError",
      "renameStart",
      "beforeRename",
      "renameComplete",
      "update:expandedValue",
      "update:focusedValue",
      "update:selectedValue",
      "update:checkedValue",
    ],
    props: [
      "data",
      "defaultExpandedDepth",
      "maxPreviewItems",
      "collapseStringsAfterLength",
      "quotesOnKeys",
      "groupArraysAfterLength",
      "showNonenumerable",
      "defaultExpandedValue",
      "defaultSelectedValue",
      "defaultCheckedValue",
      "defaultFocusedValue",
      "checkedValue",
      "expandOnClick",
      "expandedValue",
      "focusedValue",
      "id",
      "ids",
      "selectedValue",
      "selectionMode",
      "typeahead",
      "loadChildren",
      "canRename",
      "lazyMount",
      "unmountOnExit",
      "asChild",
      "translations",
    ],
  },
);
