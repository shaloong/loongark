"use client";
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticScrollAreaStyles } from "@loongark/primitives/automatic-styles/scroll-area";


/**
 * Scroll Area component - React wrapper.
 * Uses Ark UI Scroll Area with data attributes for styling.
 */
import React, { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ScrollArea } from "@ark-ui/react/scroll-area";
import type { ScrollAreaSize } from "@loongark/primitives";

type ArkScrollAreaRootProps = ComponentPropsWithoutRef<typeof ScrollArea.Root>;
type ArkScrollAreaViewportProps = ComponentPropsWithoutRef<
  typeof ScrollArea.Viewport
>;
type ArkScrollAreaContentProps = ComponentPropsWithoutRef<
  typeof ScrollArea.Content
>;
type ArkScrollAreaScrollbarProps = ComponentPropsWithoutRef<
  typeof ScrollArea.Scrollbar
>;
type ArkScrollAreaThumbProps = ComponentPropsWithoutRef<
  typeof ScrollArea.Thumb
>;
type ArkScrollAreaCornerProps = ComponentPropsWithoutRef<
  typeof ScrollArea.Corner
>;

export interface LoongArkScrollAreaRootProps extends Omit<
  ArkScrollAreaRootProps,
  "asChild"
> {
  size?: ScrollAreaSize;
  children?: ReactNode;
}

export const LoongArkScrollAreaRoot = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  LoongArkScrollAreaRootProps
>(({ size = "md", children, ...props }, ref) => {
  return (
    <ScrollArea.Root
      {...props}
      ref={ref}
      data-scope="scroll-area"
      data-part="root"
      data-size={size}
    >
      {children}
    </ScrollArea.Root>
  );
}), lkAutomaticScrollAreaStyles);

LoongArkScrollAreaRoot.displayName = "LoongArkScrollAreaRoot";

export const LoongArkScrollAreaViewport = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkScrollAreaViewportProps
>((props, ref) => {
  return (
    <ScrollArea.Viewport
      tabIndex={0}
      {...props}
      ref={ref}
      data-scope="scroll-area"
      data-part="viewport"
    />
  );
}), lkAutomaticScrollAreaStyles);

LoongArkScrollAreaViewport.displayName = "LoongArkScrollAreaViewport";

export const LoongArkScrollAreaContent = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkScrollAreaContentProps
>((props, ref) => {
  return (
    <ScrollArea.Content
      {...props}
      ref={ref}
      data-scope="scroll-area"
      data-part="content"
    />
  );
}), lkAutomaticScrollAreaStyles);

LoongArkScrollAreaContent.displayName = "LoongArkScrollAreaContent";

export const LoongArkScrollAreaScrollbar = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkScrollAreaScrollbarProps
>((props, ref) => {
  return (
    <ScrollArea.Scrollbar
      {...props}
      ref={ref}
      data-scope="scroll-area"
      data-part="scrollbar"
    />
  );
}), lkAutomaticScrollAreaStyles);

LoongArkScrollAreaScrollbar.displayName = "LoongArkScrollAreaScrollbar";

export const LoongArkScrollAreaThumb = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkScrollAreaThumbProps
>((props, ref) => {
  return (
    <ScrollArea.Thumb
      {...props}
      ref={ref}
      data-scope="scroll-area"
      data-part="thumb"
    />
  );
}), lkAutomaticScrollAreaStyles);

LoongArkScrollAreaThumb.displayName = "LoongArkScrollAreaThumb";

export const LoongArkScrollAreaCorner = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkScrollAreaCornerProps
>((props, ref) => {
  return (
    <ScrollArea.Corner
      {...props}
      ref={ref}
      data-scope="scroll-area"
      data-part="corner"
    />
  );
}), lkAutomaticScrollAreaStyles);

LoongArkScrollAreaCorner.displayName = "LoongArkScrollAreaCorner";
