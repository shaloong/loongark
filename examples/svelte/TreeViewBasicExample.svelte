<script lang="ts">
  import {
    createTreeCollection,
    LoongArkTreeViewRoot,
    LoongArkTreeViewLabel,
    LoongArkTreeViewTree,
    LoongArkTreeViewNodeProvider,
    LoongArkTreeViewItem,
    LoongArkTreeViewItemText,
  } from "@loongark/svelte";
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
</script>

<LoongArkTreeViewRoot {collection}>
  <LoongArkTreeViewLabel>文件</LoongArkTreeViewLabel>
  <LoongArkTreeViewTree>
    {#each nodes as node, index}<LoongArkTreeViewNodeProvider
        {node}
        indexPath={[index]}
      >
        <LoongArkTreeViewItem>
          <LoongArkTreeViewItemText>
            {node.name}
          </LoongArkTreeViewItemText>
        </LoongArkTreeViewItem>
      </LoongArkTreeViewNodeProvider>{/each}
  </LoongArkTreeViewTree>
</LoongArkTreeViewRoot>
