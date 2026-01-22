<script lang="ts">
  import { Slider } from "@ark-ui/svelte/slider";
  import type { SliderMarkerProps } from "@ark-ui/svelte/slider";

  export let value: SliderMarkerProps["value"] = 0;
</script>

<Slider.Marker {value} data-scope="slider" data-part="marker" {...$$restProps}>
  <slot />
</Slider.Marker>
