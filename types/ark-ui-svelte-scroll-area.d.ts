declare module "@ark-ui/svelte/scroll-area" {
  type SvelteComponent<P = any> = new (...args: any[]) => { $$prop_def: P };

  export interface ScrollAreaRootProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ScrollAreaViewportProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ScrollAreaContentProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ScrollAreaScrollbarProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ScrollAreaThumbProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ScrollAreaCornerProps {
    asChild?: boolean;
    [key: string]: any;
  }

  export const ScrollArea: {
    Root: SvelteComponent<ScrollAreaRootProps>;
    Viewport: SvelteComponent<ScrollAreaViewportProps>;
    Content: SvelteComponent<ScrollAreaContentProps>;
    Scrollbar: SvelteComponent<ScrollAreaScrollbarProps>;
    Thumb: SvelteComponent<ScrollAreaThumbProps>;
    Corner: SvelteComponent<ScrollAreaCornerProps>;
  };
}
