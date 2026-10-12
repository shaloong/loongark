<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticMenubarStyles } from "@loongark/primitives/automatic-styles/menubar";
  registerAutomaticStyles(lkAutomaticMenubarStyles);

  import { onMount } from "svelte";
  import {
    layoutAttributes,
    mountMenubar,
    type LayoutOptions,
  } from "@loongark/kit";
  export let as = "div";
  export let variant: LayoutOptions["variant"] = "default";
  export let size: LayoutOptions["size"] = "md";
  export let orientation: LayoutOptions["orientation"] = "horizontal";
  export let ratio: number | undefined = undefined;
  let element: HTMLElement;
  onMount(() => mountMenubar(element));
</script>

<svelte:element
  this={as}
  bind:this={element}
  {...layoutAttributes("Menubar", { variant, size, orientation, ratio })}
  {...$$restProps}
  style:--lk-aspect-ratio={ratio}><slot /></svelte:element
>
