<script lang="ts">
  import { TreeView } from "@ark-ui/svelte/tree-view";
  import type { TreeViewRootProps } from "@ark-ui/svelte/tree-view";
  import type { TreeViewSize } from "@loongark/primitives";

  export let size: TreeViewSize = "md";
</script>

<TreeView.Root
  data-scope="tree-view"
  data-part="root"
  data-size={size}
  {...$$restProps}
>
  <slot />
</TreeView.Root>
