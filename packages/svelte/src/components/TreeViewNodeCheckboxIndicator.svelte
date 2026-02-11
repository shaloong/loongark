<script lang="ts">
  import { TreeView } from "@ark-ui/svelte/tree-view";
  import type { TreeViewNodeCheckboxIndicatorProps } from "@ark-ui/svelte/tree-view";
</script>

<TreeView.NodeCheckboxIndicator
  data-scope="tree-view"
  data-part="node-checkbox-indicator"
  {...$$restProps}
>
  <slot />
</TreeView.NodeCheckboxIndicator>
