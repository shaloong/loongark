"use client";
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticDialogStyles } from "@loongark/primitives/automatic-styles/dialog";


import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "./icon";
import type {
  HTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ButtonHTMLAttributes,
} from "react";
import { dataProps } from "../data-props";
import { Dialog as ArkDialog } from "@ark-ui/react/dialog";
import { Portal as ArkPortal } from "./portal";
import { ark } from "@ark-ui/react";
import type { DialogPrimitiveProps } from "@loongark/primitives";
import { createElement, forwardRef } from "react";
import type { ReactNode } from "react";

export type DialogSize = NonNullable<DialogPrimitiveProps["size"]>;
export type DialogPlacement = NonNullable<DialogPrimitiveProps["placement"]>;
export type DialogMotion = NonNullable<DialogPrimitiveProps["motion"]>;

export interface LoongArkDialogOverlayProps extends HTMLAttributes<HTMLElement> {
  blur?: boolean;
  children?: ReactNode;
}

export const LoongArkDialogOverlay = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  LoongArkDialogOverlayProps
>(({ blur = true, children, ...rest }, ref) =>
  createElement(
    ArkDialog.Backdrop,
    dataProps({
      ...rest,
      ref,
      "data-scope": "dialog",
      "data-part": "backdrop",
      "data-blur": blur ? "true" : undefined,
    }),
    children,
  ),
), lkAutomaticDialogStyles);

LoongArkDialogOverlay.displayName = "LoongArkDialogOverlay";

export interface LoongArkDialogContentProps
  extends Partial<DialogPrimitiveProps>, HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

export const LoongArkDialogContent = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  LoongArkDialogContentProps
>(
  (
    {
      children,
      size = "md",
      motion = "scale",
      placement = "center",
      overlayBlur = true,
      ...rest
    },
    ref,
  ) =>
    createElement(
      ArkDialog.Content,
      dataProps({
        ...rest,
        ref,
        "data-scope": "dialog",
        "data-part": "content",
        "data-size": size,
        "data-motion": motion,
        "data-placement": placement,
        "data-overlay-blur": overlayBlur ? "true" : undefined,
      }),
      children,
    ),
), lkAutomaticDialogStyles);

LoongArkDialogContent.displayName = "LoongArkDialogContent";

export const LoongArkDialogTitle = /*#__PURE__*/ withAutomaticStyles(({
  children,
  ...rest
}: {
  children?: ReactNode;
}) =>
  createElement(
    ArkDialog.Title,
    dataProps({
      ...rest,
      "data-scope": "dialog",
      "data-part": "title",
    }),
    children,
  ), lkAutomaticDialogStyles);

export const LoongArkDialogDescription = /*#__PURE__*/ withAutomaticStyles(({
  children,
  ...rest
}: {
  children?: ReactNode;
}) =>
  createElement(
    ArkDialog.Description,
    dataProps({
      ...rest,
      "data-scope": "dialog",
      "data-part": "description",
    }),
    children,
  ), lkAutomaticDialogStyles);

export const LoongArkDialogFooter = /*#__PURE__*/ withAutomaticStyles(({
  children,
  ...rest
}: {
  children?: ReactNode;
}) =>
  createElement(
    ark.footer,
    dataProps({
      ...rest,
      "data-scope": "dialog",
      "data-part": "footer",
    }),
    children,
  ), lkAutomaticDialogStyles);

export interface LoongArkDialogCloseTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  asChild?: boolean;
}

export const LoongArkDialogCloseTrigger = /*#__PURE__*/ withAutomaticStyles(({
  children,
  asChild,
  ...rest
}: LoongArkDialogCloseTriggerProps) => {
  const decorate = !asChild;
  return createElement(
    ArkDialog.CloseTrigger,
    dataProps({
      ...rest,
      ...(asChild ? { asChild } : {}),
      ...(decorate
        ? {
            "aria-label": rest["aria-label"] ?? "Close dialog",
            "data-scope": "dialog",
            "data-part": "close-trigger",
          }
        : {}),
    }),
    children ??
      (decorate
        ? createElement(LoongArkIcon, { icon: controlIcons.close })
        : null),
  );
}, lkAutomaticDialogStyles);

export const LoongArkDialog: {
  Root: typeof ArkDialog.Root;
  Trigger: typeof ArkDialog.Trigger;
  Positioner: typeof ArkDialog.Positioner;
  Portal: typeof ArkPortal;
  Overlay: typeof LoongArkDialogOverlay;
  Content: typeof LoongArkDialogContent;
  Title: typeof LoongArkDialogTitle;
  Description: typeof LoongArkDialogDescription;
  Footer: typeof LoongArkDialogFooter;
  CloseTrigger: typeof LoongArkDialogCloseTrigger;
} = /*#__PURE__*/ withAutomaticStyles({
  Root: ArkDialog.Root,
  Trigger: ArkDialog.Trigger,
  Positioner: ArkDialog.Positioner,

  Portal: ArkPortal,
  Overlay: LoongArkDialogOverlay,
  Content: LoongArkDialogContent,
  Title: LoongArkDialogTitle,
  Description: LoongArkDialogDescription,
  Footer: LoongArkDialogFooter,
  CloseTrigger: LoongArkDialogCloseTrigger,
}, lkAutomaticDialogStyles);

export const LoongArkDialogRoot = /*#__PURE__*/ withAutomaticStyles(ArkDialog.Root, lkAutomaticDialogStyles);
export const LoongArkDialogTrigger = /*#__PURE__*/ withAutomaticStyles(ArkDialog.Trigger, lkAutomaticDialogStyles);

export const LoongArkDialogPositioner = /*#__PURE__*/ withAutomaticStyles(ArkDialog.Positioner, lkAutomaticDialogStyles);
export const LoongArkDialogPortal = /*#__PURE__*/ withAutomaticStyles(ArkPortal, lkAutomaticDialogStyles);
