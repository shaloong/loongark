
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticTreeViewStyles } from "@loongark/primitives/automatic-styles/tree-view";
/**
 * Tree View component - Solid wrapper.
 * Uses Ark UI Tree View with data attributes for styling.
 */
import { type Component, type JSX, mergeProps, splitProps } from "solid-js";
import {
  TreeView as ArkTreeView,
  type TreeViewRootProps as ArkTreeViewRootProps,
  type TreeViewLabelProps as ArkTreeViewLabelProps,
  type TreeViewTreeProps as ArkTreeViewTreeProps,
  type TreeViewItemProps as ArkTreeViewItemProps,
  type TreeViewItemIndicatorProps as ArkTreeViewItemIndicatorProps,
  type TreeViewItemTextProps as ArkTreeViewItemTextProps,
  type TreeViewBranchProps as ArkTreeViewBranchProps,
  type TreeViewBranchContentProps as ArkTreeViewBranchContentProps,
  type TreeViewBranchControlProps as ArkTreeViewBranchControlProps,
  type TreeViewBranchTriggerProps as ArkTreeViewBranchTriggerProps,
  type TreeViewBranchIndicatorProps as ArkTreeViewBranchIndicatorProps,
  type TreeViewBranchTextProps as ArkTreeViewBranchTextProps,
  type TreeViewBranchIndentGuideProps as ArkTreeViewBranchIndentGuideProps,
  type TreeViewNodeCheckboxProps as ArkTreeViewNodeCheckboxProps,
  type TreeViewNodeCheckboxIndicatorProps as ArkTreeViewNodeCheckboxIndicatorProps,
  type TreeViewNodeRenameInputProps as ArkTreeViewNodeRenameInputProps,
} from "@ark-ui/solid/tree-view";
import type { TreeViewSize } from "@loongark/primitives";

export interface LoongArkTreeViewRootProps<
  T extends object = object,
> extends Omit<ArkTreeViewRootProps<T>, "asChild"> {
  size?: TreeViewSize;
  children?: JSX.Element;
}

export const LoongArkTreeViewRoot = /*#__PURE__*/ withAutomaticStyles(<T extends object>(
  props: LoongArkTreeViewRootProps<T>,
): JSX.Element => {
  const merged = mergeProps({ size: "md" as TreeViewSize }, props);
  const [local, others] = splitProps(merged, ["children", "size"]);

  return (
    <ArkTreeView.Root
      {...others}
      data-scope="tree-view"
      data-part="root"
      data-size={local.size}
    >
      {local.children}
    </ArkTreeView.Root>
  );
}, lkAutomaticTreeViewStyles);

export interface LoongArkTreeViewLabelProps extends Omit<
  ArkTreeViewLabelProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTreeViewLabel: Component<LoongArkTreeViewLabelProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkTreeView.Label {...others} data-scope="tree-view" data-part="label">
      {local.children}
    </ArkTreeView.Label>
  );
}, lkAutomaticTreeViewStyles);

export interface LoongArkTreeViewTreeProps extends Omit<
  ArkTreeViewTreeProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTreeViewTree: Component<LoongArkTreeViewTreeProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkTreeView.Tree {...others} data-scope="tree-view" data-part="tree">
      {local.children}
    </ArkTreeView.Tree>
  );
}, lkAutomaticTreeViewStyles);

export interface LoongArkTreeViewItemProps extends Omit<
  ArkTreeViewItemProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTreeViewItem: Component<LoongArkTreeViewItemProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkTreeView.Item {...others} data-scope="tree-view" data-part="item">
      {local.children}
    </ArkTreeView.Item>
  );
}, lkAutomaticTreeViewStyles);

export interface LoongArkTreeViewItemIndicatorProps extends Omit<
  ArkTreeViewItemIndicatorProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTreeViewItemIndicator: Component<
  LoongArkTreeViewItemIndicatorProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkTreeView.ItemIndicator
      {...others}
      data-scope="tree-view"
      data-part="item-indicator"
    >
      {local.children}
    </ArkTreeView.ItemIndicator>
  );
}, lkAutomaticTreeViewStyles);

export interface LoongArkTreeViewItemTextProps extends Omit<
  ArkTreeViewItemTextProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTreeViewItemText: Component<
  LoongArkTreeViewItemTextProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkTreeView.ItemText
      {...others}
      data-scope="tree-view"
      data-part="item-text"
    >
      {local.children}
    </ArkTreeView.ItemText>
  );
}, lkAutomaticTreeViewStyles);

