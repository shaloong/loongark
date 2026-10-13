<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticTreeViewStyles } from "@loongark/primitives/automatic-styles/tree-view";
  registerAutomaticStyles(lkAutomaticTreeViewStyles);

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
