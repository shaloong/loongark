<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import {
    mountMessageScroller,
    mountVirtualMessageScroller,
    createVirtualWindow,
    messageVirtualOptions,
    virtualViewportHeight,
    type MessageScrollerOptions,
    type VirtualRenderDetails,
  } from "@loongark/kit";
  let {
    label = "Messages",
    jumpLabel = "Jump to latest",
    onAtBottomChange,
    virtualization,
    item,
    children,
    ...attrs
  }: MessageScrollerOptions &
    HTMLAttributes<HTMLDivElement> & {
      children?: Snippet;
      item?: Snippet<[VirtualRenderDetails]>;
    } = $props();
  let root: HTMLDivElement;
  const model = createVirtualWindow(
    messageVirtualOptions({
      get virtualization() {
        return virtualization;
      },
    }),
    (value) => {
      window = value;
    },
  );
  let window = $state(model.state),
    mounted = $state(false);
  $effect(() => model.setOptions(messageVirtualOptions({ virtualization })));
  onMount(() => {
    mounted = true;
  });
  const virtualEnabled = $derived(!!virtualization);
  $effect(() => {
    if (!mounted) return;
    return virtualEnabled
      ? mountVirtualMessageScroller(root, model, (details) =>
          onAtBottomChange?.(details),
        )
      : mountMessageScroller(root, (details) => onAtBottomChange?.(details));
  });
</script>

<div data-scope="message-scroller" data-part="root" {...attrs} bind:this={root}>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex (滚动区域必须可由键盘聚焦) -->
  <div
    data-scope="message-scroller"
    data-part="viewport"
    role="region"
    aria-label={label}
    tabindex="0"
    style:height={virtualization
      ? `${virtualViewportHeight(virtualization)}px`
      : undefined}
  >
    <div
      data-scope="message-scroller"
      data-part="content"
      data-virtualized={virtualization ? "true" : undefined}
      role={virtualization ? "list" : undefined}
    >
      {#if virtualization}
        {#each window.entries.filter( (entry) => virtualization?.keys.includes(entry.key) ) as entry (entry.key)}
          {#if entry.gap > 0}<div
              data-part="virtual-spacer"
              aria-hidden="true"
              style:height={`${entry.gap}px`}
            ></div>{/if}
          <div
            data-part="virtual-item"
            data-virtual-key={entry.key}
            role="listitem"
            aria-posinset={entry.index + 1}
            aria-setsize={window.count}
          >
            {#if item}{@render item({
                key: entry.key,
                index: entry.index,
              })}{:else}{entry.key}{/if}
          </div>
        {/each}
        {#if window.after > 0}<div
            data-part="virtual-spacer"
            aria-hidden="true"
            style:height={`${window.after}px`}
          ></div>{/if}
      {:else}{@render children?.()}{/if}
    </div>
  </div>
  <button data-scope="message-scroller" data-part="jump" type="button" hidden
    >{jumpLabel}</button
  >
</div>
