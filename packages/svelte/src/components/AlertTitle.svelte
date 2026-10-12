<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticAlertStyles } from "@loongark/primitives/automatic-styles/alert";
  registerAutomaticStyles(lkAutomaticAlertStyles);

  import { layoutAttributes, type LayoutOptions } from "@loongark/kit";
  export let as = "h5";
  export let variant: LayoutOptions["variant"] = "default";
  export let size: LayoutOptions["size"] = "md";
  export let orientation: LayoutOptions["orientation"] = "horizontal";
  export let ratio: number | undefined = undefined;
</script>

<svelte:element
  this={as}
  {...layoutAttributes("AlertTitle", { variant, size, orientation, ratio })}
  {...$$restProps}
  style:--lk-aspect-ratio={ratio}><slot /></svelte:element
>
