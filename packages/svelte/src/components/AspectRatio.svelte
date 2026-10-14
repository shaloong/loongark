<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticAspectRatioStyles } from "@shaloong/loongark-primitives/automatic-styles/aspect-ratio";
  registerAutomaticStyles(lkAutomaticAspectRatioStyles);

  import { layoutAttributes, type LayoutOptions } from "@shaloong/loongark-kit";
  export let as = "div";
  export let variant: LayoutOptions["variant"] = "default";
  export let size: LayoutOptions["size"] = "md";
  export let orientation: LayoutOptions["orientation"] = "horizontal";
  export let ratio: number | undefined = undefined;
</script>

<svelte:element
  this={as}
  {...layoutAttributes("AspectRatio", { variant, size, orientation, ratio })}
  {...$$restProps}
  style:--lk-aspect-ratio={ratio}><slot /></svelte:element
>
