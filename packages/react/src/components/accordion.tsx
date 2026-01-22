/**
 * Accordion component - React wrapper.
 * Injects data-scope/data-part and size/orientation mapping.
 */
import React, { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Accordion } from "@ark-ui/react/accordion";
import type { AccordionOrientation, AccordionSize } from "@loongark/primitives";

type ArkAccordionRootProps = ComponentPropsWithoutRef<typeof Accordion.Root>;
type ArkAccordionItemProps = ComponentPropsWithoutRef<typeof Accordion.Item>;
type ArkAccordionItemTriggerProps = ComponentPropsWithoutRef<
  typeof Accordion.ItemTrigger
>;
type ArkAccordionItemContentProps = ComponentPropsWithoutRef<
  typeof Accordion.ItemContent
>;
type ArkAccordionItemIndicatorProps = ComponentPropsWithoutRef<
  typeof Accordion.ItemIndicator
>;

export interface LoongArkAccordionRootProps
  extends Omit<ArkAccordionRootProps, "asChild"> {
  children?: ReactNode;
  size?: AccordionSize;
  orientation?: AccordionOrientation;
}

export interface LoongArkAccordionItemProps
  extends Omit<ArkAccordionItemProps, "asChild"> {
  children?: ReactNode;
}

export interface LoongArkAccordionItemTriggerProps
  extends Omit<ArkAccordionItemTriggerProps, "asChild"> {
  children?: ReactNode;
}

export interface LoongArkAccordionItemContentProps
  extends Omit<ArkAccordionItemContentProps, "asChild"> {
  children?: ReactNode;
}

export interface LoongArkAccordionItemIndicatorProps
  extends Omit<ArkAccordionItemIndicatorProps, "asChild"> {
  children?: ReactNode;
}

export const LoongArkAccordionRoot = forwardRef<
  HTMLDivElement,
  LoongArkAccordionRootProps
>(({ children, size = "md", orientation = "vertical", ...props }, ref) => {
  return (
    <Accordion.Root
      {...props}
      ref={ref}
      orientation={orientation}
      data-scope="accordion"
      data-part="root"
      data-size={size}
      data-orientation={orientation}
    >
      {children}
    </Accordion.Root>
  );
});

LoongArkAccordionRoot.displayName = "LoongArkAccordionRoot";

export const LoongArkAccordionItem = forwardRef<
  HTMLDivElement,
  LoongArkAccordionItemProps
>(({ children, ...props }, ref) => {
  return (
    <Accordion.Item {...props} ref={ref} data-scope="accordion" data-part="item">
      {children}
    </Accordion.Item>
  );
});

LoongArkAccordionItem.displayName = "LoongArkAccordionItem";

export const LoongArkAccordionItemTrigger = forwardRef<
  HTMLButtonElement,
  LoongArkAccordionItemTriggerProps
>(({ children, ...props }, ref) => {
  return (
    <Accordion.ItemTrigger
      {...props}
      ref={ref}
      data-scope="accordion"
      data-part="item-trigger"
    >
      {children}
    </Accordion.ItemTrigger>
  );
});

LoongArkAccordionItemTrigger.displayName = "LoongArkAccordionItemTrigger";

export const LoongArkAccordionItemContent = forwardRef<
  HTMLDivElement,
  LoongArkAccordionItemContentProps
>(({ children, ...props }, ref) => {
  return (
    <Accordion.ItemContent
      {...props}
      ref={ref}
      data-scope="accordion"
      data-part="item-content"
    >
      {children}
    </Accordion.ItemContent>
  );
});

LoongArkAccordionItemContent.displayName = "LoongArkAccordionItemContent";

export const LoongArkAccordionItemIndicator = forwardRef<
  HTMLDivElement,
  LoongArkAccordionItemIndicatorProps
>(({ children, ...props }, ref) => {
  return (
    <Accordion.ItemIndicator
      {...props}
      ref={ref}
      data-scope="accordion"
      data-part="item-indicator"
    >
      {children}
    </Accordion.ItemIndicator>
  );
});

LoongArkAccordionItemIndicator.displayName = "LoongArkAccordionItemIndicator";
