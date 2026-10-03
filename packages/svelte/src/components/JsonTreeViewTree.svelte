<script lang="ts">
  import {
    JsonTreeView,
    type JsonTreeViewTreeProps,
  } from "@ark-ui/svelte/json-tree-view";
  import { tick, untrack } from "svelte";
  import { captureReplacementFocus } from "@loongark/kit";
  import { useEnvironmentContext } from "@ark-ui/svelte/environment";
  import { useTreeViewContext } from "@ark-ui/svelte/tree-view";
  let props: JsonTreeViewTreeProps = $props();
  const tree = useTreeViewContext();
  const collection = $derived(tree().collection);
  const environment = useEnvironmentContext();
  $effect.pre(() => {
    collection;
    let cancelled = false;
    const restore = untrack(() => {
      const env = environment(),
        root = env.getRootNode(),
        win = env.getWindow();
      const id = props.id ?? tree().getTreeProps().id;
      const container =
        id &&
        (root instanceof win.Document ||
          root instanceof win.ShadowRoot ||
          root instanceof win.Element)
          ? root.querySelector<HTMLElement>(`#${win.CSS.escape(id)}`)
          : null;
      return captureReplacementFocus(container);
    });
    if (restore)
      void tick().then(() => {
        if (!cancelled) restore();
      });
    return () => {
      cancelled = true;
    };
  });
</script>

<!-- npm 版 Node 仍拍快照；只重挂节点，父状态机和展开/选中状态保留。 -->
{#key collection}<JsonTreeView.Tree {...props} />{/key}
