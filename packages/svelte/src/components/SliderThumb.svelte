<script lang="ts">
  import { Slider } from "@ark-ui/svelte/slider";
  import type { SliderThumbProps } from "@ark-ui/svelte/slider";

  export let index: SliderThumbProps["index"] = 0;
  export let name: SliderThumbProps["name"] = undefined;
</script>

<Slider.Thumb {index} {name} data-scope="slider" data-part="thumb" {...$$restProps}>
  <slot />
</Slider.Thumb>
