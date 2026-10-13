"use client";
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticCarouselStyles } from "@loongark/primitives/automatic-styles/carousel";


/**
 * Carousel component - React wrapper.
 * Uses Ark UI Carousel with data attributes for styling.
 */
import React, { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Carousel } from "@ark-ui/react/carousel";
import type { CarouselSize } from "@loongark/primitives";

type ArkCarouselRootProps = ComponentPropsWithoutRef<typeof Carousel.Root>;
type ArkCarouselItemGroupProps = ComponentPropsWithoutRef<typeof Carousel.ItemGroup>;
type ArkCarouselItemProps = ComponentPropsWithoutRef<typeof Carousel.Item>;
type ArkCarouselControlProps = ComponentPropsWithoutRef<typeof Carousel.Control>;
type ArkCarouselNextTriggerProps = ComponentPropsWithoutRef<
  typeof Carousel.NextTrigger
>;
type ArkCarouselPrevTriggerProps = ComponentPropsWithoutRef<
  typeof Carousel.PrevTrigger
>;
type ArkCarouselIndicatorGroupProps = ComponentPropsWithoutRef<
  typeof Carousel.IndicatorGroup
>;
type ArkCarouselIndicatorProps = ComponentPropsWithoutRef<
  typeof Carousel.Indicator
>;
type ArkCarouselAutoplayTriggerProps = ComponentPropsWithoutRef<
  typeof Carousel.AutoplayTrigger
>;
type ArkCarouselProgressTextProps = ComponentPropsWithoutRef<
  typeof Carousel.ProgressText
>;
type ArkCarouselAutoplayIndicatorProps = ComponentPropsWithoutRef<
  typeof Carousel.AutoplayIndicator
>;

export interface LoongArkCarouselRootProps
  extends Omit<ArkCarouselRootProps, "asChild"> {
  size?: CarouselSize;
  children?: ReactNode;
}

export const LoongArkCarouselRoot = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  LoongArkCarouselRootProps
>(({ size = "md", children, ...props }, ref) => {
  return (
    <Carousel.Root
      {...props}
      ref={ref}
      data-scope="carousel"
      data-part="root"
      data-size={size}
    >
      {children}
    </Carousel.Root>
  );
}), lkAutomaticCarouselStyles);

LoongArkCarouselRoot.displayName = "LoongArkCarouselRoot";

export const LoongArkCarouselItemGroup = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkCarouselItemGroupProps
>((props, ref) => {
  return (
    <Carousel.ItemGroup
      {...props}
      ref={ref}
      data-scope="carousel"
      data-part="item-group"
    />
  );
}), lkAutomaticCarouselStyles);

LoongArkCarouselItemGroup.displayName = "LoongArkCarouselItemGroup";

export const LoongArkCarouselItem = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkCarouselItemProps
>((props, ref) => {
  return (
    <Carousel.Item
      {...props}
      ref={ref}
      data-scope="carousel"
      data-part="item"
    />
  );
}), lkAutomaticCarouselStyles);

LoongArkCarouselItem.displayName = "LoongArkCarouselItem";

export const LoongArkCarouselControl = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkCarouselControlProps
>((props, ref) => {
  return (
    <Carousel.Control
      {...props}
      ref={ref}
      data-scope="carousel"
      data-part="control"
    />
  );
}), lkAutomaticCarouselStyles);

LoongArkCarouselControl.displayName = "LoongArkCarouselControl";

export const LoongArkCarouselNextTrigger = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLButtonElement,
  ArkCarouselNextTriggerProps
>((props, ref) => {
  return (
    <Carousel.NextTrigger
      {...props}
      ref={ref}
      data-scope="carousel"
      data-part="next-trigger"
    />
  );
}), lkAutomaticCarouselStyles);

LoongArkCarouselNextTrigger.displayName = "LoongArkCarouselNextTrigger";

export const LoongArkCarouselPrevTrigger = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLButtonElement,
  ArkCarouselPrevTriggerProps
>((props, ref) => {
  return (
    <Carousel.PrevTrigger
      {...props}
      ref={ref}
      data-scope="carousel"
      data-part="prev-trigger"
    />
  );
}), lkAutomaticCarouselStyles);

LoongArkCarouselPrevTrigger.displayName = "LoongArkCarouselPrevTrigger";

export const LoongArkCarouselIndicatorGroup = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkCarouselIndicatorGroupProps
>((props, ref) => {
  return (
    <Carousel.IndicatorGroup
      {...props}
      ref={ref}
      data-scope="carousel"
      data-part="indicator-group"
    />
  );
}), lkAutomaticCarouselStyles);

LoongArkCarouselIndicatorGroup.displayName = "LoongArkCarouselIndicatorGroup";

export const LoongArkCarouselIndicator = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLButtonElement,
  ArkCarouselIndicatorProps
>((props, ref) => {
  return (
    <Carousel.Indicator
      {...props}
      ref={ref}
      data-scope="carousel"
      data-part="indicator"
    />
  );
}), lkAutomaticCarouselStyles);

LoongArkCarouselIndicator.displayName = "LoongArkCarouselIndicator";

export const LoongArkCarouselAutoplayTrigger = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLButtonElement,
  ArkCarouselAutoplayTriggerProps
>((props, ref) => {
  return (
    <Carousel.AutoplayTrigger
      {...props}
      ref={ref}
      data-scope="carousel"
      data-part="autoplay-trigger"
    />
  );
}), lkAutomaticCarouselStyles);

LoongArkCarouselAutoplayTrigger.displayName = "LoongArkCarouselAutoplayTrigger";

export const LoongArkCarouselProgressText = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLSpanElement,
  ArkCarouselProgressTextProps
>((props, ref) => {
  return (
    <Carousel.ProgressText
      {...props}
      ref={ref}
      data-scope="carousel"
      data-part="progress-text"
    />
  );
}), lkAutomaticCarouselStyles);

LoongArkCarouselProgressText.displayName = "LoongArkCarouselProgressText";

export const LoongArkCarouselAutoplayIndicator = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkCarouselAutoplayIndicatorProps
>((props, ref) => {
  return (
    <Carousel.AutoplayIndicator
      {...props}
      ref={ref}
      data-scope="carousel"
      data-part="autoplay-indicator"
    />
  );
}), lkAutomaticCarouselStyles);

LoongArkCarouselAutoplayIndicator.displayName =
  "LoongArkCarouselAutoplayIndicator";
