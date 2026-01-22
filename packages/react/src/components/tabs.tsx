/**
 * Tabs 组件 - React 封装
 * 基于 Ark UI Tabs，注入 data-scope/data-part 与 size/orientation 映射
 */
import React, { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Tabs } from "@ark-ui/react/tabs";
import type { TabsOrientation, TabsSize } from "@loongark/primitives";

type ArkTabsRootProps = ComponentPropsWithoutRef<typeof Tabs.Root>;
type ArkTabsListProps = ComponentPropsWithoutRef<typeof Tabs.List>;
type ArkTabsTriggerProps = ComponentPropsWithoutRef<typeof Tabs.Trigger>;
type ArkTabsContentProps = ComponentPropsWithoutRef<typeof Tabs.Content>;
type ArkTabsIndicatorProps = ComponentPropsWithoutRef<typeof Tabs.Indicator>;

export interface LoongArkTabsRootProps
  extends Omit<ArkTabsRootProps, "asChild"> {
  children?: ReactNode;
  size?: TabsSize;
  orientation?: TabsOrientation;
}

export interface LoongArkTabsListProps
  extends Omit<ArkTabsListProps, "asChild"> {
  children?: ReactNode;
}

export interface LoongArkTabsTriggerProps
  extends Omit<ArkTabsTriggerProps, "asChild"> {
  children?: ReactNode;
}

export interface LoongArkTabsContentProps
  extends Omit<ArkTabsContentProps, "asChild"> {
  children?: ReactNode;
}

export interface LoongArkTabsIndicatorProps
  extends Omit<ArkTabsIndicatorProps, "asChild"> {
  children?: ReactNode;
}

export const LoongArkTabsRoot = forwardRef<
  HTMLDivElement,
  LoongArkTabsRootProps
>(({ children, size = "md", orientation = "horizontal", ...props }, ref) => {
  return (
    <Tabs.Root
      {...props}
      ref={ref}
      orientation={orientation}
      data-scope="tabs"
      data-part="root"
      data-size={size}
      data-orientation={orientation}
    >
      {children}
    </Tabs.Root>
  );
});

LoongArkTabsRoot.displayName = "LoongArkTabsRoot";

export const LoongArkTabsList = forwardRef<
  HTMLDivElement,
  LoongArkTabsListProps
>(({ children, ...props }, ref) => {
  return (
    <Tabs.List
      {...props}
      ref={ref}
      data-scope="tabs"
      data-part="list"
    >
      {children}
    </Tabs.List>
  );
});

LoongArkTabsList.displayName = "LoongArkTabsList";

export const LoongArkTabsTrigger = forwardRef<
  HTMLButtonElement,
  LoongArkTabsTriggerProps
>(({ children, ...props }, ref) => {
  return (
    <Tabs.Trigger
      {...props}
      ref={ref}
      data-scope="tabs"
      data-part="trigger"
    >
      {children}
    </Tabs.Trigger>
  );
});

LoongArkTabsTrigger.displayName = "LoongArkTabsTrigger";

export const LoongArkTabsContent = forwardRef<
  HTMLDivElement,
  LoongArkTabsContentProps
>(({ children, ...props }, ref) => {
  return (
    <Tabs.Content
      {...props}
      ref={ref}
      data-scope="tabs"
      data-part="content"
    >
      {children}
    </Tabs.Content>
  );
});

LoongArkTabsContent.displayName = "LoongArkTabsContent";

export const LoongArkTabsIndicator = forwardRef<
  HTMLDivElement,
  LoongArkTabsIndicatorProps
>(({ children, ...props }, ref) => {
  return (
    <Tabs.Indicator
      {...props}
      ref={ref}
      data-scope="tabs"
      data-part="indicator"
    >
      {children}
    </Tabs.Indicator>
  );
});

LoongArkTabsIndicator.displayName = "LoongArkTabsIndicator";
