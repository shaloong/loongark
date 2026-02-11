declare module "@ark-ui/react/tree-view" {
  import React, { type ReactNode } from "react";

  type BaseProps = React.HTMLAttributes<HTMLElement> & {
    children?: ReactNode;
    asChild?: boolean;
  };

  export interface TreeViewRootProps extends BaseProps {}
  export interface TreeViewLabelProps extends BaseProps {}
  export interface TreeViewTreeProps extends BaseProps {}
  export interface TreeViewItemProps extends BaseProps {}
  export interface TreeViewItemIndicatorProps extends BaseProps {}
  export interface TreeViewItemTextProps extends BaseProps {}
  export interface TreeViewBranchProps extends BaseProps {}
  export interface TreeViewBranchContentProps extends BaseProps {}
  export interface TreeViewBranchControlProps extends BaseProps {}
  export interface TreeViewBranchTriggerProps extends BaseProps {}
  export interface TreeViewBranchIndicatorProps extends BaseProps {}
  export interface TreeViewBranchTextProps extends BaseProps {}
  export interface TreeViewBranchIndentGuideProps extends BaseProps {}
  export interface TreeViewNodeCheckboxProps extends BaseProps {}
  export interface TreeViewNodeCheckboxIndicatorProps extends BaseProps {}
  export interface TreeViewNodeRenameInputProps extends BaseProps {}

  export namespace TreeView {
    export const Root: React.FC<TreeViewRootProps>;
    export const Label: React.FC<TreeViewLabelProps>;
    export const Tree: React.FC<TreeViewTreeProps>;
    export const Item: React.FC<TreeViewItemProps>;
    export const ItemIndicator: React.FC<TreeViewItemIndicatorProps>;
    export const ItemText: React.FC<TreeViewItemTextProps>;
    export const Branch: React.FC<TreeViewBranchProps>;
    export const BranchContent: React.FC<TreeViewBranchContentProps>;
    export const BranchControl: React.FC<TreeViewBranchControlProps>;
    export const BranchTrigger: React.FC<TreeViewBranchTriggerProps>;
    export const BranchIndicator: React.FC<TreeViewBranchIndicatorProps>;
    export const BranchText: React.FC<TreeViewBranchTextProps>;
    export const BranchIndentGuide: React.FC<TreeViewBranchIndentGuideProps>;
    export const NodeCheckbox: React.FC<TreeViewNodeCheckboxProps>;
    export const NodeCheckboxIndicator: React.FC<TreeViewNodeCheckboxIndicatorProps>;
    export const NodeRenameInput: React.FC<TreeViewNodeRenameInputProps>;
  }
}
