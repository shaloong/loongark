<script lang="ts">
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
