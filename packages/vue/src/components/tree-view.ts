import { renderPart } from "../render-part";
/**
 * Tree View component - Vue wrapper.
 * Uses Ark UI Tree View with data attributes for styling.
 */
import { defineComponent, h, type PropType } from "vue";
import { TreeView as ArkTreeView } from "@ark-ui/vue/tree-view";
import type { TreeViewSize } from "@loongark/primitives";

export const LoongArkTreeViewRoot = defineComponent({
  name: "LoongArkTreeViewRoot",
  props: {
    size: {
      type: String as PropType<TreeViewSize>,
      default: "md",
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTreeView.Root,
        {
          ...attrs,
          ...props,
          "data-scope": "tree-view",
          "data-part": "root",
          "data-size": props.size,
        },
        slots,
      );
  },
});

export const LoongArkTreeViewLabel = defineComponent({
  name: "LoongArkTreeViewLabel",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTreeView.Label,
        {
          ...attrs,
          "data-scope": "tree-view",
          "data-part": "label",
        },
        slots,
      );
  },
});

export const LoongArkTreeViewTree = defineComponent({
  name: "LoongArkTreeViewTree",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTreeView.Tree,
        {
          ...attrs,
          "data-scope": "tree-view",
          "data-part": "tree",
        },
        slots,
      );
  },
});

export const LoongArkTreeViewItem = defineComponent({
  name: "LoongArkTreeViewItem",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTreeView.Item,
        {
          ...attrs,
          "data-scope": "tree-view",
          "data-part": "item",
        },
        slots,
      );
  },
});

export const LoongArkTreeViewItemIndicator = defineComponent({
  name: "LoongArkTreeViewItemIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTreeView.ItemIndicator,
        {
          ...attrs,
          "data-scope": "tree-view",
          "data-part": "item-indicator",
        },
        slots,
      );
  },
});

export const LoongArkTreeViewItemText = defineComponent({
  name: "LoongArkTreeViewItemText",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTreeView.ItemText,
        {
          ...attrs,
          "data-scope": "tree-view",
          "data-part": "item-text",
        },
        slots,
      );
  },
});

export const LoongArkTreeViewBranch = defineComponent({
  name: "LoongArkTreeViewBranch",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTreeView.Branch,
        {
          ...attrs,
          "data-scope": "tree-view",
          "data-part": "branch",
        },
        slots,
      );
  },
});

export const LoongArkTreeViewBranchContent = defineComponent({
  name: "LoongArkTreeViewBranchContent",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTreeView.BranchContent,
        {
          ...attrs,
          "data-scope": "tree-view",
          "data-part": "branch-content",
        },
        slots,
      );
  },
});

export const LoongArkTreeViewBranchControl = defineComponent({
  name: "LoongArkTreeViewBranchControl",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTreeView.BranchControl,
        {
          ...attrs,
          "data-scope": "tree-view",
          "data-part": "branch-control",
        },
        slots,
      );
  },
});

export const LoongArkTreeViewBranchTrigger = defineComponent({
  name: "LoongArkTreeViewBranchTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTreeView.BranchTrigger,
        {
          ...attrs,
          "data-scope": "tree-view",
          "data-part": "branch-trigger",
        },
        slots,
      );
  },
});

export const LoongArkTreeViewBranchIndicator = defineComponent({
  name: "LoongArkTreeViewBranchIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTreeView.BranchIndicator,
        {
          ...attrs,
          "data-scope": "tree-view",
          "data-part": "branch-indicator",
        },
        slots,
      );
  },
});

export const LoongArkTreeViewBranchText = defineComponent({
  name: "LoongArkTreeViewBranchText",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTreeView.BranchText,
        {
          ...attrs,
          "data-scope": "tree-view",
          "data-part": "branch-text",
        },
        slots,
      );
  },
});

export const LoongArkTreeViewBranchIndentGuide = defineComponent({
  name: "LoongArkTreeViewBranchIndentGuide",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTreeView.BranchIndentGuide,
        {
          ...attrs,
          "data-scope": "tree-view",
          "data-part": "branch-indent-guide",
        },
        slots,
      );
  },
});

export const LoongArkTreeViewNodeCheckbox = defineComponent({
  name: "LoongArkTreeViewNodeCheckbox",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTreeView.NodeCheckbox,
        {
          ...attrs,
          "data-scope": "tree-view",
          "data-part": "node-checkbox",
        },
        slots,
      );
  },
});

export const LoongArkTreeViewNodeCheckboxIndicator = defineComponent({
  name: "LoongArkTreeViewNodeCheckboxIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTreeView.NodeCheckboxIndicator,
        {
          ...attrs,
          "data-scope": "tree-view",
          "data-part": "node-checkbox-indicator",
        },
        slots,
      );
  },
});

export const LoongArkTreeViewNodeRenameInput = defineComponent({
  name: "LoongArkTreeViewNodeRenameInput",
  setup(_, { attrs }) {
    return () =>
      renderPart(ArkTreeView.NodeRenameInput, {
        ...attrs,
        "data-scope": "tree-view",
        "data-part": "node-rename-input",
      });
  },
});
