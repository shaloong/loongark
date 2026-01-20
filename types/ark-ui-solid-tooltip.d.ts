declare module "@ark-ui/solid/tooltip" {
  import type { Component, JSX } from "solid-js";

  export interface TooltipRootProps {
    children?: JSX.Element;
    asChild?: boolean;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (details: { open: boolean }) => void;
    openDelay?: number;
    closeDelay?: number;
    closeOnClick?: boolean;
    closeOnEscape?: boolean;
    closeOnPointerDown?: boolean;
    closeOnScroll?: boolean;
    interactive?: boolean;
    positioning?: any;
    lazyMount?: boolean;
    unmountOnExit?: boolean;
    ids?: any;
    disabled?: boolean;
  }

  export interface TooltipTriggerProps {
    children?: JSX.Element;
    asChild?: boolean;
    id?: string;
    disabled?: boolean;
  }

  export interface TooltipPositionerProps {
    children?: JSX.Element;
    asChild?: boolean;
    id?: string;
  }

  export interface TooltipContentProps {
    children?: JSX.Element;
    asChild?: boolean;
    id?: string;
    role?: string;
    interactive?: boolean;
    onPointerDownOutside?: (event: any) => void;
    onFocusOutside?: (event: any) => void;
    onInteractOutside?: (event: any) => void;
    onEscapeKeyDown?: (event: any) => void;
    onKeyDown?: (event: any) => void;
  }

  export interface TooltipArrowProps {
    children?: JSX.Element;
    asChild?: boolean;
    id?: string;
  }

  export interface TooltipArrowTipProps {
    children?: JSX.Element;
    asChild?: boolean;
    id?: string;
  }

  export namespace Tooltip {
    export const Root: Component<TooltipRootProps>;
    export const Trigger: Component<TooltipTriggerProps>;
    export const Positioner: Component<TooltipPositionerProps>;
    export const Content: Component<TooltipContentProps>;
    export const Arrow: Component<TooltipArrowProps>;
    export const ArrowTip: Component<TooltipArrowTipProps>;
  }
}
