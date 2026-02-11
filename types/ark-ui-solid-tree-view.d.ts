declare module "@ark-ui/solid/tree-view" {
  import type { Component, JSX } from "solid-js";

  type BaseProps = {
    children?: JSX.Element;
    asChild?: boolean;
    [key: string]: any;
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
    export const Root: Component<TreeViewRootProps>;
    export const Label: Component<TreeViewLabelProps>;
    export const Tree: Component<TreeViewTreeProps>;
    export const Item: Component<TreeViewItemProps>;
    export const ItemIndicator: Component<TreeViewItemIndicatorProps>;
    export const ItemText: Component<TreeViewItemTextProps>;
    export const Branch: Component<TreeViewBranchProps>;
    export const BranchContent: Component<TreeViewBranchContentProps>;
    export const BranchControl: Component<TreeViewBranchControlProps>;
    export const BranchTrigger: Component<TreeViewBranchTriggerProps>;
    export const BranchIndicator: Component<TreeViewBranchIndicatorProps>;
    export const BranchText: Component<TreeViewBranchTextProps>;
    export const BranchIndentGuide: Component<TreeViewBranchIndentGuideProps>;
    export const NodeCheckbox: Component<TreeViewNodeCheckboxProps>;
    export const NodeCheckboxIndicator: Component<TreeViewNodeCheckboxIndicatorProps>;
    export const NodeRenameInput: Component<TreeViewNodeRenameInputProps>;
  }
}
