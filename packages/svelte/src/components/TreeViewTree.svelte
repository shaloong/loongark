<script lang="ts">
  import { TreeView } from "@ark-ui/svelte/tree-view";
  import type { TreeViewTreeProps } from "@ark-ui/svelte/tree-view";
</script>

<TreeView.Tree
  data-scope="tree-view"
  data-part="tree"
  {...$$restProps}
>
  <slot />
</TreeView.Tree>
