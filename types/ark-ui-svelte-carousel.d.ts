declare module "@ark-ui/svelte/carousel" {
  type SvelteComponent<P = any> = new (...args: any[]) => { $$prop_def: P };

  export interface CarouselRootProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface CarouselItemGroupProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface CarouselItemProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface CarouselControlProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface CarouselNextTriggerProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface CarouselPrevTriggerProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface CarouselIndicatorGroupProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface CarouselIndicatorProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface CarouselAutoplayTriggerProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface CarouselProgressTextProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface CarouselAutoplayIndicatorProps {
    asChild?: boolean;
    [key: string]: any;
  }

  export const Carousel: {
    Root: SvelteComponent<CarouselRootProps>;
    ItemGroup: SvelteComponent<CarouselItemGroupProps>;
    Item: SvelteComponent<CarouselItemProps>;
    Control: SvelteComponent<CarouselControlProps>;
    NextTrigger: SvelteComponent<CarouselNextTriggerProps>;
    PrevTrigger: SvelteComponent<CarouselPrevTriggerProps>;
    IndicatorGroup: SvelteComponent<CarouselIndicatorGroupProps>;
    Indicator: SvelteComponent<CarouselIndicatorProps>;
    AutoplayTrigger: SvelteComponent<CarouselAutoplayTriggerProps>;
    ProgressText: SvelteComponent<CarouselProgressTextProps>;
    AutoplayIndicator: SvelteComponent<CarouselAutoplayIndicatorProps>;
  };
}
