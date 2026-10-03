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
  LoongArkTreeViewNodeProvider,
  createTreeCollection,
} from "@loongark/vue";
import type { TreeViewSize } from "@loongark/primitives";

interface WorkspaceNode {
  id: string;
  name: string;
  children?: WorkspaceNode[];
}
const nodes: WorkspaceNode[] = [
  {
    id: "src",
    name: "src",
    children: [
      { id: "components", name: "components" },
      { id: "styles", name: "styles" },
    ],
  },
  { id: "package.json", name: "package.json" },
];
const collection = createTreeCollection<WorkspaceNode>({
  rootNode: { id: "ROOT", name: "", children: nodes },
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
});

export const TreeViewExample = defineComponent({
  name: "TreeViewExample",
  props: {
    size: {
      type: String as PropType<TreeViewSize>,
      default: "md",
    },
  },
  setup(props) {
    const renderNode = (
      node: WorkspaceNode,
      indexPath: number[],
    ): ReturnType<typeof h> =>
      h(
        LoongArkTreeViewNodeProvider,
        { node, indexPath },
        {
          default: () =>
            node.children
              ? h(
                  LoongArkTreeViewBranch,
                  {},
                  {
                    default: () => [
                      h(
                        LoongArkTreeViewBranchControl,
                        {},
                        {
                          default: () => [
                            h(LoongArkTreeViewBranchIndicator, {}, () => ">"),
                            h(LoongArkTreeViewBranchText, {}, () => node.name),
                          ],
                        },
                      ),
                      h(
                        LoongArkTreeViewBranchContent,
                        {},
                        {
                          default: () =>
                            node.children!.map((child, index) =>
                              renderNode(child, [...indexPath, index]),
                            ),
                        },
                      ),
                    ],
                  },
                )
              : h(
                  LoongArkTreeViewItem,
                  {},
                  {
                    default: () => [
                      h(LoongArkTreeViewItemIndicator, {}, () => "-"),
                      h(LoongArkTreeViewItemText, {}, () => node.name),
                    ],
                  },
                ),
        },
      );
    return () =>
      h(
        LoongArkTreeViewRoot,
        { size: props.size, collection },
        {
          default: () => [
            h(LoongArkTreeViewLabel, null, { default: () => "Workspace" }),
            h(LoongArkTreeViewTree, null, {
              default: () =>
                nodes.map((node, index) => renderNode(node, [index])),
            }),
          ],
        },
      );
  },
});
