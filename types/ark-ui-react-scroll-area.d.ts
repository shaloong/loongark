declare module "@ark-ui/react/scroll-area" {
  import React, { type ReactNode } from "react";

  type BaseProps = React.HTMLAttributes<HTMLElement> & {
    children?: ReactNode;
    asChild?: boolean;
  };

  export interface ScrollAreaRootProps extends BaseProps {}
  export interface ScrollAreaViewportProps extends BaseProps {}
  export interface ScrollAreaContentProps extends BaseProps {}
  export interface ScrollAreaScrollbarProps extends BaseProps {}
  export interface ScrollAreaThumbProps extends BaseProps {}
  export interface ScrollAreaCornerProps extends BaseProps {}

  export namespace ScrollArea {
    export const Root: React.FC<ScrollAreaRootProps>;
    export const Viewport: React.FC<ScrollAreaViewportProps>;
    export const Content: React.FC<ScrollAreaContentProps>;
    export const Scrollbar: React.FC<ScrollAreaScrollbarProps>;
    export const Thumb: React.FC<ScrollAreaThumbProps>;
    export const Corner: React.FC<ScrollAreaCornerProps>;
  }
}
