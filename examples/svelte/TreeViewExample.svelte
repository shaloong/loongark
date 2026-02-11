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
  } from "@loongark/svelte";
  import type { TreeViewSize } from "@loongark/primitives";

  export let size: TreeViewSize = "md";
</script>

<LoongArkTreeViewRoot {size}>
  <LoongArkTreeViewLabel>Workspace</LoongArkTreeViewLabel>
  <LoongArkTreeViewTree>
    <LoongArkTreeViewBranch value="src">
      <LoongArkTreeViewBranchControl>
        <LoongArkTreeViewBranchTrigger>
          <LoongArkTreeViewBranchIndicator>&gt;</LoongArkTreeViewBranchIndicator>
          <LoongArkTreeViewBranchText>src</LoongArkTreeViewBranchText>
        </LoongArkTreeViewBranchTrigger>
      </LoongArkTreeViewBranchControl>
      <LoongArkTreeViewBranchIndentGuide>
        <LoongArkTreeViewBranchContent>
          <LoongArkTreeViewItem value="components">
            <LoongArkTreeViewItemIndicator>-</LoongArkTreeViewItemIndicator>
            <LoongArkTreeViewItemText>components</LoongArkTreeViewItemText>
          </LoongArkTreeViewItem>
          <LoongArkTreeViewItem value="styles">
            <LoongArkTreeViewItemIndicator>-</LoongArkTreeViewItemIndicator>
            <LoongArkTreeViewItemText>styles</LoongArkTreeViewItemText>
          </LoongArkTreeViewItem>
        </LoongArkTreeViewBranchContent>
      </LoongArkTreeViewBranchIndentGuide>
    </LoongArkTreeViewBranch>
    <LoongArkTreeViewItem value="package.json">
      <LoongArkTreeViewItemIndicator>-</LoongArkTreeViewItemIndicator>
      <LoongArkTreeViewItemText>package.json</LoongArkTreeViewItemText>
    </LoongArkTreeViewItem>
  </LoongArkTreeViewTree>
</LoongArkTreeViewRoot>
