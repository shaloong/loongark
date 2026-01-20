declare module "@ark-ui/svelte/tooltip" {
  type SvelteComponent<P = any> = new (...args: any[]) => { $$prop_def: P };

  export interface TooltipRootProps {
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
    asChild?: boolean;
    disabled?: boolean;
    id?: string;
  }

  export interface TooltipPositionerProps {
    asChild?: boolean;
    id?: string;
  }

  export interface TooltipContentProps {
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
    asChild?: boolean;
    id?: string;
  }

  export interface TooltipArrowTipProps {
    asChild?: boolean;
    id?: string;
  }

  export const Tooltip: {
    Root: SvelteComponent<TooltipRootProps>;
    Trigger: SvelteComponent<TooltipTriggerProps>;
    Positioner: SvelteComponent<TooltipPositionerProps>;
    Content: SvelteComponent<TooltipContentProps>;
    Arrow: SvelteComponent<TooltipArrowProps>;
    ArrowTip: SvelteComponent<TooltipArrowTipProps>;
  };
}
