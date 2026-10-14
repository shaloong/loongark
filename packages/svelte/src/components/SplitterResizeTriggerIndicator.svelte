<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticSplitterStyles } from "@shaloong/loongark-primitives/automatic-styles/splitter";
  registerAutomaticStyles(lkAutomaticSplitterStyles);

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
