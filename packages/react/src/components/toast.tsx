/**
 * Toast component - React wrapper
 * Based on Ark UI Toast, injects data-scope/data-part.
 */
import React, { forwardRef } from "react";
import {
  Toast as ArkToast,
  Toaster as ArkToaster,
  createToaster,
  type ToastRootProps as ArkToastRootProps,
  type ToastTitleProps as ArkToastTitleProps,
  type ToastDescriptionProps as ArkToastDescriptionProps,
  type ToastActionTriggerProps as ArkToastActionTriggerProps,
  type ToastCloseTriggerProps as ArkToastCloseTriggerProps,
  type ToasterProps as ArkToasterProps,
  type CreateToasterProps,
  type CreateToasterReturn,
  type ToastOptions,
  type ToastPlacement,
  type ToastType,
  type ToastStatus,
} from "@ark-ui/react/toast";

export const LoongArkToaster = forwardRef<HTMLDivElement, ArkToasterProps>(
  (props, ref) => (
    <ArkToaster
      {...props}
      ref={ref}
      data-scope="toast"
      data-part="group"
    />
  )
);
LoongArkToaster.displayName = "LoongArkToaster";

export const LoongArkToastRoot = forwardRef<HTMLDivElement, ArkToastRootProps>(
  (props, ref) => (
    <ArkToast.Root
      {...props}
      ref={ref}
      data-scope="toast"
      data-part="root"
    />
  )
);
LoongArkToastRoot.displayName = "LoongArkToastRoot";

export const LoongArkToastTitle = forwardRef<HTMLDivElement, ArkToastTitleProps>(
  (props, ref) => (
    <ArkToast.Title
      {...props}
      ref={ref}
      data-scope="toast"
      data-part="title"
    />
  )
);
LoongArkToastTitle.displayName = "LoongArkToastTitle";

export const LoongArkToastDescription = forwardRef<
  HTMLDivElement,
  ArkToastDescriptionProps
>((props, ref) => (
  <ArkToast.Description
    {...props}
    ref={ref}
    data-scope="toast"
    data-part="description"
  />
));
LoongArkToastDescription.displayName = "LoongArkToastDescription";

export const LoongArkToastActionTrigger = forwardRef<
  HTMLButtonElement,
  ArkToastActionTriggerProps
>((props, ref) => (
  <ArkToast.ActionTrigger
    {...props}
    ref={ref}
    data-scope="toast"
    data-part="action-trigger"
  />
));
LoongArkToastActionTrigger.displayName = "LoongArkToastActionTrigger";

export const LoongArkToastCloseTrigger = forwardRef<
  HTMLButtonElement,
  ArkToastCloseTriggerProps
>((props, ref) => (
  <ArkToast.CloseTrigger
    {...props}
    ref={ref}
    data-scope="toast"
    data-part="close-trigger"
  />
));
LoongArkToastCloseTrigger.displayName = "LoongArkToastCloseTrigger";

export { createToaster };
export type {
  CreateToasterProps,
  CreateToasterReturn,
  ToastOptions,
  ToastPlacement,
  ToastType,
  ToastStatus,
};
