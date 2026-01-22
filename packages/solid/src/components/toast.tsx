/**
 * Toast component - Solid wrapper
 * Based on Ark UI Toast, injects data-scope/data-part.
 */
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
} from "@ark-ui/solid/toast";

export const LoongArkToaster = (props: ArkToasterProps) => (
  <ArkToaster {...props} data-scope="toast" data-part="group" />
);

export const LoongArkToastRoot = (props: ArkToastRootProps) => (
  <ArkToast.Root {...props} data-scope="toast" data-part="root" />
);

export const LoongArkToastTitle = (props: ArkToastTitleProps) => (
  <ArkToast.Title {...props} data-scope="toast" data-part="title" />
);

export const LoongArkToastDescription = (props: ArkToastDescriptionProps) => (
  <ArkToast.Description
    {...props}
    data-scope="toast"
    data-part="description"
  />
);

export const LoongArkToastActionTrigger = (props: ArkToastActionTriggerProps) => (
  <ArkToast.ActionTrigger
    {...props}
    data-scope="toast"
    data-part="action-trigger"
  />
);

export const LoongArkToastCloseTrigger = (props: ArkToastCloseTriggerProps) => (
  <ArkToast.CloseTrigger
    {...props}
    data-scope="toast"
    data-part="close-trigger"
  />
);

export { createToaster };
export type {
  CreateToasterProps,
  CreateToasterReturn,
  ToastOptions,
  ToastPlacement,
  ToastType,
  ToastStatus,
};
