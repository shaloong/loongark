<script lang="ts">
  import {
    LoongArkSliderRoot,
    LoongArkSliderLabel,
    LoongArkSliderControl,
    LoongArkSliderTrack,
    LoongArkSliderRange,
    LoongArkSliderThumb,
    LoongArkSliderValueText,
  } from "@loongark/svelte";
</script>

<LoongArkSliderRoot defaultValue={[50]}>
  <LoongArkSliderLabel>音量</LoongArkSliderLabel>
  <LoongArkSliderControl>
    <LoongArkSliderTrack>
      <LoongArkSliderRange />
    </LoongArkSliderTrack>
    <LoongArkSliderThumb index={0} />
  </LoongArkSliderControl>
  <LoongArkSliderValueText />
</LoongArkSliderRoot>
