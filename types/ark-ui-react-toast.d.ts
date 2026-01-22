declare module "@ark-ui/react/toast" {
  import type {
    ReactNode,
    ForwardRefExoticComponent,
    RefAttributes,
  } from "react";

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

  export interface ToastOptions<T = ReactNode> {
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
    children: (toast: ToastOptions) => ReactNode;
    id?: string;
    label?: string;
    placement?: ToastPlacement;
  }

  export const createToaster: (props?: CreateToasterProps) => CreateToasterReturn;
  export const Toaster: ForwardRefExoticComponent<
    ToasterProps & RefAttributes<HTMLDivElement>
  >;

  export interface ToastRootProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ToastTitleProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ToastDescriptionProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ToastActionTriggerProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ToastCloseTriggerProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export const ToastRoot: ForwardRefExoticComponent<
    ToastRootProps & RefAttributes<HTMLDivElement>
  >;
  export const ToastTitle: ForwardRefExoticComponent<
    ToastTitleProps & RefAttributes<HTMLDivElement>
  >;
  export const ToastDescription: ForwardRefExoticComponent<
    ToastDescriptionProps & RefAttributes<HTMLDivElement>
  >;
  export const ToastActionTrigger: ForwardRefExoticComponent<
    ToastActionTriggerProps & RefAttributes<HTMLButtonElement>
  >;
  export const ToastCloseTrigger: ForwardRefExoticComponent<
    ToastCloseTriggerProps & RefAttributes<HTMLButtonElement>
  >;

  export const Toast: {
    Root: typeof ToastRoot;
    Title: typeof ToastTitle;
    Description: typeof ToastDescription;
    ActionTrigger: typeof ToastActionTrigger;
    CloseTrigger: typeof ToastCloseTrigger;
  };

  export const useToastContext: () => any;
}
