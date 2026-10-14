
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticToastStyles } from "@shaloong/loongark-primitives/automatic-styles/toast";
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

export const LoongArkToaster = /*#__PURE__*/ withAutomaticStyles((props: ArkToasterProps) => (
  <ArkToaster {...props} data-scope="toast" data-part="group" />
), lkAutomaticToastStyles);

export const LoongArkToastRoot = /*#__PURE__*/ withAutomaticStyles((props: ArkToastRootProps) => (
  <ArkToast.Root {...props} data-scope="toast" data-part="root" />
), lkAutomaticToastStyles);

export const LoongArkToastTitle = /*#__PURE__*/ withAutomaticStyles((props: ArkToastTitleProps) => (
  <ArkToast.Title {...props} data-scope="toast" data-part="title" />
), lkAutomaticToastStyles);

export const LoongArkToastDescription = /*#__PURE__*/ withAutomaticStyles((props: ArkToastDescriptionProps) => (
  <ArkToast.Description
    {...props}
    data-scope="toast"
    data-part="description"
  />
), lkAutomaticToastStyles);

export const LoongArkToastActionTrigger = /*#__PURE__*/ withAutomaticStyles((props: ArkToastActionTriggerProps) => (
  <ArkToast.ActionTrigger
    {...props}
    data-scope="toast"
    data-part="action-trigger"
  />
), lkAutomaticToastStyles);

export const LoongArkToastCloseTrigger = /*#__PURE__*/ withAutomaticStyles((props: ArkToastCloseTriggerProps) => (
  <ArkToast.CloseTrigger
    {...props}
    data-scope="toast"
    data-part="close-trigger"
  />
), lkAutomaticToastStyles);

export { createToaster };
export type {
  CreateToasterProps,
  CreateToasterReturn,
  ToastOptions,
  ToastPlacement,
  ToastType,
  ToastStatus,
};
