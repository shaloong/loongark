import type { SegmentGroupRootProps as ArkRootProps, SegmentGroupItemProps as ArkItemProps } from "@ark-ui/svelte/segment-group";
import type { SegmentGroupSize } from "@loongark/primitives";
export interface SegmentGroupRootProps extends ArkRootProps { size?: SegmentGroupSize; }
export type SegmentGroupItemProps = ArkItemProps;
