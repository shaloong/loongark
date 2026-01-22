/**
 * Toggle component - React wrapper.
 * Injects data-scope/data-part and size mapping.
 */
import React, { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Toggle } from "@ark-ui/react/toggle";
import type { ToggleSize } from "@loongark/primitives";

type ArkToggleRootProps = ComponentPropsWithoutRef<typeof Toggle.Root>;
type ArkToggleIndicatorProps = ComponentPropsWithoutRef<typeof Toggle.Indicator>;

export interface LoongArkToggleRootProps
  extends Omit<ArkToggleRootProps, "asChild"> {
  size?: ToggleSize;
  children?: ReactNode;
}

export interface LoongArkToggleIndicatorProps
  extends Omit<ArkToggleIndicatorProps, "asChild"> {
  children?: ReactNode;
}

export const LoongArkToggleRoot = forwardRef<
  HTMLButtonElement,
  LoongArkToggleRootProps
>(({ children, size = "md", ...props }, ref) => {
  return (
    <Toggle.Root
      {...props}
      ref={ref}
      data-scope="toggle"
      data-part="root"
      data-size={size}
    >
      {children}
    </Toggle.Root>
  );
});

LoongArkToggleRoot.displayName = "LoongArkToggleRoot";

export const LoongArkToggleIndicator = forwardRef<
  HTMLDivElement,
  LoongArkToggleIndicatorProps
>(({ children, ...props }, ref) => {
  return (
    <Toggle.Indicator
      {...props}
      ref={ref}
      data-scope="toggle"
      data-part="indicator"
    >
      {children}
    </Toggle.Indicator>
  );
});

LoongArkToggleIndicator.displayName = "LoongArkToggleIndicator";
