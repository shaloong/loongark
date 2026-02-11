<script lang="ts">
  import { TreeView } from "@ark-ui/svelte/tree-view";
  import type { TreeViewNodeRenameInputProps } from "@ark-ui/svelte/tree-view";
</script>

<TreeView.NodeRenameInput
  data-scope="tree-view"
  data-part="node-rename-input"
  {...$$restProps}
/>
