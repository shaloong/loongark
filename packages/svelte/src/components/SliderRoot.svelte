<script lang="ts">
  import { Slider } from "@ark-ui/svelte/slider";
  import type { SliderRootProps } from "@ark-ui/svelte/slider";
  import type { SliderOrientation, SliderSize } from "@loongark/primitives";

  export let size: SliderSize = "md";
  export let orientation: SliderOrientation = "horizontal";
  export let value: SliderRootProps["value"] = undefined;
  export let defaultValue: SliderRootProps["defaultValue"] = undefined;
  export let min: SliderRootProps["min"] = undefined;
  export let max: SliderRootProps["max"] = undefined;
  export let step: SliderRootProps["step"] = undefined;
  export let minStepsBetweenThumbs: SliderRootProps["minStepsBetweenThumbs"] = undefined;
  export let disabled: SliderRootProps["disabled"] = undefined;
  export let readOnly: SliderRootProps["readOnly"] = undefined;
  export let invalid: SliderRootProps["invalid"] = undefined;
  export let name: SliderRootProps["name"] = undefined;
  export let form: SliderRootProps["form"] = undefined;
  export let id: SliderRootProps["id"] = undefined;
  export let ids: SliderRootProps["ids"] = undefined;
  export let origin: SliderRootProps["origin"] = undefined;
  export let thumbAlignment: SliderRootProps["thumbAlignment"] = undefined;
  export let thumbSize: SliderRootProps["thumbSize"] = undefined;
  export let onValueChange: SliderRootProps["onValueChange"] = undefined;
  export let onValueChangeEnd: SliderRootProps["onValueChangeEnd"] = undefined;
  export let onFocusChange: SliderRootProps["onFocusChange"] = undefined;
  export let getAriaValueText: SliderRootProps["getAriaValueText"] = undefined;
</script>

<Slider.Root
  {value}
  {defaultValue}
  {min}
  {max}
  {step}
  {minStepsBetweenThumbs}
  {orientation}
  {disabled}
  {readOnly}
  {invalid}
  {name}
  {form}
  {id}
  {ids}
  {origin}
  {thumbAlignment}
  {thumbSize}
  {onValueChange}
  {onValueChangeEnd}
  {onFocusChange}
  {getAriaValueText}
  data-scope="slider"
  data-part="root"
  data-size={size}
  data-orientation={orientation}
  {...$$restProps}
>
  <slot />
</Slider.Root>
