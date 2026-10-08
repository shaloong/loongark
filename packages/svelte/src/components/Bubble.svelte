<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import type { BubbleOptions } from "@loongark/kit";
  let {
    side = "incoming",
    children,
    ...attrs
  }: BubbleOptions &
    HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();
</script>

<div data-scope="bubble" data-part="root" data-side={side} {...attrs}>
  {@render children?.()}
</div>
