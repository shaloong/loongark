declare module "@ark-ui/solid/scroll-area" {
  import type { Component, JSX } from "solid-js";

  type BaseProps = {
    children?: JSX.Element;
    asChild?: boolean;
    [key: string]: any;
  };

  export interface ScrollAreaRootProps extends BaseProps {}
  export interface ScrollAreaViewportProps extends BaseProps {}
  export interface ScrollAreaContentProps extends BaseProps {}
  export interface ScrollAreaScrollbarProps extends BaseProps {}
  export interface ScrollAreaThumbProps extends BaseProps {}
  export interface ScrollAreaCornerProps extends BaseProps {}

  export namespace ScrollArea {
    export const Root: Component<ScrollAreaRootProps>;
    export const Viewport: Component<ScrollAreaViewportProps>;
    export const Content: Component<ScrollAreaContentProps>;
    export const Scrollbar: Component<ScrollAreaScrollbarProps>;
    export const Thumb: Component<ScrollAreaThumbProps>;
    export const Corner: Component<ScrollAreaCornerProps>;
  }
}
