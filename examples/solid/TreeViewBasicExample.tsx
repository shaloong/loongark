/** @jsxImportSource solid-js */

import {
  createTreeCollection,
  LoongArkTreeViewRoot,
  LoongArkTreeViewLabel,
  LoongArkTreeViewTree,
  LoongArkTreeViewNodeProvider,
  LoongArkTreeViewItem,
  LoongArkTreeViewItemText,
} from "@loongark/solid";
export function TreeViewBasicExample() {
  interface FileNode {
    id: string;
    name: string;
    children?: FileNode[];
  }
  const nodes: FileNode[] = [
    { id: "docs", name: "文档" },
    { id: "examples", name: "示例" },
  ];
  const collection = createTreeCollection<FileNode>({
    nodeToValue: (node) => node.id,
    nodeToString: (node) => node.name,
    rootNode: { id: "root", name: "", children: nodes },
  });
  return (
    <LoongArkTreeViewRoot collection={collection}>
      <LoongArkTreeViewLabel>文件</LoongArkTreeViewLabel>
      <LoongArkTreeViewTree>
        {nodes.map((node, index) => (
          <LoongArkTreeViewNodeProvider node={node} indexPath={[index]}>
            <LoongArkTreeViewItem>
              <LoongArkTreeViewItemText>{node.name}</LoongArkTreeViewItemText>
            </LoongArkTreeViewItem>
          </LoongArkTreeViewNodeProvider>
        ))}
      </LoongArkTreeViewTree>
    </LoongArkTreeViewRoot>
  );
}
