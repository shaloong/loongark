<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticTreeViewStyles } from "@loongark/primitives/automatic-styles/tree-view";
  registerAutomaticStyles(lkAutomaticTreeViewStyles);

  import { TreeView } from "@ark-ui/svelte/tree-view";
  import type { TreeViewItemProps } from "@ark-ui/svelte/tree-view";
</script>

<TreeView.Item
  data-scope="tree-view"
  data-part="item"
  {...$$restProps}
>
  <slot />
</TreeView.Item>
