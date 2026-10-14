"use client";
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticCollapsibleStyles } from "@shaloong/loongark-primitives/automatic-styles/collapsible";


/**
 * Collapsible component - React wrapper.
 * Injects data-scope/data-part and size mapping.
 */
import React, { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Collapsible } from "@ark-ui/react/collapsible";
import type { CollapsibleSize } from "@shaloong/loongark-primitives";

type ArkCollapsibleRootProps = ComponentPropsWithoutRef<
  typeof Collapsible.Root
>;
type ArkCollapsibleTriggerProps = ComponentPropsWithoutRef<
  typeof Collapsible.Trigger
>;
type ArkCollapsibleContentProps = ComponentPropsWithoutRef<
  typeof Collapsible.Content
>;
type ArkCollapsibleIndicatorProps = ComponentPropsWithoutRef<
  typeof Collapsible.Indicator
>;

export interface LoongArkCollapsibleRootProps
  extends Omit<ArkCollapsibleRootProps, "asChild"> {
  children?: ReactNode;
  size?: CollapsibleSize;
}

export interface LoongArkCollapsibleTriggerProps
  extends Omit<ArkCollapsibleTriggerProps, "asChild"> {
  children?: ReactNode;
}

export interface LoongArkCollapsibleContentProps
  extends Omit<ArkCollapsibleContentProps, "asChild"> {
  children?: ReactNode;
}

export interface LoongArkCollapsibleIndicatorProps
  extends Omit<ArkCollapsibleIndicatorProps, "asChild"> {
  children?: ReactNode;
}

export const LoongArkCollapsibleRoot = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  LoongArkCollapsibleRootProps
>(({ children, size = "md", ...props }, ref) => {
  return (
    <Collapsible.Root
      {...props}
      ref={ref}
      data-scope="collapsible"
      data-part="root"
      data-size={size}
    >
      {children}
    </Collapsible.Root>
  );
}), lkAutomaticCollapsibleStyles);

LoongArkCollapsibleRoot.displayName = "LoongArkCollapsibleRoot";

export const LoongArkCollapsibleTrigger = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLButtonElement,
  LoongArkCollapsibleTriggerProps
>(({ children, ...props }, ref) => {
  return (
    <Collapsible.Trigger
      {...props}
      ref={ref}
      data-scope="collapsible"
      data-part="trigger"
    >
      {children}
    </Collapsible.Trigger>
  );
}), lkAutomaticCollapsibleStyles);

LoongArkCollapsibleTrigger.displayName = "LoongArkCollapsibleTrigger";

export const LoongArkCollapsibleContent = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  LoongArkCollapsibleContentProps
>(({ children, ...props }, ref) => {
  return (
    <Collapsible.Content
      {...props}
      ref={ref}
      data-scope="collapsible"
      data-part="content"
    >
      {children}
    </Collapsible.Content>
  );
}), lkAutomaticCollapsibleStyles);

LoongArkCollapsibleContent.displayName = "LoongArkCollapsibleContent";

export const LoongArkCollapsibleIndicator = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  LoongArkCollapsibleIndicatorProps
>(({ children, ...props }, ref) => {
  return (
    <Collapsible.Indicator
      {...props}
      ref={ref}
      data-scope="collapsible"
      data-part="indicator"
    >
      {children}
    </Collapsible.Indicator>
  );
}), lkAutomaticCollapsibleStyles);

LoongArkCollapsibleIndicator.displayName = "LoongArkCollapsibleIndicator";
