<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticSegmentGroupStyles } from "@shaloong/loongark-primitives/automatic-styles/segment-group";
  registerAutomaticStyles(lkAutomaticSegmentGroupStyles);

 import { SegmentGroup, type SegmentGroupItemProps } from "@ark-ui/svelte/segment-group";
 let { ref=$bindable(null),children,...props }: SegmentGroupItemProps=$props();
</script>
<SegmentGroup.Item {...props} bind:ref data-scope="segment-group" data-part="item">{@render children?.()}</SegmentGroup.Item>
