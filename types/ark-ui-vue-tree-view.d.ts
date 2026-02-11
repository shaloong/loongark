declare module "@ark-ui/vue/tree-view" {
  type VueComponent<P = any> = (props: P & { children?: any }) => any;

  export interface TreeViewRootProps {}
  export interface TreeViewLabelProps {}
  export interface TreeViewTreeProps {}
  export interface TreeViewItemProps {}
  export interface TreeViewItemIndicatorProps {}
  export interface TreeViewItemTextProps {}
  export interface TreeViewBranchProps {}
  export interface TreeViewBranchContentProps {}
  export interface TreeViewBranchControlProps {}
  export interface TreeViewBranchTriggerProps {}
  export interface TreeViewBranchIndicatorProps {}
  export interface TreeViewBranchTextProps {}
  export interface TreeViewBranchIndentGuideProps {}
  export interface TreeViewNodeCheckboxProps {}
  export interface TreeViewNodeCheckboxIndicatorProps {}
  export interface TreeViewNodeRenameInputProps {}

  export const TreeView: {
    Root: VueComponent<TreeViewRootProps>;
    Label: VueComponent<TreeViewLabelProps>;
    Tree: VueComponent<TreeViewTreeProps>;
    Item: VueComponent<TreeViewItemProps>;
    ItemIndicator: VueComponent<TreeViewItemIndicatorProps>;
    ItemText: VueComponent<TreeViewItemTextProps>;
    Branch: VueComponent<TreeViewBranchProps>;
    BranchContent: VueComponent<TreeViewBranchContentProps>;
    BranchControl: VueComponent<TreeViewBranchControlProps>;
    BranchTrigger: VueComponent<TreeViewBranchTriggerProps>;
    BranchIndicator: VueComponent<TreeViewBranchIndicatorProps>;
    BranchText: VueComponent<TreeViewBranchTextProps>;
    BranchIndentGuide: VueComponent<TreeViewBranchIndentGuideProps>;
    NodeCheckbox: VueComponent<TreeViewNodeCheckboxProps>;
    NodeCheckboxIndicator: VueComponent<TreeViewNodeCheckboxIndicatorProps>;
    NodeRenameInput: VueComponent<TreeViewNodeRenameInputProps>;
  };
}
