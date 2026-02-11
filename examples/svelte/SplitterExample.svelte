<script lang="ts">
  import {
    LoongArkSplitterRoot,
    LoongArkSplitterPanel,
    LoongArkSplitterResizeTrigger,
    LoongArkSplitterResizeTriggerIndicator,
  } from "@loongark/svelte";
  import type { SplitterSize } from "@loongark/primitives";

  export let size: SplitterSize = "md";
  export let orientation: "horizontal" | "vertical" = "horizontal";

  $: height = orientation === "vertical" ? "240px" : "160px";
</script>

<LoongArkSplitterRoot {size} {orientation} style={`height: ${height};`}>
  <LoongArkSplitterPanel minSize={20}>
    <div style="padding: 12px;">Notes</div>
  </LoongArkSplitterPanel>
  <LoongArkSplitterResizeTrigger>
    <LoongArkSplitterResizeTriggerIndicator />
  </LoongArkSplitterResizeTrigger>
  <LoongArkSplitterPanel minSize={20}>
    <div style="padding: 12px;">Preview</div>
  </LoongArkSplitterPanel>
</LoongArkSplitterRoot>
