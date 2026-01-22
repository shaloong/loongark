declare module "@ark-ui/solid/toast" {
  import type { Component, JSX } from "solid-js";

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

  export interface ToastOptions<T = JSX.Element> {
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
    children?: (toast: ToastOptions) => JSX.Element;
    id?: string;
    label?: string;
    placement?: ToastPlacement;
  }

  export const createToaster: (props?: CreateToasterProps) => CreateToasterReturn;
  export const Toaster: Component<ToasterProps>;

  export interface ToastRootProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ToastTitleProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ToastDescriptionProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ToastActionTriggerProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ToastCloseTriggerProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export namespace Toast {
    export const Root: Component<ToastRootProps>;
    export const Title: Component<ToastTitleProps>;
    export const Description: Component<ToastDescriptionProps>;
    export const ActionTrigger: Component<ToastActionTriggerProps>;
    export const CloseTrigger: Component<ToastCloseTriggerProps>;
  }
}
