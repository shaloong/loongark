<script lang="ts">
  import {
    LoongArkColorPickerRoot,
    LoongArkColorPickerLabel,
    LoongArkColorPickerControl,
    LoongArkColorPickerTrigger,
    LoongArkColorPickerPositioner,
    LoongArkColorPickerContent,
    LoongArkColorPickerView,
    LoongArkColorPickerArea,
    LoongArkColorPickerAreaBackground,
    LoongArkColorPickerAreaThumb,
    LoongArkColorPickerChannelSlider,
    LoongArkColorPickerChannelSliderTrack,
    LoongArkColorPickerChannelSliderThumb,
    LoongArkColorPickerChannelInput,
    LoongArkColorPickerSwatchGroup,
    LoongArkColorPickerSwatchTrigger,
    LoongArkColorPickerSwatchIndicator,
    LoongArkColorPickerSwatch,
    LoongArkColorPickerValueText,
    LoongArkColorPickerValueSwatch,
  } from "@loongark/svelte";
  import type { ColorPickerSize } from "@loongark/primitives";

  export let size: ColorPickerSize = "md";

  let value = "#6366F1";
  const swatches = ["#0EA5E9", "#8B5CF6", "#F97316", "#10B981"];

  const handleValueChange = (details: { value: string }) => {
    value = details.value;
  };
</script>

<LoongArkColorPickerRoot {size} {value} onValueChange={handleValueChange}>
  <LoongArkColorPickerLabel>Brand color</LoongArkColorPickerLabel>
  <LoongArkColorPickerControl>
    <LoongArkColorPickerTrigger>
      <LoongArkColorPickerValueSwatch />
      <LoongArkColorPickerValueText />
    </LoongArkColorPickerTrigger>
  </LoongArkColorPickerControl>
  <LoongArkColorPickerPositioner>
    <LoongArkColorPickerContent>
      <div style="display: grid; gap: 12px;">
        <LoongArkColorPickerView>
          <LoongArkColorPickerArea>
            <LoongArkColorPickerAreaBackground />
            <LoongArkColorPickerAreaThumb />
          </LoongArkColorPickerArea>
          <LoongArkColorPickerChannelSlider channel="h">
            <LoongArkColorPickerChannelSliderTrack />
            <LoongArkColorPickerChannelSliderThumb />
          </LoongArkColorPickerChannelSlider>
        </LoongArkColorPickerView>
        <LoongArkColorPickerChannelInput channel="hex" />
        <LoongArkColorPickerSwatchGroup>
          {#each swatches as swatch}
            <LoongArkColorPickerSwatchTrigger value={swatch}>
              <LoongArkColorPickerSwatch value={swatch} />
              <LoongArkColorPickerSwatchIndicator />
            </LoongArkColorPickerSwatchTrigger>
          {/each}
        </LoongArkColorPickerSwatchGroup>
      </div>
    </LoongArkColorPickerContent>
  </LoongArkColorPickerPositioner>
</LoongArkColorPickerRoot>
