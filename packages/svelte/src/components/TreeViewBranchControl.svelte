<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticTreeViewStyles } from "@loongark/primitives/automatic-styles/tree-view";
  registerAutomaticStyles(lkAutomaticTreeViewStyles);

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
