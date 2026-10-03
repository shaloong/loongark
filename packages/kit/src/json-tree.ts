import {
  getRootNode,
  nodeToValue,
  nodeToString,
  type JsonNode,
} from "@zag-js/json-tree-utils";
export interface JsonTreeOptions {
  maxPreviewItems?: number;
  collapseStringsAfterLength?: number;
  quotesOnKeys?: boolean;
  groupArraysAfterLength?: number;
  showNonenumerable?: boolean;
}
/** 分割应在响应式计算中执行；数据和格式选项不可在 setup 时拍快照。 */
export function splitJsonTreeProps<
  T extends JsonTreeOptions & { data: unknown; defaultExpandedDepth?: number },
>(props: T) {
  const {
    data,
    defaultExpandedDepth,
    maxPreviewItems,
    collapseStringsAfterLength,
    quotesOnKeys,
    groupArraysAfterLength,
    showNonenumerable,
    ...treeProps
  } = props;
  return {
    data,
    defaultExpandedDepth,
    treeProps,
    options: {
      maxPreviewItems,
      collapseStringsAfterLength,
      quotesOnKeys,
      groupArraysAfterLength,
      showNonenumerable,
    },
  };
}
export function jsonCollectionOptions(data: unknown) {
  return { rootNode: getRootNode(data), nodeToValue, nodeToString };
}
interface JsonCollection {
  visit(options: {
    onEnter: (node: JsonNode, indexPath: number[]) => void;
  }): void;
  isBranchNode(node: JsonNode): boolean;
  getNodeValue(node: JsonNode): string;
}
export function expandedJsonBranches(
  collection: JsonCollection,
  depth?: number,
) {
  if (depth === undefined) return undefined;
  const values: string[] = [];
  collection.visit({
    onEnter(node, indexPath) {
      if (
        indexPath.length > 0 &&
        indexPath.length <= depth &&
        collection.isBranchNode(node)
      )
        values.push(collection.getNodeValue(node));
    },
  });
  return values;
}
const machineKeys = new Set([
  "data",
  "defaultExpandedDepth",
  "maxPreviewItems",
  "collapseStringsAfterLength",
  "quotesOnKeys",
  "groupArraysAfterLength",
  "showNonenumerable",
  "id",
  "ids",
  "defaultExpandedValue",
  "defaultSelectedValue",
  "defaultCheckedValue",
  "defaultFocusedValue",
  "checkedValue",
  "expandOnClick",
  "expandedValue",
  "focusedValue",
  "selectedValue",
  "selectionMode",
  "typeahead",
  "loadChildren",
  "canRename",
  "translations",
  "onExpandedChange",
  "onFocusChange",
  "onSelectionChange",
  "onCheckedChange",
  "onLoadChildrenComplete",
  "onLoadChildrenError",
  "onRenameStart",
  "onBeforeRename",
  "onRenameComplete",
]);
/** Provider 只接收 DOM/渲染属性，避免把数据、控制值和状态回调写到元素上。 */
export function jsonRootAttributes(props: object) {
  return Object.fromEntries(
    Object.entries(props).filter(([key]) => !machineKeys.has(key)),
  );
}
/** 数据节点重挂后恢复仍存在的焦点；用户已移到其他控件时不得夺回焦点。 */
export function captureReplacementFocus(container: HTMLElement | null) {
  const doc = container?.ownerDocument,
    win = doc?.defaultView;
  const active = doc?.activeElement,
    parent = container?.parentElement;
  if (
    !container ||
    !win ||
    !parent ||
    !(active instanceof win.HTMLElement) ||
    !container.contains(active)
  )
    return;
  const treeId = container.id,
    activeId = active.id;
  return () => {
    if (!parent.isConnected) return;
    const current = doc.activeElement;
    if (
      current &&
      current !== doc.body &&
      current !== active &&
      current.isConnected
    )
      return;
    const tree = parent.querySelector<HTMLElement>(
      `#${win.CSS.escape(treeId)}`,
    );
    const next = activeId
      ? tree?.querySelector<HTMLElement>(`#${win.CSS.escape(activeId)}`)
      : tree;
    (next ?? tree)?.focus({ preventScroll: true });
  };
}
