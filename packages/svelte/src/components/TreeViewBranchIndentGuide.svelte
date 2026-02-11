<script lang="ts">
  import { TreeView } from "@ark-ui/svelte/tree-view";
  import type { TreeViewBranchIndentGuideProps } from "@ark-ui/svelte/tree-view";
</script>

<TreeView.BranchIndentGuide
  data-scope="tree-view"
  data-part="branch-indent-guide"
  {...$$restProps}
>
  <slot />
</TreeView.BranchIndentGuide>