export interface LoongArkTreeViewBranchProps extends Omit<
  ArkTreeViewBranchProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTreeViewBranch: Component<LoongArkTreeViewBranchProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkTreeView.Branch {...others} data-scope="tree-view" data-part="branch">
      {local.children}
    </ArkTreeView.Branch>
  );
}, lkAutomaticTreeViewStyles);

export interface LoongArkTreeViewBranchContentProps extends Omit<
  ArkTreeViewBranchContentProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTreeViewBranchContent: Component<
  LoongArkTreeViewBranchContentProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkTreeView.BranchContent
      {...others}
      data-scope="tree-view"
      data-part="branch-content"
    >
      {local.children}
    </ArkTreeView.BranchContent>
  );
}, lkAutomaticTreeViewStyles);

export interface LoongArkTreeViewBranchControlProps extends Omit<
  ArkTreeViewBranchControlProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTreeViewBranchControl: Component<
  LoongArkTreeViewBranchControlProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkTreeView.BranchControl
      {...others}
      data-scope="tree-view"
      data-part="branch-control"
    >
      {local.children}
    </ArkTreeView.BranchControl>
  );
}, lkAutomaticTreeViewStyles);

export interface LoongArkTreeViewBranchTriggerProps extends Omit<
  ArkTreeViewBranchTriggerProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTreeViewBranchTrigger: Component<
  LoongArkTreeViewBranchTriggerProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkTreeView.BranchTrigger
      {...others}
      data-scope="tree-view"
      data-part="branch-trigger"
    >
      {local.children}
    </ArkTreeView.BranchTrigger>
  );
}, lkAutomaticTreeViewStyles);

export interface LoongArkTreeViewBranchIndicatorProps extends Omit<
  ArkTreeViewBranchIndicatorProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTreeViewBranchIndicator: Component<
  LoongArkTreeViewBranchIndicatorProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkTreeView.BranchIndicator
      {...others}
      data-scope="tree-view"
      data-part="branch-indicator"
    >
      {local.children}
    </ArkTreeView.BranchIndicator>
  );
}, lkAutomaticTreeViewStyles);

export interface LoongArkTreeViewBranchTextProps extends Omit<
  ArkTreeViewBranchTextProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTreeViewBranchText: Component<
  LoongArkTreeViewBranchTextProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkTreeView.BranchText
      {...others}
      data-scope="tree-view"
      data-part="branch-text"
    >
      {local.children}
    </ArkTreeView.BranchText>
  );
}, lkAutomaticTreeViewStyles);

export interface LoongArkTreeViewBranchIndentGuideProps extends Omit<
  ArkTreeViewBranchIndentGuideProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTreeViewBranchIndentGuide: Component<
  LoongArkTreeViewBranchIndentGuideProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkTreeView.BranchIndentGuide
      {...others}
      data-scope="tree-view"
      data-part="branch-indent-guide"
    >
      {local.children}
    </ArkTreeView.BranchIndentGuide>
  );
}, lkAutomaticTreeViewStyles);

export interface LoongArkTreeViewNodeCheckboxProps extends Omit<
  ArkTreeViewNodeCheckboxProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTreeViewNodeCheckbox: Component<
  LoongArkTreeViewNodeCheckboxProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkTreeView.NodeCheckbox
      {...others}
      data-scope="tree-view"
      data-part="node-checkbox"
    >
      {local.children}
    </ArkTreeView.NodeCheckbox>
  );
}, lkAutomaticTreeViewStyles);

export interface LoongArkTreeViewNodeCheckboxIndicatorProps extends Omit<
  ArkTreeViewNodeCheckboxIndicatorProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTreeViewNodeCheckboxIndicator: Component<
  LoongArkTreeViewNodeCheckboxIndicatorProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkTreeView.NodeCheckboxIndicator
      {...others}
      data-scope="tree-view"
      data-part="node-checkbox-indicator"
    >
      {local.children}
    </ArkTreeView.NodeCheckboxIndicator>
  );
}, lkAutomaticTreeViewStyles);

export interface LoongArkTreeViewNodeRenameInputProps extends Omit<
  ArkTreeViewNodeRenameInputProps,
  "asChild"
> {}

export const LoongArkTreeViewNodeRenameInput: Component<
  LoongArkTreeViewNodeRenameInputProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkTreeView.NodeRenameInput
      {...props}
      data-scope="tree-view"
      data-part="node-rename-input"
    />
  );
}, lkAutomaticTreeViewStyles);
