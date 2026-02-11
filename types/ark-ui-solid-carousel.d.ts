declare module "@ark-ui/solid/carousel" {
  import type { Component, JSX } from "solid-js";

  type BaseProps = {
    children?: JSX.Element;
    asChild?: boolean;
    [key: string]: any;
  };

  export interface CarouselRootProps extends BaseProps {}
  export interface CarouselItemGroupProps extends BaseProps {}
  export interface CarouselItemProps extends BaseProps {}
  export interface CarouselControlProps extends BaseProps {}
  export interface CarouselNextTriggerProps extends BaseProps {}
  export interface CarouselPrevTriggerProps extends BaseProps {}
  export interface CarouselIndicatorGroupProps extends BaseProps {}
  export interface CarouselIndicatorProps extends BaseProps {}
  export interface CarouselAutoplayTriggerProps extends BaseProps {}
  export interface CarouselProgressTextProps extends BaseProps {}
  export interface CarouselAutoplayIndicatorProps extends BaseProps {}

  export namespace Carousel {
    export const Root: Component<CarouselRootProps>;
    export const ItemGroup: Component<CarouselItemGroupProps>;
    export const Item: Component<CarouselItemProps>;
    export const Control: Component<CarouselControlProps>;
    export const NextTrigger: Component<CarouselNextTriggerProps>;
    export const PrevTrigger: Component<CarouselPrevTriggerProps>;
    export const IndicatorGroup: Component<CarouselIndicatorGroupProps>;
    export const Indicator: Component<CarouselIndicatorProps>;
    export const AutoplayTrigger: Component<CarouselAutoplayTriggerProps>;
    export const ProgressText: Component<CarouselProgressTextProps>;
    export const AutoplayIndicator: Component<CarouselAutoplayIndicatorProps>;
  }
}
