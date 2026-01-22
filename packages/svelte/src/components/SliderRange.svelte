<script lang="ts">
  import { Slider } from "@ark-ui/svelte/slider";
</script>

<Slider.Range data-scope="slider" data-part="range" {...$$restProps}>
  <slot />
</Slider.Range>
