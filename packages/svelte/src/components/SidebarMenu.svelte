<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticSidebarStyles } from "@loongark/primitives/automatic-styles/sidebar";
  registerAutomaticStyles(lkAutomaticSidebarStyles);

  import { layoutAttributes, type LayoutOptions } from "@loongark/kit";
  export let as = "ul";
  export let variant: LayoutOptions["variant"] = "default";
  export let size: LayoutOptions["size"] = "md";
  export let orientation: LayoutOptions["orientation"] = "horizontal";
  export let ratio: number | undefined = undefined;
</script>

<svelte:element
  this={as}
  {...layoutAttributes("SidebarMenu", { variant, size, orientation, ratio })}
  {...$$restProps}
  style:--lk-aspect-ratio={ratio}><slot /></svelte:element
>
