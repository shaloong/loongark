/**
 * Segment Group component - React wrapper.
 * 使用 Ark UI SegmentGroup，保留单选语义和隐藏表单输入。
 */
import React, { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { SegmentGroup } from "@ark-ui/react/segment-group";
import type {
  SegmentGroupOrientation,
  SegmentGroupSize,
} from "@loongark/primitives";

type ArkSegmentGroupRootProps = ComponentPropsWithoutRef<typeof SegmentGroup.Root>;
type ArkSegmentGroupItemProps = ComponentPropsWithoutRef<typeof SegmentGroup.Item>;

export interface LoongArkSegmentGroupRootProps
  extends Omit<ArkSegmentGroupRootProps, "asChild"> {
  size?: SegmentGroupSize;
  orientation?: SegmentGroupOrientation;
  children?: ReactNode;
}

export interface LoongArkSegmentGroupItemProps
  extends Omit<ArkSegmentGroupItemProps, "asChild"> {
  children?: ReactNode;
}

export const LoongArkSegmentGroupRoot = forwardRef<
  HTMLDivElement,
  LoongArkSegmentGroupRootProps
>(({ children, size = "md", orientation = "horizontal", ...props }, ref) => {
  return (
    <SegmentGroup.Root
      {...props}
      ref={ref}
      data-scope="segment-group"
      data-part="root"
      data-size={size}
      data-orientation={orientation}
    >
      {children}
    </SegmentGroup.Root>
  );
});

LoongArkSegmentGroupRoot.displayName = "LoongArkSegmentGroupRoot";

export const LoongArkSegmentGroupItem = forwardRef<
  HTMLLabelElement,
  LoongArkSegmentGroupItemProps
>(({ children, ...props }, ref) => {
  return (
    <SegmentGroup.Item
      {...props}
      ref={ref}
      data-scope="segment-group"
      data-part="item"
    >
      {children}
    </SegmentGroup.Item>
  );
});

LoongArkSegmentGroupItem.displayName = "LoongArkSegmentGroupItem";
