<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticSpinnerStyles } from "@loongark/primitives/automatic-styles/spinner";
  registerAutomaticStyles(lkAutomaticSpinnerStyles);

  import { layoutAttributes, type LayoutOptions } from "@loongark/kit";
  export let as = "span";
  export let variant: LayoutOptions["variant"] = "default";
  export let size: LayoutOptions["size"] = "md";
  export let orientation: LayoutOptions["orientation"] = "horizontal";
  export let ratio: number | undefined = undefined;
</script>

<svelte:element
  this={as}
  {...layoutAttributes("Spinner", { variant, size, orientation, ratio })}
  {...$$restProps}
  style:--lk-aspect-ratio={ratio}><slot /></svelte:element
>
