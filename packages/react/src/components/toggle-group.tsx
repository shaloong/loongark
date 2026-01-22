/**
 * Toggle Group component - React wrapper.
 * Injects data-scope/data-part and size/orientation mapping.
 */
import React, { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ToggleGroup } from "@ark-ui/react/toggle-group";
import type { ToggleGroupOrientation, ToggleGroupSize } from "@loongark/primitives";

type ArkToggleGroupRootProps = ComponentPropsWithoutRef<typeof ToggleGroup.Root>;
type ArkToggleGroupItemProps = ComponentPropsWithoutRef<typeof ToggleGroup.Item>;

export interface LoongArkToggleGroupRootProps
  extends Omit<ArkToggleGroupRootProps, "asChild"> {
  size?: ToggleGroupSize;
  orientation?: ToggleGroupOrientation;
  children?: ReactNode;
}

export interface LoongArkToggleGroupItemProps
  extends Omit<ArkToggleGroupItemProps, "asChild"> {
  children?: ReactNode;
}

export const LoongArkToggleGroupRoot = forwardRef<
  HTMLDivElement,
  LoongArkToggleGroupRootProps
>(({ children, size = "md", orientation = "horizontal", ...props }, ref) => {
  return (
    <ToggleGroup.Root
      {...props}
      ref={ref}
      data-scope="toggle-group"
      data-part="root"
      data-size={size}
      data-orientation={orientation}
    >
      {children}
    </ToggleGroup.Root>
  );
});

LoongArkToggleGroupRoot.displayName = "LoongArkToggleGroupRoot";

export const LoongArkToggleGroupItem = forwardRef<
  HTMLButtonElement,
  LoongArkToggleGroupItemProps
>(({ children, ...props }, ref) => {
  return (
    <ToggleGroup.Item
      {...props}
      ref={ref}
      data-scope="toggle-group"
      data-part="item"
    >
      {children}
    </ToggleGroup.Item>
  );
});

LoongArkToggleGroupItem.displayName = "LoongArkToggleGroupItem";
