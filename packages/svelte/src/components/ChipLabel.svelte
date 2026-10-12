<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticChipStyles } from "@loongark/primitives/automatic-styles/chip";
  registerAutomaticStyles(lkAutomaticChipStyles);

  import {
    layoutAttributes,
    layoutStyles,
    type LayoutOptions,
  } from "@loongark/kit";
  export let as = "span";
  export let variant: LayoutOptions["variant"] = "default";
  export let size: LayoutOptions["size"] = "md";
  export let orientation: LayoutOptions["orientation"] = "horizontal";
  export let gap: LayoutOptions["gap"] = undefined;
  export let padding: LayoutOptions["padding"] = undefined;
  export let columns: number | undefined = undefined;
  export let active = false;
  $: vars = layoutStyles({ gap, padding, columns });
</script>

<svelte:element
  this={as}
  {...layoutAttributes("ChipLabel", { variant, size, orientation, active })}
  {...$$restProps}
  style:--lk-layout-gap={vars["--lk-layout-gap"]}
  style:--lk-layout-padding={vars["--lk-layout-padding"]}
  style:--lk-grid-columns={vars["--lk-grid-columns"]}
  on:click
  on:keydown
  on:focus
  on:blur><slot /></svelte:element
>
