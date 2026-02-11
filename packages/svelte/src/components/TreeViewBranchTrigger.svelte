<script lang="ts">
  import { TreeView } from "@ark-ui/svelte/tree-view";
  import type { TreeViewBranchTriggerProps } from "@ark-ui/svelte/tree-view";
</script>

<TreeView.BranchTrigger
  data-scope="tree-view"
  data-part="branch-trigger"
  {...$$restProps}
>
  <slot />
</TreeView.BranchTrigger>
