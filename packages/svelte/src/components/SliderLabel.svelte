<script lang="ts">
  import { Slider } from "@ark-ui/svelte/slider";
</script>

<Slider.Label data-scope="slider" data-part="label" {...$$restProps}>
  <slot />
</Slider.Label>
