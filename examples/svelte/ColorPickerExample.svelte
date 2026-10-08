<script lang="ts">
  import {
    parseColor,
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

  let value = parseColor("#006EFF");
  const swatches = ["#006EFF", "#0A3565", "#5AC8FA", "#F58220"];

  const handleValueChange = (details: {
    value: ReturnType<typeof parseColor>;
  }) => {
    value = details.value;
  };
</script>

<LoongArkColorPickerRoot
  defaultFormat="hsla"
  {size}
  {value}
  onValueChange={handleValueChange}
>
  <LoongArkColorPickerLabel>Brand color</LoongArkColorPickerLabel>
  <LoongArkColorPickerControl>
    <LoongArkColorPickerTrigger>
      <LoongArkColorPickerValueSwatch />
      <LoongArkColorPickerValueText />
    </LoongArkColorPickerTrigger>
  </LoongArkColorPickerControl>
  <LoongArkColorPickerPositioner>
    <LoongArkColorPickerContent aria-label="Choose brand color">
      <div style="display: grid; gap: 12px;">
        <LoongArkColorPickerView format="hsla">
          <LoongArkColorPickerArea>
            <LoongArkColorPickerAreaBackground />
            <LoongArkColorPickerAreaThumb />
          </LoongArkColorPickerArea>
          <LoongArkColorPickerChannelSlider channel="hue">
            <LoongArkColorPickerChannelSliderTrack />
            <LoongArkColorPickerChannelSliderThumb />
          </LoongArkColorPickerChannelSlider>
        </LoongArkColorPickerView>
        <LoongArkColorPickerChannelInput channel="hex" />
        <LoongArkColorPickerSwatchGroup>
          {#each swatches as swatch}
            <LoongArkColorPickerSwatchTrigger value={swatch}>
              <LoongArkColorPickerSwatch value={swatch}
                ><LoongArkColorPickerSwatchIndicator
                /></LoongArkColorPickerSwatch
              >
            </LoongArkColorPickerSwatchTrigger>
          {/each}
        </LoongArkColorPickerSwatchGroup>
      </div>
    </LoongArkColorPickerContent>
  </LoongArkColorPickerPositioner>
</LoongArkColorPickerRoot>
