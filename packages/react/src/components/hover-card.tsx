"use client";
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticHoverCardStyles } from "@shaloong/loongark-primitives/automatic-styles/hover-card";


/**
 * Hover Card component - React wrapper.
 * Uses Ark UI Hover Card with data attributes for styling.
 */
import React, { forwardRef, createElement } from "react";
import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import { HoverCard } from "@ark-ui/react/hover-card";
import { Portal as ArkPortal } from "./portal";
import type { HoverCardSize } from "@shaloong/loongark-primitives";

type ArkHoverCardRootProps = ComponentPropsWithoutRef<typeof HoverCard.Root>;
type ArkHoverCardTriggerProps = ComponentPropsWithoutRef<
  typeof HoverCard.Trigger
>;
type ArkHoverCardPositionerProps = ComponentPropsWithoutRef<
  typeof HoverCard.Positioner
>;
type ArkHoverCardContentProps = ComponentPropsWithoutRef<
  typeof HoverCard.Content
>;
type ArkHoverCardArrowProps = ComponentPropsWithoutRef<typeof HoverCard.Arrow>;
type ArkHoverCardArrowTipProps = ComponentPropsWithoutRef<
  typeof HoverCard.ArrowTip
>;

const SafePortal: FC<{ children?: ReactNode }> = ({ children }) =>
  createElement(ArkPortal, null, children);

export interface LoongArkHoverCardRootProps extends Omit<
  ArkHoverCardRootProps,
  "asChild"
> {
  size?: HoverCardSize;
  children?: ReactNode;
}

export const LoongArkHoverCardRoot = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  LoongArkHoverCardRootProps
>(({ size = "md", children, ...props }, ref) => {
  return (
    <HoverCard.Root
      {...props}
      data-scope="hover-card"
      data-part="root"
      data-size={size}
    >
      {children}
    </HoverCard.Root>
  );
}), lkAutomaticHoverCardStyles);

LoongArkHoverCardRoot.displayName = "LoongArkHoverCardRoot";

export const LoongArkHoverCardTrigger = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLButtonElement,
  ArkHoverCardTriggerProps
>((props, ref) => {
  return (
    <HoverCard.Trigger
      {...props}
      ref={ref}
      data-scope="hover-card"
      data-part="trigger"
    />
  );
}), lkAutomaticHoverCardStyles);

LoongArkHoverCardTrigger.displayName = "LoongArkHoverCardTrigger";

export const LoongArkHoverCardPositioner = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  Omit<ArkHoverCardPositionerProps, "asChild">
>((props, ref) => {
  return (
    <SafePortal>
      <HoverCard.Positioner
        {...props}
        ref={ref}
        data-scope="hover-card"
        data-part="positioner"
      />
    </SafePortal>
  );
}), lkAutomaticHoverCardStyles);

LoongArkHoverCardPositioner.displayName = "LoongArkHoverCardPositioner";

export const LoongArkHoverCardContent = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  Omit<ArkHoverCardContentProps, "asChild">
>((props, ref) => {
  return (
    <HoverCard.Content
      {...props}
      ref={ref}
      data-scope="hover-card"
      data-part="content"
    />
  );
}), lkAutomaticHoverCardStyles);

LoongArkHoverCardContent.displayName = "LoongArkHoverCardContent";

export const LoongArkHoverCardArrow = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  Omit<ArkHoverCardArrowProps, "asChild">
>((props, ref) => {
  return (
    <HoverCard.Arrow
      {...props}
      ref={ref}
      data-scope="hover-card"
      data-part="arrow"
    />
  );
}), lkAutomaticHoverCardStyles);

LoongArkHoverCardArrow.displayName = "LoongArkHoverCardArrow";

export const LoongArkHoverCardArrowTip = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  Omit<ArkHoverCardArrowTipProps, "asChild">
>((props, ref) => {
  return (
    <HoverCard.ArrowTip
      {...props}
      ref={ref}
      data-scope="hover-card"
      data-part="arrow-tip"
    />
  );
}), lkAutomaticHoverCardStyles);

LoongArkHoverCardArrowTip.displayName = "LoongArkHoverCardArrowTip";
