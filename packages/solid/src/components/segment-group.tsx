/**
 * Segment Group component - Solid wrapper.
 * Uses Ark UI Toggle Group under the hood.
 */
import { type Component, type JSX, mergeProps } from "solid-js";
import {
  ToggleGroup as ArkToggleGroup,
  type ToggleGroupRootProps as ArkToggleGroupRootProps,
  type ToggleGroupItemProps as ArkToggleGroupItemProps,
} from "@ark-ui/solid/toggle-group";
import type {
  SegmentGroupOrientation,
  SegmentGroupSize,
} from "@loongark/primitives";

export interface LoongArkSegmentGroupRootProps
  extends Omit<ArkToggleGroupRootProps, "asChild"> {
  size?: SegmentGroupSize;
  orientation?: SegmentGroupOrientation;
  children?: JSX.Element;
}

export const LoongArkSegmentGroupRoot: Component<
  LoongArkSegmentGroupRootProps
> = (props) => {
  const merged = mergeProps(
    {
      size: "md" as SegmentGroupSize,
      orientation: "horizontal" as SegmentGroupOrientation,
    },
    props
  );

  return (
    <ArkToggleGroup.Root
      {...(props as any)}
      data-scope="segment-group"
      data-part="root"
      data-size={merged.size}
      data-orientation={merged.orientation}
    >
      {props.children}
    </ArkToggleGroup.Root>
  );
};

export const LoongArkSegmentGroupItem: Component<
  ArkToggleGroupItemProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkToggleGroup.Item
      {...props}
      data-scope="segment-group"
      data-part="item"
    >
      {props.children}
    </ArkToggleGroup.Item>
  );
};
