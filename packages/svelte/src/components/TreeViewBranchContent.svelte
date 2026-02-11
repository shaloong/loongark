<script lang="ts">
  import { TreeView } from "@ark-ui/svelte/tree-view";
  import type { TreeViewBranchContentProps } from "@ark-ui/svelte/tree-view";
</script>

<TreeView.BranchContent
  data-scope="tree-view"
  data-part="branch-content"
  {...$$restProps}
>
  <slot />
</TreeView.BranchContent>
