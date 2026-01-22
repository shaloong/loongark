<script lang="ts">
  import { Slider } from "@ark-ui/svelte/slider";
</script>

<Slider.ValueText data-scope="slider" data-part="value-text" {...$$restProps}>
  <slot />
</Slider.ValueText>
