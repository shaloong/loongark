declare module "@ark-ui/react/tooltip" {
  import type {
    ReactNode,
    Ref,
    ForwardRefExoticComponent,
    RefAttributes,
    FC,
  } from "react";

  export interface PositioningOptions {
    placement?: string;
    gutter?: number;
    offset?: number;
  }

  export interface OpenChangeDetails {
    open: boolean;
  }

  export interface TooltipRootProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (details: OpenChangeDetails) => void;
    openDelay?: number;
    closeDelay?: number;
    closeOnPointerDown?: boolean;
    closeOnScroll?: boolean;
    closeOnEscape?: boolean;
    closeOnClick?: boolean;
    disabled?: boolean;
    interactive?: boolean;
    positioning?: PositioningOptions;
    lazyMount?: boolean;
    unmountOnExit?: boolean;
    skipAnimationOnMount?: boolean;
    immediate?: boolean;
    present?: boolean;
    ids?: Partial<{ trigger: string; content: string; arrow: string; positioner: string }>;
    id?: string;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface TooltipTriggerProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface TooltipPositionerProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface TooltipContentProps {
    children?: ReactNode;
    asChild?: boolean;
    interactive?: boolean;
  }

  export interface TooltipArrowProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface TooltipArrowTipProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export const Root: FC<TooltipRootProps>;
  export const Trigger: ForwardRefExoticComponent<
    TooltipTriggerProps & RefAttributes<HTMLElement>
  >;
  export const Positioner: ForwardRefExoticComponent<
    TooltipPositionerProps & RefAttributes<HTMLDivElement>
  >;
  export const Content: ForwardRefExoticComponent<
    TooltipContentProps & RefAttributes<HTMLDivElement>
  >;
  export const Arrow: ForwardRefExoticComponent<
    TooltipArrowProps & RefAttributes<HTMLDivElement>
  >;
  export const ArrowTip: ForwardRefExoticComponent<
    TooltipArrowTipProps & RefAttributes<HTMLDivElement>
  >;

  export const Tooltip: {
    Root: typeof Root;
    Trigger: typeof Trigger;
    Positioner: typeof Positioner;
    Content: typeof Content;
    Arrow: typeof Arrow;
    ArrowTip: typeof ArrowTip;
  };
}

