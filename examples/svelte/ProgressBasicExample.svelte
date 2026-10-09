<script lang="ts">
  import {
    LoongArkProgressRoot,
    LoongArkProgressLabel,
    LoongArkProgressTrack,
    LoongArkProgressRange,
    LoongArkProgressValueText,
  } from "@loongark/svelte";
</script>

<LoongArkProgressRoot value={60}>
  <LoongArkProgressLabel>上传进度</LoongArkProgressLabel>
  <LoongArkProgressTrack>
    <LoongArkProgressRange />
  </LoongArkProgressTrack>
  <LoongArkProgressValueText />
</LoongArkProgressRoot>
