import { Dialog as ArkDialog } from "@ark-ui/react/dialog";
import { Portal as ArkPortal } from "@ark-ui/react/portal";
import { ark } from "@ark-ui/react";
import type { DialogPrimitiveProps } from "@loongark/primitives";
import { createElement, forwardRef } from "react";
import type { ReactNode } from "react";

export type DialogSize = NonNullable<DialogPrimitiveProps["size"]>;
export type DialogPlacement = NonNullable<DialogPrimitiveProps["placement"]>;
export type DialogMotion = NonNullable<DialogPrimitiveProps["motion"]>;

export interface LoongArkDialogOverlayProps {
  blur?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}

export const LoongArkDialogOverlay = forwardRef<
  HTMLDivElement,
  LoongArkDialogOverlayProps
>(({ blur = true, children, ...rest }, ref) =>
  createElement(
    ArkDialog.Backdrop,
    {
      ...rest,
      ref,
      "data-scope": "dialog",
      "data-part": "backdrop",
      "data-blur": blur ? "true" : undefined,
    },
    children
  )
);

LoongArkDialogOverlay.displayName = "LoongArkDialogOverlay";

export interface LoongArkDialogContentProps
  extends Partial<DialogPrimitiveProps> {
  children?: ReactNode;
  [key: string]: unknown;
}

export const LoongArkDialogContent = forwardRef<
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
    ref
  ) =>
    createElement(
      ArkDialog.Content,
      {
        ...rest,
        ref,
        "data-scope": "dialog",
        "data-part": "content",
        "data-size": size,
        "data-motion": motion,
        "data-placement": placement,
        "data-overlay-blur": overlayBlur ? "true" : undefined,
      },
      children
    )
);

LoongArkDialogContent.displayName = "LoongArkDialogContent";

export const LoongArkDialogTitle = ({
  children,
  ...rest
}: {
  children?: ReactNode;
  [key: string]: unknown;
}) =>
  createElement(
    ArkDialog.Title,
    {
      ...rest,
      "data-scope": "dialog",
      "data-part": "title",
    },
    children
  );

export const LoongArkDialogDescription = ({
  children,
  ...rest
}: {
  children?: ReactNode;
  [key: string]: unknown;
}) =>
  createElement(
    ArkDialog.Description,
    {
      ...rest,
      "data-scope": "dialog",
      "data-part": "description",
    },
    children
  );

export const LoongArkDialogFooter = ({
  children,
  ...rest
}: {
  children?: ReactNode;
  [key: string]: unknown;
}) =>
  createElement(
    ark.footer,
    {
      ...rest,
      "data-scope": "dialog",
      "data-part": "footer",
    },
    children
  );

export interface LoongArkDialogCloseTriggerProps
  extends Record<string, unknown> {
  children?: ReactNode;
  asChild?: boolean;
}

const defaultCloseIcon = createElement(
  "svg",
  {
    width: 14,
    height: 14,
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
  },
  createElement("path", {
    d: "M4 4l6 6m0-6-6 6",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  })
);

export const LoongArkDialogCloseTrigger = ({
  children,
  asChild,
  ...rest
}: LoongArkDialogCloseTriggerProps) => {
  const decorate = !asChild;
  return createElement(
    ArkDialog.CloseTrigger,
    {
      ...rest,
      ...(asChild ? { asChild } : {}),
      ...(decorate
        ? { "data-scope": "dialog", "data-part": "close-trigger" }
        : {}),
    },
    decorate ? children ?? defaultCloseIcon : children ?? null
  );
};

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
} = {
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
};
