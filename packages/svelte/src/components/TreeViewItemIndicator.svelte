<script lang="ts">
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
