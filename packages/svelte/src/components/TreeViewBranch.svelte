<script lang="ts">
  import { TreeView } from "@ark-ui/svelte/tree-view";
  import type { TreeViewBranchProps } from "@ark-ui/svelte/tree-view";
</script>

<TreeView.Branch
  data-scope="tree-view"
  data-part="branch"
  {...$$restProps}
>
  <slot />
</TreeView.Branch>
