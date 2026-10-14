<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticSliderStyles } from "@shaloong/loongark-primitives/automatic-styles/slider";
  registerAutomaticStyles(lkAutomaticSliderStyles);

  import { Slider } from "@ark-ui/svelte/slider";
</script>

<Slider.ValueText data-scope="slider" data-part="value-text" {...$$restProps}>
  <slot />
</Slider.ValueText>
