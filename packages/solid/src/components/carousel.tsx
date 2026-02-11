/**
 * Carousel component - Solid wrapper.
 * Uses Ark UI Carousel with data attributes for styling.
 */
import { type Component, type JSX, mergeProps, splitProps } from "solid-js";
import {
  Carousel as ArkCarousel,
  type CarouselRootProps as ArkCarouselRootProps,
  type CarouselItemGroupProps as ArkCarouselItemGroupProps,
  type CarouselItemProps as ArkCarouselItemProps,
  type CarouselControlProps as ArkCarouselControlProps,
  type CarouselNextTriggerProps as ArkCarouselNextTriggerProps,
  type CarouselPrevTriggerProps as ArkCarouselPrevTriggerProps,
  type CarouselIndicatorGroupProps as ArkCarouselIndicatorGroupProps,
  type CarouselIndicatorProps as ArkCarouselIndicatorProps,
  type CarouselAutoplayTriggerProps as ArkCarouselAutoplayTriggerProps,
  type CarouselProgressTextProps as ArkCarouselProgressTextProps,
  type CarouselAutoplayIndicatorProps as ArkCarouselAutoplayIndicatorProps,
} from "@ark-ui/solid/carousel";
import type { CarouselSize } from "@loongark/primitives";

export interface LoongArkCarouselRootProps
  extends Omit<ArkCarouselRootProps, "asChild"> {
  size?: CarouselSize;
  children?: JSX.Element;
}

export const LoongArkCarouselRoot: Component<LoongArkCarouselRootProps> = (
  props
) => {
  const merged = mergeProps({ size: "md" as CarouselSize }, props);
  const [local, others] = splitProps(merged, ["children", "size"]);

  return (
    <ArkCarousel.Root
      {...(others as any)}
      data-scope="carousel"
      data-part="root"
      data-size={local.size}
    >
      {local.children}
    </ArkCarousel.Root>
  );
};

export interface LoongArkCarouselItemGroupProps
  extends Omit<ArkCarouselItemGroupProps, "asChild"> {
  children?: JSX.Element;
}

export const LoongArkCarouselItemGroup: Component<
  LoongArkCarouselItemGroupProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkCarousel.ItemGroup
      {...others}
      data-scope="carousel"
      data-part="item-group"
    >
      {local.children}
    </ArkCarousel.ItemGroup>
  );
};

export interface LoongArkCarouselItemProps
  extends Omit<ArkCarouselItemProps, "asChild"> {
  children?: JSX.Element;
}

export const LoongArkCarouselItem: Component<LoongArkCarouselItemProps> = (
  props
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkCarousel.Item {...others} data-scope="carousel" data-part="item">
      {local.children}
    </ArkCarousel.Item>
  );
};

export interface LoongArkCarouselControlProps
  extends Omit<ArkCarouselControlProps, "asChild"> {
  children?: JSX.Element;
}

export const LoongArkCarouselControl: Component<LoongArkCarouselControlProps> = (
  props
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkCarousel.Control
      {...others}
      data-scope="carousel"
      data-part="control"
    >
      {local.children}
    </ArkCarousel.Control>
  );
};

export interface LoongArkCarouselNextTriggerProps
  extends Omit<ArkCarouselNextTriggerProps, "asChild"> {
  children?: JSX.Element;
}

export const LoongArkCarouselNextTrigger: Component<
  LoongArkCarouselNextTriggerProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkCarousel.NextTrigger
      {...others}
      data-scope="carousel"
      data-part="next-trigger"
    >
      {local.children}
    </ArkCarousel.NextTrigger>
  );
};

export interface LoongArkCarouselPrevTriggerProps
  extends Omit<ArkCarouselPrevTriggerProps, "asChild"> {
  children?: JSX.Element;
}

export const LoongArkCarouselPrevTrigger: Component<
  LoongArkCarouselPrevTriggerProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkCarousel.PrevTrigger
      {...others}
      data-scope="carousel"
      data-part="prev-trigger"
    >
      {local.children}
    </ArkCarousel.PrevTrigger>
  );
};

export interface LoongArkCarouselIndicatorGroupProps
  extends Omit<ArkCarouselIndicatorGroupProps, "asChild"> {
  children?: JSX.Element;
}

export const LoongArkCarouselIndicatorGroup: Component<
  LoongArkCarouselIndicatorGroupProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkCarousel.IndicatorGroup
      {...others}
      data-scope="carousel"
      data-part="indicator-group"
    >
      {local.children}
    </ArkCarousel.IndicatorGroup>
  );
};

export interface LoongArkCarouselIndicatorProps
  extends Omit<ArkCarouselIndicatorProps, "asChild"> {
  children?: JSX.Element;
}

export const LoongArkCarouselIndicator: Component<
  LoongArkCarouselIndicatorProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkCarousel.Indicator
      {...others}
      data-scope="carousel"
      data-part="indicator"
    >
      {local.children}
    </ArkCarousel.Indicator>
  );
};

export interface LoongArkCarouselAutoplayTriggerProps
  extends Omit<ArkCarouselAutoplayTriggerProps, "asChild"> {
  children?: JSX.Element;
}

export const LoongArkCarouselAutoplayTrigger: Component<
  LoongArkCarouselAutoplayTriggerProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkCarousel.AutoplayTrigger
      {...others}
      data-scope="carousel"
      data-part="autoplay-trigger"
    >
      {local.children}
    </ArkCarousel.AutoplayTrigger>
  );
};

export interface LoongArkCarouselProgressTextProps
  extends Omit<ArkCarouselProgressTextProps, "asChild"> {
  children?: JSX.Element;
}

export const LoongArkCarouselProgressText: Component<
  LoongArkCarouselProgressTextProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkCarousel.ProgressText
      {...others}
      data-scope="carousel"
      data-part="progress-text"
    >
      {local.children}
    </ArkCarousel.ProgressText>
  );
};

export interface LoongArkCarouselAutoplayIndicatorProps
  extends Omit<ArkCarouselAutoplayIndicatorProps, "asChild"> {
  children?: JSX.Element;
}

export const LoongArkCarouselAutoplayIndicator: Component<
  LoongArkCarouselAutoplayIndicatorProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkCarousel.AutoplayIndicator
      {...others}
      data-scope="carousel"
      data-part="autoplay-indicator"
    >
      {local.children}
    </ArkCarousel.AutoplayIndicator>
  );
};
