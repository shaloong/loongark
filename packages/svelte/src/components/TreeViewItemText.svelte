<script lang="ts">
  import { TreeView } from "@ark-ui/svelte/tree-view";
  import type { TreeViewItemTextProps } from "@ark-ui/svelte/tree-view";
</script>

<TreeView.ItemText
  data-scope="tree-view"
  data-part="item-text"
  {...$$restProps}
>
  <slot />
</TreeView.ItemText>
