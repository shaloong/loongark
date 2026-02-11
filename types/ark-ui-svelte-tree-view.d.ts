declare module "@ark-ui/svelte/tree-view" {
  type SvelteComponent<P = any> = new (...args: any[]) => { $$prop_def: P };

  export interface TreeViewRootProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface TreeViewLabelProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface TreeViewTreeProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface TreeViewItemProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface TreeViewItemIndicatorProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface TreeViewItemTextProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface TreeViewBranchProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface TreeViewBranchContentProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface TreeViewBranchControlProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface TreeViewBranchTriggerProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface TreeViewBranchIndicatorProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface TreeViewBranchTextProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface TreeViewBranchIndentGuideProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface TreeViewNodeCheckboxProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface TreeViewNodeCheckboxIndicatorProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface TreeViewNodeRenameInputProps {
    asChild?: boolean;
    [key: string]: any;
  }

  export const TreeView: {
    Root: SvelteComponent<TreeViewRootProps>;
    Label: SvelteComponent<TreeViewLabelProps>;
    Tree: SvelteComponent<TreeViewTreeProps>;
    Item: SvelteComponent<TreeViewItemProps>;
    ItemIndicator: SvelteComponent<TreeViewItemIndicatorProps>;
    ItemText: SvelteComponent<TreeViewItemTextProps>;
    Branch: SvelteComponent<TreeViewBranchProps>;
    BranchContent: SvelteComponent<TreeViewBranchContentProps>;
    BranchControl: SvelteComponent<TreeViewBranchControlProps>;
    BranchTrigger: SvelteComponent<TreeViewBranchTriggerProps>;
    BranchIndicator: SvelteComponent<TreeViewBranchIndicatorProps>;
    BranchText: SvelteComponent<TreeViewBranchTextProps>;
    BranchIndentGuide: SvelteComponent<TreeViewBranchIndentGuideProps>;
    NodeCheckbox: SvelteComponent<TreeViewNodeCheckboxProps>;
    NodeCheckboxIndicator: SvelteComponent<TreeViewNodeCheckboxIndicatorProps>;
    NodeRenameInput: SvelteComponent<TreeViewNodeRenameInputProps>;
  };
}
