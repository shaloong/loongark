/**
 * Segment Group component - React wrapper.
 * Uses Ark UI Toggle Group under the hood.
 */
import React, { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ToggleGroup } from "@ark-ui/react/toggle-group";
import type {
  SegmentGroupOrientation,
  SegmentGroupSize,
} from "@loongark/primitives";

type ArkToggleGroupRootProps = ComponentPropsWithoutRef<typeof ToggleGroup.Root>;
type ArkToggleGroupItemProps = ComponentPropsWithoutRef<typeof ToggleGroup.Item>;

export interface LoongArkSegmentGroupRootProps
  extends Omit<ArkToggleGroupRootProps, "asChild"> {
  size?: SegmentGroupSize;
  orientation?: SegmentGroupOrientation;
  children?: ReactNode;
}

export interface LoongArkSegmentGroupItemProps
  extends Omit<ArkToggleGroupItemProps, "asChild"> {
  children?: ReactNode;
}

export const LoongArkSegmentGroupRoot = forwardRef<
  HTMLDivElement,
  LoongArkSegmentGroupRootProps
>(({ children, size = "md", orientation = "horizontal", ...props }, ref) => {
  return (
    <ToggleGroup.Root
      {...props}
      ref={ref}
      data-scope="segment-group"
      data-part="root"
      data-size={size}
      data-orientation={orientation}
    >
      {children}
    </ToggleGroup.Root>
  );
});

LoongArkSegmentGroupRoot.displayName = "LoongArkSegmentGroupRoot";

export const LoongArkSegmentGroupItem = forwardRef<
  HTMLButtonElement,
  LoongArkSegmentGroupItemProps
>(({ children, ...props }, ref) => {
  return (
    <ToggleGroup.Item
      {...props}
      ref={ref}
      data-scope="segment-group"
      data-part="item"
    >
      {children}
    </ToggleGroup.Item>
  );
});

LoongArkSegmentGroupItem.displayName = "LoongArkSegmentGroupItem";
