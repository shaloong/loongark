<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticCardStyles } from "@shaloong/loongark-primitives/automatic-styles/card";
  registerAutomaticStyles(lkAutomaticCardStyles);

  import { layoutAttributes, type LayoutOptions } from "@shaloong/loongark-kit";
  export let as = "h3";
  export let variant: LayoutOptions["variant"] = "default";
  export let size: LayoutOptions["size"] = "md";
  export let orientation: LayoutOptions["orientation"] = "horizontal";
  export let ratio: number | undefined = undefined;
</script>

<svelte:element
  this={as}
  {...layoutAttributes("CardTitle", { variant, size, orientation, ratio })}
  {...$$restProps}
  style:--lk-aspect-ratio={ratio}><slot /></svelte:element
>
