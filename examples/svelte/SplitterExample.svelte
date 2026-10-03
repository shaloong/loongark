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

<LoongArkSplitterRoot
  panels={[
    { id: "notes", minSize: 20 },
    { id: "preview", minSize: 20 },
  ]}
  defaultSize={[50, 50]}
  {size}
  {orientation}
  style={`height: ${height};`}
>
  <LoongArkSplitterPanel id="notes">
    <div style="padding: 12px;">Notes</div>
  </LoongArkSplitterPanel>
  <LoongArkSplitterResizeTrigger id="notes:preview">
    <LoongArkSplitterResizeTriggerIndicator />
  </LoongArkSplitterResizeTrigger>
  <LoongArkSplitterPanel id="preview">
    <div style="padding: 12px;">Preview</div>
  </LoongArkSplitterPanel>
</LoongArkSplitterRoot>
