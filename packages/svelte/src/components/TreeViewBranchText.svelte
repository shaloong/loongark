<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticTreeViewStyles } from "@shaloong/loongark-primitives/automatic-styles/tree-view";
  registerAutomaticStyles(lkAutomaticTreeViewStyles);

  import { TreeView } from "@ark-ui/svelte/tree-view";
  import type { TreeViewBranchTextProps } from "@ark-ui/svelte/tree-view";
</script>

<TreeView.BranchText
  data-scope="tree-view"
  data-part="branch-text"
  {...$$restProps}
>
  <slot />
</TreeView.BranchText>
