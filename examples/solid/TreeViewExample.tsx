import type { Component } from "solid-js";
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
} from "@loongark/solid";
import type { TreeViewSize } from "@loongark/primitives";

interface TreeViewExampleProps {
  size?: TreeViewSize;
}

export const TreeViewExample: Component<TreeViewExampleProps> = (props) => {
  const size = () => props.size ?? "md";

  return (
    <LoongArkTreeViewRoot size={size()}>
      <LoongArkTreeViewLabel>Workspace</LoongArkTreeViewLabel>
      <LoongArkTreeViewTree>
        <LoongArkTreeViewBranch value="src">
          <LoongArkTreeViewBranchControl>
            <LoongArkTreeViewBranchTrigger>
              <LoongArkTreeViewBranchIndicator>{">"}</LoongArkTreeViewBranchIndicator>
              <LoongArkTreeViewBranchText>src</LoongArkTreeViewBranchText>
            </LoongArkTreeViewBranchTrigger>
          </LoongArkTreeViewBranchControl>
          <LoongArkTreeViewBranchIndentGuide>
            <LoongArkTreeViewBranchContent>
              <LoongArkTreeViewItem value="components">
                <LoongArkTreeViewItemIndicator>-</LoongArkTreeViewItemIndicator>
                <LoongArkTreeViewItemText>components</LoongArkTreeViewItemText>
              </LoongArkTreeViewItem>
              <LoongArkTreeViewItem value="styles">
                <LoongArkTreeViewItemIndicator>-</LoongArkTreeViewItemIndicator>
                <LoongArkTreeViewItemText>styles</LoongArkTreeViewItemText>
              </LoongArkTreeViewItem>
            </LoongArkTreeViewBranchContent>
          </LoongArkTreeViewBranchIndentGuide>
        </LoongArkTreeViewBranch>
        <LoongArkTreeViewItem value="package.json">
          <LoongArkTreeViewItemIndicator>-</LoongArkTreeViewItemIndicator>
          <LoongArkTreeViewItemText>package.json</LoongArkTreeViewItemText>
        </LoongArkTreeViewItem>
      </LoongArkTreeViewTree>
    </LoongArkTreeViewRoot>
  );
};
