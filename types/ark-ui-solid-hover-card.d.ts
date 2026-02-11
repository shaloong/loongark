declare module "@ark-ui/solid/hover-card" {
  import type { Component, JSX } from "solid-js";

  type BaseProps = {
    children?: JSX.Element;
    asChild?: boolean;
    [key: string]: any;
  };

  export interface HoverCardRootProps extends BaseProps {}
  export interface HoverCardTriggerProps extends BaseProps {}
  export interface HoverCardPositionerProps extends BaseProps {}
  export interface HoverCardContentProps extends BaseProps {}
  export interface HoverCardArrowProps extends BaseProps {}
  export interface HoverCardArrowTipProps extends BaseProps {}

  export namespace HoverCard {
    export const Root: Component<HoverCardRootProps>;
    export const Trigger: Component<HoverCardTriggerProps>;
    export const Positioner: Component<HoverCardPositionerProps>;
    export const Content: Component<HoverCardContentProps>;
    export const Arrow: Component<HoverCardArrowProps>;
    export const ArrowTip: Component<HoverCardArrowTipProps>;
  }
}
