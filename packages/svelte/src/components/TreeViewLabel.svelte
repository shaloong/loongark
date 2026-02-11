<script lang="ts">
  import { TreeView } from "@ark-ui/svelte/tree-view";
  import type { TreeViewLabelProps } from "@ark-ui/svelte/tree-view";
</script>

<TreeView.Label
  data-scope="tree-view"
  data-part="label"
  {...$$restProps}
>
  <slot />
</TreeView.Label>
