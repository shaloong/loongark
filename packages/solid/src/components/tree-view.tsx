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

export const LoongArkTreeViewRoot = <T extends object>(
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
};

export interface LoongArkTreeViewLabelProps extends Omit<
  ArkTreeViewLabelProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTreeViewLabel: Component<LoongArkTreeViewLabelProps> = (
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkTreeView.Label {...others} data-scope="tree-view" data-part="label">
      {local.children}
    </ArkTreeView.Label>
  );
};

export interface LoongArkTreeViewTreeProps extends Omit<
  ArkTreeViewTreeProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTreeViewTree: Component<LoongArkTreeViewTreeProps> = (
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkTreeView.Tree {...others} data-scope="tree-view" data-part="tree">
      {local.children}
    </ArkTreeView.Tree>
  );
};

export interface LoongArkTreeViewItemProps extends Omit<
  ArkTreeViewItemProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTreeViewItem: Component<LoongArkTreeViewItemProps> = (
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkTreeView.Item {...others} data-scope="tree-view" data-part="item">
      {local.children}
    </ArkTreeView.Item>
  );
};

export interface LoongArkTreeViewItemIndicatorProps extends Omit<
  ArkTreeViewItemIndicatorProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTreeViewItemIndicator: Component<
  LoongArkTreeViewItemIndicatorProps
> = (props) => {
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
};

export interface LoongArkTreeViewItemTextProps extends Omit<
  ArkTreeViewItemTextProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTreeViewItemText: Component<
  LoongArkTreeViewItemTextProps
> = (props) => {
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
};

export interface LoongArkTreeViewBranchProps extends Omit<
  ArkTreeViewBranchProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTreeViewBranch: Component<LoongArkTreeViewBranchProps> = (
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkTreeView.Branch {...others} data-scope="tree-view" data-part="branch">
      {local.children}
    </ArkTreeView.Branch>
  );
};

export interface LoongArkTreeViewBranchContentProps extends Omit<
  ArkTreeViewBranchContentProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTreeViewBranchContent: Component<
  LoongArkTreeViewBranchContentProps
> = (props) => {
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
};

export interface LoongArkTreeViewBranchControlProps extends Omit<
  ArkTreeViewBranchControlProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTreeViewBranchControl: Component<
  LoongArkTreeViewBranchControlProps
> = (props) => {
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
};

export interface LoongArkTreeViewBranchTriggerProps extends Omit<
  ArkTreeViewBranchTriggerProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTreeViewBranchTrigger: Component<
  LoongArkTreeViewBranchTriggerProps
> = (props) => {
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
};

export interface LoongArkTreeViewBranchIndicatorProps extends Omit<
  ArkTreeViewBranchIndicatorProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTreeViewBranchIndicator: Component<
  LoongArkTreeViewBranchIndicatorProps
> = (props) => {
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
};

export interface LoongArkTreeViewBranchTextProps extends Omit<
  ArkTreeViewBranchTextProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTreeViewBranchText: Component<
  LoongArkTreeViewBranchTextProps
> = (props) => {
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
};

export interface LoongArkTreeViewBranchIndentGuideProps extends Omit<
  ArkTreeViewBranchIndentGuideProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTreeViewBranchIndentGuide: Component<
  LoongArkTreeViewBranchIndentGuideProps
> = (props) => {
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
};

export interface LoongArkTreeViewNodeCheckboxProps extends Omit<
  ArkTreeViewNodeCheckboxProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTreeViewNodeCheckbox: Component<
  LoongArkTreeViewNodeCheckboxProps
> = (props) => {
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
};

export interface LoongArkTreeViewNodeCheckboxIndicatorProps extends Omit<
  ArkTreeViewNodeCheckboxIndicatorProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkTreeViewNodeCheckboxIndicator: Component<
  LoongArkTreeViewNodeCheckboxIndicatorProps
> = (props) => {
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
};

export interface LoongArkTreeViewNodeRenameInputProps extends Omit<
  ArkTreeViewNodeRenameInputProps,
  "asChild"
> {}

export const LoongArkTreeViewNodeRenameInput: Component<
  LoongArkTreeViewNodeRenameInputProps
> = (props) => {
  return (
    <ArkTreeView.NodeRenameInput
      {...props}
      data-scope="tree-view"
      data-part="node-rename-input"
    />
  );
};
