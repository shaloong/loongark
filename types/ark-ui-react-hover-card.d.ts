declare module "@ark-ui/react/hover-card" {
  import React, { type ReactNode } from "react";

  type BaseProps = React.HTMLAttributes<HTMLElement> & {
    children?: ReactNode;
    asChild?: boolean;
  };

  export interface HoverCardRootProps extends BaseProps {}
  export interface HoverCardTriggerProps extends BaseProps {}
  export interface HoverCardPositionerProps extends BaseProps {}
  export interface HoverCardContentProps extends BaseProps {}
  export interface HoverCardArrowProps extends BaseProps {}
  export interface HoverCardArrowTipProps extends BaseProps {}

  export namespace HoverCard {
    export const Root: React.FC<HoverCardRootProps>;
    export const Trigger: React.FC<HoverCardTriggerProps>;
    export const Positioner: React.FC<HoverCardPositionerProps>;
    export const Content: React.FC<HoverCardContentProps>;
    export const Arrow: React.FC<HoverCardArrowProps>;
    export const ArrowTip: React.FC<HoverCardArrowTipProps>;
  }
}
