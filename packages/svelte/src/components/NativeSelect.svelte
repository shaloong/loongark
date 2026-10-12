<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticNativeSelectStyles } from "@loongark/primitives/automatic-styles/native-select";
  registerAutomaticStyles(lkAutomaticNativeSelectStyles);

  import { layoutAttributes, type LayoutOptions } from "@loongark/kit";
  export let as = "select";
  export let variant: LayoutOptions["variant"] = "default";
  export let size: LayoutOptions["size"] = "md";
  export let orientation: LayoutOptions["orientation"] = "horizontal";
  export let ratio: number | undefined = undefined;
  export let value: string | number | string[] | undefined = undefined;
</script>

{#if as === "select"}
  <select
    bind:value
    {...layoutAttributes("NativeSelect", { variant, size, orientation, ratio })}
    {...$$restProps}
    style:--lk-aspect-ratio={ratio}><slot /></select>
{:else}
<svelte:element
  this={as}
  {...layoutAttributes("NativeSelect", { variant, size, orientation, ratio })}
  {...$$restProps}
  style:--lk-aspect-ratio={ratio}><slot /></svelte:element
>
{/if}
