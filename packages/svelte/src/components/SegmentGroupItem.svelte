<script lang="ts">
 import { SegmentGroup, type SegmentGroupItemProps } from "@ark-ui/svelte/segment-group";
 let { ref=$bindable(null),children,...props }: SegmentGroupItemProps=$props();
</script>
<SegmentGroup.Item {...props} bind:ref data-scope="segment-group" data-part="item">{@render children?.()}</SegmentGroup.Item>
