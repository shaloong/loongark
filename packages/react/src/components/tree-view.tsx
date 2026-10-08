/**
 * Tree View component - React wrapper.
 * Uses Ark UI Tree View with data attributes for styling.
 */
import React, { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { TreeView } from "@ark-ui/react/tree-view";
import type { TreeViewSize } from "@loongark/primitives";

type ArkTreeViewRootProps<T = object> =
  import("@ark-ui/react/tree-view").TreeViewRootProps<T>;
type ArkTreeViewLabelProps = ComponentPropsWithoutRef<typeof TreeView.Label>;
type ArkTreeViewTreeProps = ComponentPropsWithoutRef<typeof TreeView.Tree>;
type ArkTreeViewItemProps = ComponentPropsWithoutRef<typeof TreeView.Item>;
type ArkTreeViewItemIndicatorProps = ComponentPropsWithoutRef<
  typeof TreeView.ItemIndicator
>;
type ArkTreeViewItemTextProps = ComponentPropsWithoutRef<
  typeof TreeView.ItemText
>;
type ArkTreeViewBranchProps = ComponentPropsWithoutRef<typeof TreeView.Branch>;
type ArkTreeViewBranchContentProps = ComponentPropsWithoutRef<
  typeof TreeView.BranchContent
>;
type ArkTreeViewBranchControlProps = ComponentPropsWithoutRef<
  typeof TreeView.BranchControl
>;
type ArkTreeViewBranchTriggerProps = ComponentPropsWithoutRef<
  typeof TreeView.BranchTrigger
>;
type ArkTreeViewBranchIndicatorProps = ComponentPropsWithoutRef<
  typeof TreeView.BranchIndicator
>;
type ArkTreeViewBranchTextProps = ComponentPropsWithoutRef<
  typeof TreeView.BranchText
>;
type ArkTreeViewBranchIndentGuideProps = ComponentPropsWithoutRef<
  typeof TreeView.BranchIndentGuide
>;
type ArkTreeViewNodeCheckboxProps = ComponentPropsWithoutRef<
  typeof TreeView.NodeCheckbox
>;
type ArkTreeViewNodeCheckboxIndicatorProps = ComponentPropsWithoutRef<
  typeof TreeView.NodeCheckboxIndicator
>;
type ArkTreeViewNodeRenameInputProps = ComponentPropsWithoutRef<
  typeof TreeView.NodeRenameInput
>;

export interface LoongArkTreeViewRootProps<T = object> extends Omit<
  ArkTreeViewRootProps<T>,
  "asChild"
> {
  size?: TreeViewSize;
  children?: ReactNode;
}

export const LoongArkTreeViewRoot = forwardRef<
  HTMLDivElement,
  LoongArkTreeViewRootProps
>(({ size = "md", children, ...props }, ref) => {
  return (
    <TreeView.Root
      {...props}
      ref={ref}
      data-scope="tree-view"
      data-part="root"
      data-size={size}
    >
      {children}
    </TreeView.Root>
  );
}) as (<T>(
  props: LoongArkTreeViewRootProps<T> &
    import("react").RefAttributes<HTMLDivElement>,
) => import("react").ReactElement | null) & { displayName?: string };

LoongArkTreeViewRoot.displayName = "LoongArkTreeViewRoot";

export const LoongArkTreeViewLabel = forwardRef<
  HTMLHeadingElement,
  ArkTreeViewLabelProps
>((props, ref) => {
  return (
    <TreeView.Label
      {...props}
      ref={ref}
      data-scope="tree-view"
      data-part="label"
    />
  );
});

LoongArkTreeViewLabel.displayName = "LoongArkTreeViewLabel";

export const LoongArkTreeViewTree = forwardRef<
  HTMLDivElement,
  ArkTreeViewTreeProps
>((props, ref) => {
  return (
    <TreeView.Tree
      {...props}
      ref={ref}
      data-scope="tree-view"
      data-part="tree"
    />
  );
});

LoongArkTreeViewTree.displayName = "LoongArkTreeViewTree";

export const LoongArkTreeViewItem = forwardRef<
  HTMLDivElement,
  ArkTreeViewItemProps
>((props, ref) => {
  return (
    <TreeView.Item
      {...props}
      ref={ref}
      data-scope="tree-view"
      data-part="item"
    />
  );
});

LoongArkTreeViewItem.displayName = "LoongArkTreeViewItem";

export const LoongArkTreeViewItemIndicator = forwardRef<
  HTMLDivElement,
  ArkTreeViewItemIndicatorProps
>((props, ref) => {
  return (
    <TreeView.ItemIndicator
      {...props}
      ref={ref}
      data-scope="tree-view"
      data-part="item-indicator"
    />
  );
});

LoongArkTreeViewItemIndicator.displayName = "LoongArkTreeViewItemIndicator";

export const LoongArkTreeViewItemText = forwardRef<
  HTMLSpanElement,
  ArkTreeViewItemTextProps
>((props, ref) => {
  return (
    <TreeView.ItemText
      {...props}
      ref={ref}
      data-scope="tree-view"
      data-part="item-text"
    />
  );
});

LoongArkTreeViewItemText.displayName = "LoongArkTreeViewItemText";

export const LoongArkTreeViewBranch = forwardRef<
  HTMLDivElement,
  ArkTreeViewBranchProps
>((props, ref) => {
  return (
    <TreeView.Branch
      {...props}
      ref={ref}
      data-scope="tree-view"
      data-part="branch"
    />
  );
});

LoongArkTreeViewBranch.displayName = "LoongArkTreeViewBranch";

export const LoongArkTreeViewBranchContent = forwardRef<
  HTMLDivElement,
  ArkTreeViewBranchContentProps
>((props, ref) => {
  return (
    <TreeView.BranchContent
      {...props}
      ref={ref}
      data-scope="tree-view"
      data-part="branch-content"
    />
  );
});

LoongArkTreeViewBranchContent.displayName = "LoongArkTreeViewBranchContent";

export const LoongArkTreeViewBranchControl = forwardRef<
  HTMLDivElement,
  ArkTreeViewBranchControlProps
>((props, ref) => {
  return (
    <TreeView.BranchControl
      {...props}
      ref={ref}
      data-scope="tree-view"
      data-part="branch-control"
    />
  );
});

LoongArkTreeViewBranchControl.displayName = "LoongArkTreeViewBranchControl";

export const LoongArkTreeViewBranchTrigger = forwardRef<
  HTMLDivElement,
  ArkTreeViewBranchTriggerProps
>((props, ref) => {
  return (
    <TreeView.BranchTrigger
      {...props}
      ref={ref}
      data-scope="tree-view"
      data-part="branch-trigger"
    />
  );
});

LoongArkTreeViewBranchTrigger.displayName = "LoongArkTreeViewBranchTrigger";

export const LoongArkTreeViewBranchIndicator = forwardRef<
  HTMLDivElement,
  ArkTreeViewBranchIndicatorProps
>((props, ref) => {
  return (
    <TreeView.BranchIndicator
      {...props}
      ref={ref}
      data-scope="tree-view"
      data-part="branch-indicator"
    />
  );
});

LoongArkTreeViewBranchIndicator.displayName = "LoongArkTreeViewBranchIndicator";

export const LoongArkTreeViewBranchText = forwardRef<
  HTMLSpanElement,
  ArkTreeViewBranchTextProps
>((props, ref) => {
  return (
    <TreeView.BranchText
      {...props}
      ref={ref}
      data-scope="tree-view"
      data-part="branch-text"
    />
  );
});

LoongArkTreeViewBranchText.displayName = "LoongArkTreeViewBranchText";

export const LoongArkTreeViewBranchIndentGuide = forwardRef<
  HTMLDivElement,
  ArkTreeViewBranchIndentGuideProps
>((props, ref) => {
  return (
    <TreeView.BranchIndentGuide
      {...props}
      ref={ref}
      data-scope="tree-view"
      data-part="branch-indent-guide"
    />
  );
});

LoongArkTreeViewBranchIndentGuide.displayName =
  "LoongArkTreeViewBranchIndentGuide";

export const LoongArkTreeViewNodeCheckbox = forwardRef<
  HTMLSpanElement,
  ArkTreeViewNodeCheckboxProps
>((props, ref) => {
  return (
    <TreeView.NodeCheckbox
      {...props}
      ref={ref}
      data-scope="tree-view"
      data-part="node-checkbox"
    />
  );
});

LoongArkTreeViewNodeCheckbox.displayName = "LoongArkTreeViewNodeCheckbox";

export const LoongArkTreeViewNodeCheckboxIndicator = forwardRef<
  HTMLSpanElement,
  ArkTreeViewNodeCheckboxIndicatorProps
>((props, ref) => {
  return (
    <TreeView.NodeCheckboxIndicator
      {...props}
      data-scope="tree-view"
      data-part="node-checkbox-indicator"
    />
  );
});

LoongArkTreeViewNodeCheckboxIndicator.displayName =
  "LoongArkTreeViewNodeCheckboxIndicator";

export const LoongArkTreeViewNodeRenameInput = forwardRef<
  HTMLInputElement,
  ArkTreeViewNodeRenameInputProps
>((props, ref) => {
  return (
    <TreeView.NodeRenameInput
      {...props}
      ref={ref}
      data-scope="tree-view"
      data-part="node-rename-input"
    />
  );
});

LoongArkTreeViewNodeRenameInput.displayName = "LoongArkTreeViewNodeRenameInput";
