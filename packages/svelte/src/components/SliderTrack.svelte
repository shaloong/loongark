<script lang="ts">
  import { Slider } from "@ark-ui/svelte/slider";
</script>

<Slider.Track data-scope="slider" data-part="track" {...$$restProps}>
  <slot />
</Slider.Track>
