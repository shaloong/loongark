/** @jsxImportSource solid-js */
import type { Component } from "solid-js";
import {
  createTreeCollection,
  LoongArkTreeViewNodeProvider,
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
} from "@loongark/solid";
import type { TreeViewSize } from "@loongark/primitives";

interface Node {
  id: string;
  name: string;
  children?: Node[];
}
const nodes: Node[] = [
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
const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: { id: "ROOT", name: "", children: nodes },
});
interface TreeViewExampleProps {
  size?: TreeViewSize;
}

export const TreeViewExample: Component<TreeViewExampleProps> = (props) => {
  const size = () => props.size ?? "md";

  return (
    <LoongArkTreeViewRoot size={size()} collection={collection}>
      <LoongArkTreeViewLabel>Workspace</LoongArkTreeViewLabel>
      <LoongArkTreeViewTree>
        <LoongArkTreeViewNodeProvider node={nodes[0]} indexPath={[0]}>
          <LoongArkTreeViewBranch>
            <LoongArkTreeViewBranchControl>
              <LoongArkTreeViewBranchTrigger>
                <LoongArkTreeViewBranchIndicator>
                  {">"}
                </LoongArkTreeViewBranchIndicator>
                <LoongArkTreeViewBranchText>src</LoongArkTreeViewBranchText>
              </LoongArkTreeViewBranchTrigger>
            </LoongArkTreeViewBranchControl>
            <LoongArkTreeViewBranchIndentGuide>
              <LoongArkTreeViewBranchContent>
                <LoongArkTreeViewNodeProvider
                  node={nodes[0].children![0]}
                  indexPath={[0, 0]}
                >
                  <LoongArkTreeViewItem>
                    <LoongArkTreeViewItemIndicator>
                      -
                    </LoongArkTreeViewItemIndicator>
                    <LoongArkTreeViewItemText>
                      components
                    </LoongArkTreeViewItemText>
                  </LoongArkTreeViewItem>
                </LoongArkTreeViewNodeProvider>
                <LoongArkTreeViewNodeProvider
                  node={nodes[0].children![1]}
                  indexPath={[0, 1]}
                >
                  <LoongArkTreeViewItem>
                    <LoongArkTreeViewItemIndicator>
                      -
                    </LoongArkTreeViewItemIndicator>
                    <LoongArkTreeViewItemText>styles</LoongArkTreeViewItemText>
                  </LoongArkTreeViewItem>
                </LoongArkTreeViewNodeProvider>
              </LoongArkTreeViewBranchContent>
            </LoongArkTreeViewBranchIndentGuide>
          </LoongArkTreeViewBranch>
        </LoongArkTreeViewNodeProvider>
        <LoongArkTreeViewNodeProvider node={nodes[1]} indexPath={[1]}>
          <LoongArkTreeViewItem>
            <LoongArkTreeViewItemIndicator>-</LoongArkTreeViewItemIndicator>
            <LoongArkTreeViewItemText>package.json</LoongArkTreeViewItemText>
          </LoongArkTreeViewItem>
        </LoongArkTreeViewNodeProvider>
      </LoongArkTreeViewTree>
    </LoongArkTreeViewRoot>
  );
};
