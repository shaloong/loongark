<script lang="ts">
  import { TreeView } from "@ark-ui/svelte/tree-view";
  import type { TreeViewNodeCheckboxIndicatorProps } from "@ark-ui/svelte/tree-view";
</script>

<TreeView.NodeCheckboxIndicator {...$$restProps}>
  <slot />
</TreeView.NodeCheckboxIndicator>
