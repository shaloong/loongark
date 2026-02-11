<script lang="ts">
  import { Splitter } from "@ark-ui/svelte/splitter";
  import type { SplitterResizeTriggerProps } from "@ark-ui/svelte/splitter";
</script>

<Splitter.ResizeTrigger
  data-scope="splitter"
  data-part="resize-trigger"
  {...$$restProps}
>
  <slot />
</Splitter.ResizeTrigger>
