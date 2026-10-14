<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticTableStyles } from "@shaloong/loongark-primitives/automatic-styles/table";
  registerAutomaticStyles(lkAutomaticTableStyles);

  import { layoutAttributes, type LayoutOptions } from "@shaloong/loongark-kit";
  export let as = "table";
  export let variant: LayoutOptions["variant"] = "default";
  export let size: LayoutOptions["size"] = "md";
  export let orientation: LayoutOptions["orientation"] = "horizontal";
  export let ratio: number | undefined = undefined;
</script>

<svelte:element
  this={as}
  {...layoutAttributes("Table", { variant, size, orientation, ratio })}
  {...$$restProps}
  style:--lk-aspect-ratio={ratio}><slot /></svelte:element
>
