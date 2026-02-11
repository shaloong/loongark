declare module "@ark-ui/vue/carousel" {
  type VueComponent<P = any> = (props: P & { children?: any }) => any;

  export interface CarouselRootProps {}
  export interface CarouselItemGroupProps {}
  export interface CarouselItemProps {}
  export interface CarouselControlProps {}
  export interface CarouselNextTriggerProps {}
  export interface CarouselPrevTriggerProps {}
  export interface CarouselIndicatorGroupProps {}
  export interface CarouselIndicatorProps {}
  export interface CarouselAutoplayTriggerProps {}
  export interface CarouselProgressTextProps {}
  export interface CarouselAutoplayIndicatorProps {}

  export const Carousel: {
    Root: VueComponent<CarouselRootProps>;
    ItemGroup: VueComponent<CarouselItemGroupProps>;
    Item: VueComponent<CarouselItemProps>;
    Control: VueComponent<CarouselControlProps>;
    NextTrigger: VueComponent<CarouselNextTriggerProps>;
    PrevTrigger: VueComponent<CarouselPrevTriggerProps>;
    IndicatorGroup: VueComponent<CarouselIndicatorGroupProps>;
    Indicator: VueComponent<CarouselIndicatorProps>;
    AutoplayTrigger: VueComponent<CarouselAutoplayTriggerProps>;
    ProgressText: VueComponent<CarouselProgressTextProps>;
    AutoplayIndicator: VueComponent<CarouselAutoplayIndicatorProps>;
  };
}
