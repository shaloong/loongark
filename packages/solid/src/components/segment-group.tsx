
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticSegmentGroupStyles } from "@loongark/primitives/automatic-styles/segment-group";
/**
 * Segment Group component - Solid wrapper.
 * 使用 Ark UI SegmentGroup，保留单选语义和隐藏表单输入。
 */
import { type Component, type JSX, mergeProps } from "solid-js";
import {
  SegmentGroup as ArkSegmentGroup,
  type SegmentGroupRootProps as ArkSegmentGroupRootProps,
  type SegmentGroupItemProps as ArkSegmentGroupItemProps,
} from "@ark-ui/solid/segment-group";
import type {
  SegmentGroupOrientation,
  SegmentGroupSize,
} from "@loongark/primitives";

export interface LoongArkSegmentGroupRootProps extends Omit<
  ArkSegmentGroupRootProps,
  "asChild"
> {
  size?: SegmentGroupSize;
  orientation?: SegmentGroupOrientation;
  children?: JSX.Element;
}

export const LoongArkSegmentGroupRoot: Component<
  LoongArkSegmentGroupRootProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const merged = mergeProps(
    {
      size: "md" as SegmentGroupSize,
      orientation: "horizontal" as SegmentGroupOrientation,
    },
    props,
  );

  return (
    <ArkSegmentGroup.Root
      {...props}
      data-scope="segment-group"
      data-part="root"
      data-size={merged.size}
      data-orientation={merged.orientation}
    >
      {props.children}
    </ArkSegmentGroup.Root>
  );
}, lkAutomaticSegmentGroupStyles);

export const LoongArkSegmentGroupItem: Component<
  ArkSegmentGroupItemProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkSegmentGroup.Item {...props} data-scope="segment-group" data-part="item">
      {props.children}
    </ArkSegmentGroup.Item>
  );
}, lkAutomaticSegmentGroupStyles);
