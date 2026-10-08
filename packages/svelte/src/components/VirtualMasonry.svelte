<script module lang="ts">
  import type { Snippet } from "svelte";
  import type {
    VirtualMasonryOptions,
    VirtualMasonryEntry,
  } from "@loongark/kit";
  export interface VirtualMasonryProps extends VirtualMasonryOptions {
    renderItem: Snippet<[VirtualMasonryEntry]>;
  }
</script>

<script lang="ts">
  import { onMount, untrack } from "svelte";
  import { createVirtualMasonry, mountVirtualMasonry } from "@loongark/kit";
  let {
    renderItem,
    ...rest
  }: VirtualMasonryOptions & { renderItem: Snippet<[VirtualMasonryEntry]> } =
    $props();
  let revision = $state(0),
    root: HTMLDivElement;
  const model = untrack(() =>
    createVirtualMasonry(rest, () => untrack(() => revision++)),
  );
  const view = $derived.by(() => {
    revision;
    return model.state;
  });
  $effect(() => model.setOptions(rest));
  onMount(() => mountVirtualMasonry(root, model));
</script>

<div
  bind:this={root}
  data-scope="virtual-masonry"
  role="list"
  aria-label={rest.label ?? "Collection"}
  dir={rest.dir}
  style:height="{rest.height ?? 320}px"
>
  <div data-part="canvas" style:height="{view.total}px">
    {#each view.entries as entry (entry.key)}
      <div
        data-part="item"
        data-virtual-key={entry.key}
        role="listitem"
        aria-posinset={entry.index + 1}
        aria-setsize={view.count}
        style:top="{entry.top}px"
        style:inset-inline-start="{entry.inlineStart}px"
        style:width="{entry.width}px"
      >
        {@render renderItem(entry)}
      </div>
    {/each}
  </div>
</div>
