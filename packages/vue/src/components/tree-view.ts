
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticTreeViewStyles } from "@loongark/primitives/automatic-styles/tree-view";
import { renderPart } from "../render-part";
/**
 * Tree View component - Vue wrapper.
 * Uses Ark UI Tree View with data attributes for styling.
 */
import {
  resolveDynamicComponent,
  defineComponent,
  h,
  type PropType,
} from "vue";
import { TreeView as ArkTreeView } from "@ark-ui/vue/tree-view";
import type { TreeViewSize } from "@loongark/primitives";

export const LoongArkTreeViewRoot = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticTreeViewStyles);

export const LoongArkTreeViewLabel = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticTreeViewStyles);

export const LoongArkTreeViewTree = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticTreeViewStyles);

export const LoongArkTreeViewItem = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticTreeViewStyles);

export const LoongArkTreeViewItemIndicator = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticTreeViewStyles);

export const LoongArkTreeViewItemText = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticTreeViewStyles);

export const LoongArkTreeViewBranch = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticTreeViewStyles);

export const LoongArkTreeViewBranchContent = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticTreeViewStyles);

export const LoongArkTreeViewBranchControl = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticTreeViewStyles);

export const LoongArkTreeViewBranchTrigger = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticTreeViewStyles);

export const LoongArkTreeViewBranchIndicator = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticTreeViewStyles);

export const LoongArkTreeViewBranchText = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticTreeViewStyles);

export const LoongArkTreeViewBranchIndentGuide = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticTreeViewStyles);

export const LoongArkTreeViewNodeCheckbox = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticTreeViewStyles);

export const LoongArkTreeViewNodeCheckboxIndicator = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticTreeViewStyles);

export const LoongArkTreeViewNodeRenameInput = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkTreeViewNodeRenameInput",
  setup(_, { attrs }) {
    return () =>
      renderPart(resolveDynamicComponent(ArkTreeView.NodeRenameInput), {
        ...attrs,
        "data-scope": "tree-view",
        "data-part": "node-rename-input",
      });
  },
}), lkAutomaticTreeViewStyles);
