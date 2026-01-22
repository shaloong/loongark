<script lang="ts">
  import { Slider } from "@ark-ui/svelte/slider";
</script>

<Slider.MarkerGroup data-scope="slider" data-part="marker-group" {...$$restProps}>
  <slot />
</Slider.MarkerGroup>
