<script lang="ts">
  import {
    LoongArkColorPickerRoot,
    parseColor,
    LoongArkColorPickerLabel,
    LoongArkColorPickerControl,
    LoongArkColorPickerTrigger,
    LoongArkColorPickerValueSwatch,
    LoongArkColorPickerPositioner,
    LoongArkColorPickerContent,
    LoongArkColorPickerArea,
    LoongArkColorPickerAreaBackground,
    LoongArkColorPickerAreaThumb,
    LoongArkColorPickerChannelInput,
  } from "@loongark/svelte";
</script>

<LoongArkColorPickerRoot defaultValue={parseColor("#006EFF")}>
  <LoongArkColorPickerLabel>颜色</LoongArkColorPickerLabel>
  <LoongArkColorPickerControl>
    <LoongArkColorPickerTrigger>
      <LoongArkColorPickerValueSwatch />
    </LoongArkColorPickerTrigger>
  </LoongArkColorPickerControl>
  <LoongArkColorPickerPositioner>
    <LoongArkColorPickerContent>
      <LoongArkColorPickerArea>
        <LoongArkColorPickerAreaBackground />
        <LoongArkColorPickerAreaThumb />
      </LoongArkColorPickerArea>
      <LoongArkColorPickerChannelInput channel="hex" />
    </LoongArkColorPickerContent>
  </LoongArkColorPickerPositioner>
</LoongArkColorPickerRoot>
