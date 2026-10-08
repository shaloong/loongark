<script lang="ts">
  import { Toc, type TocRootProps } from "@ark-ui/svelte/toc";
  import { useToc } from "./use-toc.svelte";
  let {
    ref = $bindable(null),
    children,
    activeIds,
    autoScroll,
    defaultActiveIds,
    scrollEl,
    id,
    ids,
    items,
    onActiveChange,
    rootMargin,
    scrollBehavior = "auto",
    threshold,
    ...props
  }: TocRootProps = $props();
  const providedId = $props.id();
  const toc = useToc(() => ({
    activeIds,
    autoScroll,
    defaultActiveIds,
    scrollEl,
    id: id ?? providedId,
    ids,
    items,
    onActiveChange,
    rootMargin,
    scrollBehavior,
    threshold,
  }));
</script>

<Toc.RootProvider value={toc} bind:ref {...props}
  >{@render children?.()}</Toc.RootProvider
>
