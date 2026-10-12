<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticTreeViewStyles } from "@loongark/primitives/automatic-styles/tree-view";
  registerAutomaticStyles(lkAutomaticTreeViewStyles);

  import { TreeView } from "@ark-ui/svelte/tree-view";
  import type { TreeViewItemIndicatorProps } from "@ark-ui/svelte/tree-view";
</script>

<TreeView.ItemIndicator
  data-scope="tree-view"
  data-part="item-indicator"
  {...$$restProps}
>
  <slot />
</TreeView.ItemIndicator>
