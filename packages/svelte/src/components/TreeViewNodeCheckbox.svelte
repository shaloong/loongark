<script lang="ts">
  import { TreeView } from "@ark-ui/svelte/tree-view";
  import type { TreeViewNodeCheckboxProps } from "@ark-ui/svelte/tree-view";
</script>

<TreeView.NodeCheckbox
  data-scope="tree-view"
  data-part="node-checkbox"
  {...$$restProps}
>
  <slot />
</TreeView.NodeCheckbox>
