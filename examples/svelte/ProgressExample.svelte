<script lang="ts">
  import {
    LoongArkProgressRoot,
    LoongArkProgressLabel,
    LoongArkProgressTrack,
    LoongArkProgressRange,
    LoongArkProgressValueText,
    LoongArkProgressView,
    LoongArkProgressCircle,
    LoongArkProgressCircleTrack,
    LoongArkProgressCircleRange,
  } from "@loongark/svelte";
  import type { ProgressOrientation, ProgressSize } from "@loongark/primitives";

  export let size: ProgressSize = "md";
  export let orientation: ProgressOrientation = "horizontal";
  export let value = 48;
</script>

<div style="display: grid; gap: 20px;">
  <LoongArkProgressRoot {value} {size} {orientation}>
    <LoongArkProgressLabel>Project setup</LoongArkProgressLabel>
    <LoongArkProgressTrack>
      <LoongArkProgressRange />
    </LoongArkProgressTrack>
    <LoongArkProgressValueText />
  </LoongArkProgressRoot>
  <LoongArkProgressRoot {value} {size}>
    <LoongArkProgressView>
      <LoongArkProgressCircle>
        <LoongArkProgressCircleTrack />
        <LoongArkProgressCircleRange />
      </LoongArkProgressCircle>
    </LoongArkProgressView>
    <LoongArkProgressValueText />
  </LoongArkProgressRoot>
</div>
