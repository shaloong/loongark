import { Dialog as ArkDialog } from "@ark-ui/solid/dialog";
import { ark } from "@ark-ui/solid";
import type { DialogPrimitiveProps } from "@loongark/primitives";
import type { Component } from "solid-js";
import { mergeProps } from "solid-js";
import { boolAttr } from "../utils";

export type DialogSize = NonNullable<DialogPrimitiveProps["size"]>;
export type DialogPlacement = NonNullable<DialogPrimitiveProps["placement"]>;
export type DialogMotion = NonNullable<DialogPrimitiveProps["motion"]>;

export interface LoongArkDialogOverlayProps {
  blur?: boolean;
  children?: unknown;
  [key: string]: unknown;
}

export const LoongArkDialogOverlay: Component<LoongArkDialogOverlayProps> = (
  props
) => {
  const { blur = true, children, ...rest } = props;
  return ArkDialog.Backdrop({
    ...rest,
    children,
    "data-lk-dialog-overlay": "",
    "data-blur": boolAttr(blur),
  });
};

interface DialogContentProps extends Partial<DialogPrimitiveProps> {
  overlayBlur?: boolean;
  children?: unknown;
  [key: string]: unknown;
}

const dialogContentDefaults: Required<
  Pick<DialogContentProps, "size" | "motion" | "placement" | "overlayBlur">
> = {
  size: "md",
  motion: "scale",
  placement: "center",
  overlayBlur: true,
};

export const LoongArkDialogContent: Component<DialogContentProps> = (props) => {
  const { children, size, motion, placement, overlayBlur, ...rest } =
    mergeProps(dialogContentDefaults, props);

  return ArkDialog.Content({
    ...rest,
    children,
    "data-lk-dialog-content": "",
    "data-size": size,
    "data-motion": motion,
    "data-placement": placement,
    "data-overlay-blur": boolAttr(overlayBlur),
  });
};

interface DialogTextProps {
  children?: unknown;
  [key: string]: unknown;
}

export const LoongArkDialogTitle: Component<DialogTextProps> = (props) => {
  const { children, ...rest } = props;
  return ArkDialog.Title({
    ...rest,
    children,
    "data-lk-dialog-title": "",
  });
};

export const LoongArkDialogDescription: Component<DialogTextProps> = (
  props
) => {
  const { children, ...rest } = props;
  return ArkDialog.Description({
    ...rest,
    children,
    "data-lk-dialog-description": "",
  });
};

export const LoongArkDialogFooter: Component<DialogTextProps> = (props) => {
  const { children, ...rest } = props;
  return ark.footer({
    ...rest,
    children,
    "data-lk-dialog-footer": "",
  });
};

export const LoongArkDialogCloseTrigger: Component<DialogTextProps> = (
  props
) => {
  const { children, ...rest } = props;
  return ArkDialog.CloseTrigger({
    ...rest,
    children,
    "data-lk-dialog-close": "",
  });
};

export const LoongArkDialog = {
  Root: ArkDialog.Root,
  Trigger: ArkDialog.Trigger,
  Positioner: ArkDialog.Positioner,
  Overlay: LoongArkDialogOverlay,
  Content: LoongArkDialogContent,
  Title: LoongArkDialogTitle,
  Description: LoongArkDialogDescription,
  Footer: LoongArkDialogFooter,
  CloseTrigger: LoongArkDialogCloseTrigger,
};
