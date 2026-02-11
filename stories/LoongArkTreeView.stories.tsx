import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
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

const meta: Meta = {
  title: "Components/TreeView",
  parameters: {
    docs: {
      description: {
        component: "LoongArkTreeView renders structured, nested navigation.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

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
    <LoongArkTreeViewRoot size={size}>
      <LoongArkTreeViewLabel>Workspace</LoongArkTreeViewLabel>
      <LoongArkTreeViewTree>
        <LoongArkTreeViewBranch value="src">
          <LoongArkTreeViewBranchControl>
            {showCheckbox && (
              <LoongArkTreeViewNodeCheckbox>
                <LoongArkTreeViewNodeCheckboxIndicator />
              </LoongArkTreeViewNodeCheckbox>
            )}
            <LoongArkTreeViewBranchTrigger>
              <LoongArkTreeViewBranchIndicator>{">"}</LoongArkTreeViewBranchIndicator>
              <LoongArkTreeViewBranchText>src</LoongArkTreeViewBranchText>
            </LoongArkTreeViewBranchTrigger>
            {showRename && (
              <LoongArkTreeViewNodeRenameInput value="src" />
            )}
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

export const Basic: Story = {
  render: () => <TreeViewDemo />,
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <TreeViewDemo showCheckbox={false} />
      <TreeViewDemo showCheckbox />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <TreeViewDemo showRename={false} />
      <TreeViewDemo showRename />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <TreeViewDemo size="sm" />
      <TreeViewDemo size="md" />
      <TreeViewDemo size="lg" />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => <TreeViewDemo />,
};
