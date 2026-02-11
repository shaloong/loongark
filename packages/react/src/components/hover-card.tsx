/**
 * Hover Card component - React wrapper.
 * Uses Ark UI Hover Card with data attributes for styling.
 */
import React, { forwardRef, createElement } from "react";
import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import { HoverCard } from "@ark-ui/react/hover-card";
import { Portal as ArkPortal } from "@ark-ui/react/portal";
import type { HoverCardSize } from "@loongark/primitives";

type ArkHoverCardRootProps = ComponentPropsWithoutRef<typeof HoverCard.Root>;
type ArkHoverCardTriggerProps = ComponentPropsWithoutRef<typeof HoverCard.Trigger>;
type ArkHoverCardPositionerProps = ComponentPropsWithoutRef<
  typeof HoverCard.Positioner
>;
type ArkHoverCardContentProps = ComponentPropsWithoutRef<typeof HoverCard.Content>;
type ArkHoverCardArrowProps = ComponentPropsWithoutRef<typeof HoverCard.Arrow>;
type ArkHoverCardArrowTipProps = ComponentPropsWithoutRef<
  typeof HoverCard.ArrowTip
>;

const SafePortal: FC<{ children?: ReactNode }> = ({ children }) =>
  createElement(ArkPortal as unknown as FC<{ children?: ReactNode }>, null, children);

export interface LoongArkHoverCardRootProps
  extends Omit<ArkHoverCardRootProps, "asChild"> {
  size?: HoverCardSize;
  children?: ReactNode;
}

export const LoongArkHoverCardRoot = forwardRef<
  HTMLDivElement,
  LoongArkHoverCardRootProps
>(({ size = "md", children, ...props }, ref) => {
  return (
    <HoverCard.Root
      {...props}
      ref={ref}
      data-scope="hover-card"
      data-part="root"
      data-size={size}
    >
      {children}
    </HoverCard.Root>
  );
});

LoongArkHoverCardRoot.displayName = "LoongArkHoverCardRoot";

export const LoongArkHoverCardTrigger = forwardRef<
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
});

LoongArkHoverCardTrigger.displayName = "LoongArkHoverCardTrigger";

export const LoongArkHoverCardPositioner = forwardRef<
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
});

LoongArkHoverCardPositioner.displayName = "LoongArkHoverCardPositioner";

export const LoongArkHoverCardContent = forwardRef<
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
});

LoongArkHoverCardContent.displayName = "LoongArkHoverCardContent";

export const LoongArkHoverCardArrow = forwardRef<
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
});

LoongArkHoverCardArrow.displayName = "LoongArkHoverCardArrow";

export const LoongArkHoverCardArrowTip = forwardRef<
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
});

LoongArkHoverCardArrowTip.displayName = "LoongArkHoverCardArrowTip";
