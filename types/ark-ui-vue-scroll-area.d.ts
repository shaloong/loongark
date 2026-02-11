declare module "@ark-ui/vue/scroll-area" {
  type VueComponent<P = any> = (props: P & { children?: any }) => any;

  export interface ScrollAreaRootProps {}
  export interface ScrollAreaViewportProps {}
  export interface ScrollAreaContentProps {}
  export interface ScrollAreaScrollbarProps {}
  export interface ScrollAreaThumbProps {}
  export interface ScrollAreaCornerProps {}

  export const ScrollArea: {
    Root: VueComponent<ScrollAreaRootProps>;
    Viewport: VueComponent<ScrollAreaViewportProps>;
    Content: VueComponent<ScrollAreaContentProps>;
    Scrollbar: VueComponent<ScrollAreaScrollbarProps>;
    Thumb: VueComponent<ScrollAreaThumbProps>;
    Corner: VueComponent<ScrollAreaCornerProps>;
  };
}
