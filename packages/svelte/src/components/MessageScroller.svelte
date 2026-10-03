<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import {
    mountMessageScroller,
    type MessageScrollerOptions,
  } from "@loongark/kit";
  let {
    label = "Messages",
    jumpLabel = "Jump to latest",
    onAtBottomChange,
    children,
    ...attrs
  }: MessageScrollerOptions &
    HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();
  let root: HTMLDivElement;
  onMount(() => mountMessageScroller(root, (d) => onAtBottomChange?.(d)));
</script>

<div data-scope="message-scroller" data-part="root" {...attrs} bind:this={root}>
  <!-- 滚动区域必须可由键盘聚焦，以便方向键滚动。 -->
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div
    data-scope="message-scroller"
    data-part="viewport"
    role="region"
    aria-label={label}
    tabindex="0"
  >
    <div data-scope="message-scroller" data-part="content">
      {@render children?.()}
    </div>
  </div>
  <button data-scope="message-scroller" data-part="jump" type="button" hidden
    >{jumpLabel}</button
  >
</div>
