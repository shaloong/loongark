import React from "react";
import {
  LoongArkSliderRoot,
  LoongArkSliderLabel,
  LoongArkSliderControl,
  LoongArkSliderTrack,
  LoongArkSliderRange,
  LoongArkSliderThumb,
  LoongArkSliderValueText,
} from "@loongark/react";
export function SliderBasicExample() {
  return (
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
  );
}
