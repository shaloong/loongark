<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticButtonGroupStyles } from "@loongark/primitives/automatic-styles/button-group";
  registerAutomaticStyles(lkAutomaticButtonGroupStyles);

  import { layoutAttributes, type LayoutOptions } from "@loongark/kit";
  export let as = "div";
  export let variant: LayoutOptions["variant"] = "default";
  export let size: LayoutOptions["size"] = "md";
  export let orientation: LayoutOptions["orientation"] = "horizontal";
  export let ratio: number | undefined = undefined;
</script>

<svelte:element
  this={as}
  {...layoutAttributes("ButtonGroup", { variant, size, orientation, ratio })}
  {...$$restProps}
  style:--lk-aspect-ratio={ratio}><slot /></svelte:element
>
