<script lang="ts">
  import { Slider } from "@ark-ui/svelte/slider";
</script>

<Slider.DraggingIndicator
  data-scope="slider"
  data-part="dragging-indicator"
  {...$$restProps}
>
  <slot />
</Slider.DraggingIndicator>
