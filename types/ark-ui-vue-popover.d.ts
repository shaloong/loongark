declare module "@ark-ui/vue/popover" {
  type VueComponent<P = any> = (props: P & { children?: any }) => any;

  export interface PopoverRootProps {
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
    asChild?: boolean;
    disabled?: boolean;
    id?: string;
  }

  export interface PopoverPositionerProps {
    asChild?: boolean;
    id?: string;
  }

  export interface PopoverContentProps {
    asChild?: boolean;
    trapFocus?: boolean;
    restoreFocus?: boolean;
    autoFocus?: boolean;
    positioning?: any;
    id?: string;
  }

  export interface PopoverArrowProps {
    asChild?: boolean;
    id?: string;
  }

  export interface PopoverTitleProps {
    asChild?: boolean;
    id?: string;
  }

  export interface PopoverDescriptionProps {
    asChild?: boolean;
    id?: string;
  }

  export interface PopoverCloseTriggerProps {
    asChild?: boolean;
    id?: string;
  }

  export const Popover: {
    Root: VueComponent<PopoverRootProps>;
    Trigger: VueComponent<PopoverTriggerProps>;
    Positioner: VueComponent<PopoverPositionerProps>;
    Content: VueComponent<PopoverContentProps>;
    Arrow: VueComponent<PopoverArrowProps>;
    Title: VueComponent<PopoverTitleProps>;
    Description: VueComponent<PopoverDescriptionProps>;
    CloseTrigger: VueComponent<PopoverCloseTriggerProps>;
  };
}
