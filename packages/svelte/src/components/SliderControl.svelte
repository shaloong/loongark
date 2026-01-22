<script lang="ts">
  import { Slider } from "@ark-ui/svelte/slider";
</script>

<Slider.Control data-scope="slider" data-part="control" {...$$restProps}>
  <slot />
</Slider.Control>
