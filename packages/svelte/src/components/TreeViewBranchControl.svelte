<script lang="ts">
  import { TreeView } from "@ark-ui/svelte/tree-view";
  import type { TreeViewBranchControlProps } from "@ark-ui/svelte/tree-view";
</script>

<TreeView.BranchControl
  data-scope="tree-view"
  data-part="branch-control"
  {...$$restProps}
>
  <slot />
</TreeView.BranchControl>
