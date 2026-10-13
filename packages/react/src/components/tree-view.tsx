"use client";
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticTreeViewStyles } from "@loongark/primitives/automatic-styles/tree-view";


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

export const LoongArkTreeViewRoot = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
) => import("react").ReactElement | null) & { displayName?: string }, lkAutomaticTreeViewStyles);

LoongArkTreeViewRoot.displayName = "LoongArkTreeViewRoot";

export const LoongArkTreeViewLabel = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticTreeViewStyles);

LoongArkTreeViewLabel.displayName = "LoongArkTreeViewLabel";

export const LoongArkTreeViewTree = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticTreeViewStyles);

LoongArkTreeViewTree.displayName = "LoongArkTreeViewTree";

export const LoongArkTreeViewItem = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticTreeViewStyles);

LoongArkTreeViewItem.displayName = "LoongArkTreeViewItem";

export const LoongArkTreeViewItemIndicator = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticTreeViewStyles);

LoongArkTreeViewItemIndicator.displayName = "LoongArkTreeViewItemIndicator";

export const LoongArkTreeViewItemText = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticTreeViewStyles);

LoongArkTreeViewItemText.displayName = "LoongArkTreeViewItemText";

export const LoongArkTreeViewBranch = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticTreeViewStyles);

LoongArkTreeViewBranch.displayName = "LoongArkTreeViewBranch";

export const LoongArkTreeViewBranchContent = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticTreeViewStyles);

LoongArkTreeViewBranchContent.displayName = "LoongArkTreeViewBranchContent";

export const LoongArkTreeViewBranchControl = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticTreeViewStyles);

LoongArkTreeViewBranchControl.displayName = "LoongArkTreeViewBranchControl";

export const LoongArkTreeViewBranchTrigger = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticTreeViewStyles);

LoongArkTreeViewBranchTrigger.displayName = "LoongArkTreeViewBranchTrigger";

export const LoongArkTreeViewBranchIndicator = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticTreeViewStyles);

LoongArkTreeViewBranchIndicator.displayName = "LoongArkTreeViewBranchIndicator";

export const LoongArkTreeViewBranchText = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticTreeViewStyles);

LoongArkTreeViewBranchText.displayName = "LoongArkTreeViewBranchText";

export const LoongArkTreeViewBranchIndentGuide = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticTreeViewStyles);

LoongArkTreeViewBranchIndentGuide.displayName =
  "LoongArkTreeViewBranchIndentGuide";

export const LoongArkTreeViewNodeCheckbox = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticTreeViewStyles);

LoongArkTreeViewNodeCheckbox.displayName = "LoongArkTreeViewNodeCheckbox";

export const LoongArkTreeViewNodeCheckboxIndicator = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticTreeViewStyles);

LoongArkTreeViewNodeCheckboxIndicator.displayName =
  "LoongArkTreeViewNodeCheckboxIndicator";

export const LoongArkTreeViewNodeRenameInput = /*#__PURE__*/ withAutomaticStyles(forwardRef<
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
}), lkAutomaticTreeViewStyles);

LoongArkTreeViewNodeRenameInput.displayName = "LoongArkTreeViewNodeRenameInput";
