import { defineComponent, h, type PropType } from "vue";
import {
  LoongArkTreeViewRoot,
  LoongArkTreeViewLabel,
  LoongArkTreeViewTree,
  LoongArkTreeViewItem,
  LoongArkTreeViewItemIndicator,
  LoongArkTreeViewItemText,
  LoongArkTreeViewBranch,
  LoongArkTreeViewBranchContent,
  LoongArkTreeViewBranchControl,
  LoongArkTreeViewBranchTrigger,
  LoongArkTreeViewBranchIndicator,
  LoongArkTreeViewBranchText,
  LoongArkTreeViewBranchIndentGuide,
} from "@loongark/vue";
import type { TreeViewSize } from "@loongark/primitives";

export const TreeViewExample = defineComponent({
  name: "TreeViewExample",
  props: {
    size: {
      type: String as PropType<TreeViewSize>,
      default: "md",
    },
  },
  setup(props) {
    return () =>
      h(LoongArkTreeViewRoot, { size: props.size }, {
        default: () => [
          h(LoongArkTreeViewLabel, null, { default: () => "Workspace" }),
          h(LoongArkTreeViewTree, null, {
            default: () => [
              h(LoongArkTreeViewBranch, { value: "src" }, {
                default: () => [
                  h(LoongArkTreeViewBranchControl, null, {
                    default: () =>
                      h(LoongArkTreeViewBranchTrigger, null, {
                        default: () => [
                          h(LoongArkTreeViewBranchIndicator, null, { default: () => ">" }),
                          h(LoongArkTreeViewBranchText, null, { default: () => "src" }),
                        ],
                      }),
                  }),
                  h(LoongArkTreeViewBranchIndentGuide, null, {
                    default: () =>
                      h(LoongArkTreeViewBranchContent, null, {
                        default: () => [
                          h(LoongArkTreeViewItem, { value: "components" }, {
                            default: () => [
                              h(LoongArkTreeViewItemIndicator, null, { default: () => "-" }),
                              h(LoongArkTreeViewItemText, null, { default: () => "components" }),
                            ],
                          }),
                          h(LoongArkTreeViewItem, { value: "styles" }, {
                            default: () => [
                              h(LoongArkTreeViewItemIndicator, null, { default: () => "-" }),
                              h(LoongArkTreeViewItemText, null, { default: () => "styles" }),
                            ],
                          }),
                        ],
                      }),
                  }),
                ],
              }),
              h(LoongArkTreeViewItem, { value: "package.json" }, {
                default: () => [
                  h(LoongArkTreeViewItemIndicator, null, { default: () => "-" }),
                  h(LoongArkTreeViewItemText, null, { default: () => "package.json" }),
                ],
              }),
            ],
          }),
        ],
      });
  },
});
