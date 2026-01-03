declare module "@ark-ui/solid/popover" {
  import type { Component, JSX } from "solid-js";

  export interface PopoverRootProps {
    children?: JSX.Element;
    asChild?: boolean;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (details: { open: boolean }) => void;
    closeOnEscape?: boolean;
    closeOnInteractOutside?: boolean;
    closeOnScroll?: boolean;
    modal?: boolean;
    positioning?: any;
    lazyMount?: boolean;
    unmountOnExit?: boolean;
    ids?: any;
  }

  export interface PopoverTriggerProps {
    children?: JSX.Element;
    asChild?: boolean;
    disabled?: boolean;
    id?: string;
  }

  export interface PopoverContentProps {
    children?: JSX.Element;
    asChild?: boolean;
    trapFocus?: boolean;
    restoreFocus?: boolean;
    autoFocus?: boolean;
    positioning?: any;
    id?: string;
  }

  export interface PopoverPositionerProps {
    children?: JSX.Element;
    asChild?: boolean;
    id?: string;
  }

  export interface PopoverArrowProps {
    children?: JSX.Element;
    asChild?: boolean;
    id?: string;
  }

  export interface PopoverTitleProps {
    children?: JSX.Element;
    asChild?: boolean;
    id?: string;
  }

  export interface PopoverDescriptionProps {
    children?: JSX.Element;
    asChild?: boolean;
    id?: string;
  }

  export interface PopoverCloseTriggerProps {
    children?: JSX.Element;
    asChild?: boolean;
    id?: string;
  }

  export namespace Popover {
    export const Root: Component<PopoverRootProps>;
    export const Trigger: Component<PopoverTriggerProps>;
    export const Positioner: Component<PopoverPositionerProps>;
    export const Content: Component<PopoverContentProps>;
    export const Arrow: Component<PopoverArrowProps>;
    export const Title: Component<PopoverTitleProps>;
    export const Description: Component<PopoverDescriptionProps>;
    export const CloseTrigger: Component<PopoverCloseTriggerProps>;
  }
}
