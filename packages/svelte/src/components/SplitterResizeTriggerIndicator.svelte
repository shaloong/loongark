<script lang="ts">
  import { Splitter } from "@ark-ui/svelte/splitter";
  import type { SplitterResizeTriggerIndicatorProps } from "@ark-ui/svelte/splitter";
</script>

<Splitter.ResizeTriggerIndicator
  data-scope="splitter"
  data-part="resize-trigger-indicator"
  {...$$restProps}
>
  <slot />
</Splitter.ResizeTriggerIndicator>
