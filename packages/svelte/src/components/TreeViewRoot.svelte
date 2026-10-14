<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticTreeViewStyles } from "@shaloong/loongark-primitives/automatic-styles/tree-view";
  registerAutomaticStyles(lkAutomaticTreeViewStyles);

  import { TreeView } from "@ark-ui/svelte/tree-view";
  import type { TreeViewRootProps } from "@ark-ui/svelte/tree-view";
  import type { TreeViewSize } from "@shaloong/loongark-primitives";

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
