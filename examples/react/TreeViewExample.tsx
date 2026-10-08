import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "@loongark/react";
import React from "react";

import { TreeView, createTreeCollection } from "@ark-ui/react/tree-view";

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
  LoongArkTreeViewNodeCheckbox,
  LoongArkTreeViewNodeCheckboxIndicator,
  LoongArkTreeViewNodeRenameInput,
} from "@loongark/react";

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
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: { id: "ROOT", name: "", children: nodes },
});

interface TreeViewDemoProps {
  size?: "sm" | "md" | "lg";
  showCheckbox?: boolean;
  showRename?: boolean;
}

const TreeViewDemo = ({
  size = "md",
  showCheckbox = false,
  showRename = false,
}: TreeViewDemoProps) => {
  return (
    <LoongArkTreeViewRoot size={size} collection={collection}>
      <LoongArkTreeViewLabel>Workspace</LoongArkTreeViewLabel>
      <LoongArkTreeViewTree>
        <TreeView.NodeProvider node={nodes[0]} indexPath={[0]}>
          <LoongArkTreeViewBranch style={{ position: "relative" }}>
            {showCheckbox && (
              <LoongArkTreeViewNodeCheckbox
                aria-label="Select src"
                style={{
                  position: "absolute",
                  insetInlineStart: "var(--lk-space-component-sm)",
                  top: "var(--lk-space-component-sm)",
                  zIndex: 1,
                }}
              >
                <LoongArkTreeViewNodeCheckboxIndicator />
              </LoongArkTreeViewNodeCheckbox>
            )}
            <LoongArkTreeViewBranchControl
              style={
                showCheckbox
                  ? { paddingInlineStart: "var(--lk-control-height-md)" }
                  : undefined
              }
            >
              <LoongArkTreeViewBranchTrigger>
                <LoongArkTreeViewBranchIndicator>
                  <LoongArkIcon icon={controlIcons.chevronRight} size="sm" />
                </LoongArkTreeViewBranchIndicator>
                <LoongArkTreeViewBranchText>src</LoongArkTreeViewBranchText>
              </LoongArkTreeViewBranchTrigger>
              {showRename && <LoongArkTreeViewNodeRenameInput value="src" />}
            </LoongArkTreeViewBranchControl>
            <LoongArkTreeViewBranchIndentGuide>
              <LoongArkTreeViewBranchContent>
                <TreeView.NodeProvider
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
                </TreeView.NodeProvider>
                <TreeView.NodeProvider
                  node={nodes[0].children![1]}
                  indexPath={[0, 1]}
                >
                  <LoongArkTreeViewItem>
                    <LoongArkTreeViewItemIndicator>
                      -
                    </LoongArkTreeViewItemIndicator>
                    <LoongArkTreeViewItemText>styles</LoongArkTreeViewItemText>
                  </LoongArkTreeViewItem>
                </TreeView.NodeProvider>
              </LoongArkTreeViewBranchContent>
            </LoongArkTreeViewBranchIndentGuide>
          </LoongArkTreeViewBranch>
        </TreeView.NodeProvider>
        <TreeView.NodeProvider node={nodes[1]} indexPath={[1]}>
          <LoongArkTreeViewItem>
            <LoongArkTreeViewItemIndicator>-</LoongArkTreeViewItemIndicator>
            <LoongArkTreeViewItemText>package.json</LoongArkTreeViewItemText>
          </LoongArkTreeViewItem>
        </TreeView.NodeProvider>
      </LoongArkTreeViewTree>
    </LoongArkTreeViewRoot>
  );
};
export const TreeViewExample = TreeViewDemo;
export type TreeViewExampleProps = Parameters<typeof TreeViewDemo>[0];
