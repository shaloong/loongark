<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticSegmentGroupStyles } from "@shaloong/loongark-primitives/automatic-styles/segment-group";
  registerAutomaticStyles(lkAutomaticSegmentGroupStyles);

  import {
    SegmentGroup,
    type SegmentGroupRootProps,
  } from "@ark-ui/svelte/segment-group";
  import type { SegmentGroupSize } from "@shaloong/loongark-primitives";
  interface Props extends SegmentGroupRootProps {
    size?: SegmentGroupSize;
  }
  let {
    ref = $bindable(null),
    value = $bindable(),
    size = "md",
    children,
    ...props
  }: Props = $props();
</script>

<SegmentGroup.Root
  {...props}
  bind:ref
  bind:value
  data-scope="segment-group"
  data-part="root"
  data-size={size}
>
  {@render children?.()}
</SegmentGroup.Root>
