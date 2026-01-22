declare module "@ark-ui/svelte/toast" {
  type SvelteComponent<P = any> = new (...args: any[]) => { $$prop_def: P };

  export type ToastType =
    | "success"
    | "error"
    | "warning"
    | "info"
    | "loading"
    | (string & {});
  export type ToastPlacement =
    | "top-start"
    | "top"
    | "top-end"
    | "bottom-start"
    | "bottom"
    | "bottom-end";
  export type ToastStatus = "visible" | "dismissing" | "unmounted";

  export interface ToastActionOptions {
    label: string;
    onClick: VoidFunction;
  }

  export interface ToastOptions<T = any> {
    title?: T;
    description?: T;
    duration?: number;
    removeDelay?: number;
    id?: string;
    type?: ToastType;
    action?: ToastActionOptions;
    closable?: boolean;
    meta?: Record<string, any>;
  }

  export interface CreateToasterProps {
    placement?: ToastPlacement;
    max?: number;
    overlap?: boolean;
    duration?: number;
    gap?: number;
    offsets?: string | Record<"left" | "right" | "bottom" | "top", string>;
    removeDelay?: number;
    pauseOnPageIdle?: boolean;
  }

  export interface CreateToasterReturn {
    create: (data: ToastOptions) => string;
    update: (id: string, data: Partial<ToastOptions>) => string;
    remove: (id?: string) => void;
    dismiss: (id?: string) => void;
    success: (data: ToastOptions) => void;
    error: (data: ToastOptions) => void;
    info: (data: ToastOptions) => void;
    warning: (data: ToastOptions) => void;
    loading: (data: ToastOptions) => void;
  }

  export interface ToasterProps {
    toaster: CreateToasterReturn;
    id?: string;
    label?: string;
    placement?: ToastPlacement;
  }

  export const createToaster: (props?: CreateToasterProps) => CreateToasterReturn;
  export const Toaster: SvelteComponent<ToasterProps>;

  export interface ToastRootProps {
    asChild?: boolean;
  }

  export interface ToastTitleProps {
    asChild?: boolean;
  }

  export interface ToastDescriptionProps {
    asChild?: boolean;
  }

  export interface ToastActionTriggerProps {
    asChild?: boolean;
  }

  export interface ToastCloseTriggerProps {
    asChild?: boolean;
  }

  export const Toast: {
    Root: SvelteComponent<ToastRootProps>;
    Title: SvelteComponent<ToastTitleProps>;
    Description: SvelteComponent<ToastDescriptionProps>;
    ActionTrigger: SvelteComponent<ToastActionTriggerProps>;
    CloseTrigger: SvelteComponent<ToastCloseTriggerProps>;
  };
}
