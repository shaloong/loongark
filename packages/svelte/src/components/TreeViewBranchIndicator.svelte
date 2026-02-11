<script lang="ts">
  import { TreeView } from "@ark-ui/svelte/tree-view";
  import type { TreeViewBranchIndicatorProps } from "@ark-ui/svelte/tree-view";
</script>

<TreeView.BranchIndicator
  data-scope="tree-view"
  data-part="branch-indicator"
  {...$$restProps}
>
  <slot />
</TreeView.BranchIndicator>
