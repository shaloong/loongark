declare module "@ark-ui/react/carousel" {
  import React, { type ReactNode } from "react";

  type BaseProps = React.HTMLAttributes<HTMLElement> & {
    children?: ReactNode;
    asChild?: boolean;
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
    export const Root: React.FC<CarouselRootProps>;
    export const ItemGroup: React.FC<CarouselItemGroupProps>;
    export const Item: React.FC<CarouselItemProps>;
    export const Control: React.FC<CarouselControlProps>;
    export const NextTrigger: React.FC<CarouselNextTriggerProps>;
    export const PrevTrigger: React.FC<CarouselPrevTriggerProps>;
    export const IndicatorGroup: React.FC<CarouselIndicatorGroupProps>;
    export const Indicator: React.FC<CarouselIndicatorProps>;
    export const AutoplayTrigger: React.FC<CarouselAutoplayTriggerProps>;
    export const ProgressText: React.FC<CarouselProgressTextProps>;
    export const AutoplayIndicator: React.FC<CarouselAutoplayIndicatorProps>;
  }
}
