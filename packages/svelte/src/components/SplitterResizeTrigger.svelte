<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticSplitterStyles } from "@loongark/primitives/automatic-styles/splitter";
  registerAutomaticStyles(lkAutomaticSplitterStyles);

  import { Splitter } from "@ark-ui/svelte/splitter";
  import type { SplitterResizeTriggerProps } from "@ark-ui/svelte/splitter";
  export let id: SplitterResizeTriggerProps["id"];
</script>

<Splitter.ResizeTrigger
  aria-label="Resize panels"
  {id}
  data-scope="splitter"
  data-part="resize-trigger"
  {...$$restProps}
>
  <slot />
</Splitter.ResizeTrigger>
