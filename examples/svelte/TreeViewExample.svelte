<script lang="ts">
  import {
    LoongArkTreeViewRoot,
    LoongArkTreeViewLabel,
    LoongArkTreeViewTree,
    LoongArkTreeViewItem,
    LoongArkTreeViewItemIndicator,
    LoongArkTreeViewItemText,
    LoongArkTreeViewBranch,
    LoongArkTreeViewBranchContent,
    LoongArkTreeViewBranchControl,
    LoongArkTreeViewBranchTrigger,
    LoongArkTreeViewBranchIndicator,
    LoongArkTreeViewBranchText,
    LoongArkTreeViewBranchIndentGuide,
    LoongArkTreeViewNodeProvider,
    createTreeCollection,
  } from "@loongark/svelte";
  import type { TreeViewSize } from "@loongark/primitives";

  export let size: TreeViewSize = "md";
  const nodes = [
    {
      id: "src",
      name: "src",
      children: [
        { id: "components", name: "components" },
        { id: "styles", name: "styles" },
      ],
    },
    { id: "package.json", name: "package.json" },
  ];
  const collection = createTreeCollection({
    rootNode: { id: "ROOT", name: "", children: nodes },
    nodeToValue: (node) => node.id,
    nodeToString: (node) => node.name,
  });
</script>

<LoongArkTreeViewRoot {size} {collection}>
  <LoongArkTreeViewLabel>Workspace</LoongArkTreeViewLabel>
  <LoongArkTreeViewTree>
    <LoongArkTreeViewNodeProvider node={nodes[0]} indexPath={[0]}>
      <LoongArkTreeViewBranch>
        <LoongArkTreeViewBranchControl>
          <LoongArkTreeViewBranchIndicator>&gt;</LoongArkTreeViewBranchIndicator
          >
          <LoongArkTreeViewBranchText>src</LoongArkTreeViewBranchText>
        </LoongArkTreeViewBranchControl>
        <LoongArkTreeViewBranchIndentGuide>
          <LoongArkTreeViewBranchContent>
            <LoongArkTreeViewNodeProvider
              node={nodes[0].children![0]}
              indexPath={[0, 0]}
            >
              <LoongArkTreeViewItem>
                <LoongArkTreeViewItemIndicator>-</LoongArkTreeViewItemIndicator>
                <LoongArkTreeViewItemText>components</LoongArkTreeViewItemText>
              </LoongArkTreeViewItem>
            </LoongArkTreeViewNodeProvider>
            <LoongArkTreeViewNodeProvider
              node={nodes[0].children![1]}
              indexPath={[0, 1]}
            >
              <LoongArkTreeViewItem>
                <LoongArkTreeViewItemIndicator>-</LoongArkTreeViewItemIndicator>
                <LoongArkTreeViewItemText>styles</LoongArkTreeViewItemText>
              </LoongArkTreeViewItem>
            </LoongArkTreeViewNodeProvider>
          </LoongArkTreeViewBranchContent>
        </LoongArkTreeViewBranchIndentGuide>
      </LoongArkTreeViewBranch>
    </LoongArkTreeViewNodeProvider>
    <LoongArkTreeViewNodeProvider node={nodes[1]} indexPath={[1]}>
      <LoongArkTreeViewItem>
        <LoongArkTreeViewItemIndicator>-</LoongArkTreeViewItemIndicator>
        <LoongArkTreeViewItemText>package.json</LoongArkTreeViewItemText>
      </LoongArkTreeViewItem>
    </LoongArkTreeViewNodeProvider>
  </LoongArkTreeViewTree>
</LoongArkTreeViewRoot>
