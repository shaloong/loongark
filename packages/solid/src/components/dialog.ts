import { dataProps } from "../data-props";
import type { JSX } from "solid-js";
import { LoongArkPortal } from "./portal";
import { Dialog as ArkDialog } from "@ark-ui/solid/dialog";
import { ark } from "@ark-ui/solid";
import type { DialogPrimitiveProps } from "@loongark/primitives";
import type { Component } from "solid-js";
import { mergeProps, splitProps } from "solid-js";
import { boolAttr } from "../utils";

export type DialogSize = NonNullable<DialogPrimitiveProps["size"]>;
export type DialogPlacement = NonNullable<DialogPrimitiveProps["placement"]>;
export type DialogMotion = NonNullable<DialogPrimitiveProps["motion"]>;

export interface LoongArkDialogOverlayProps extends Omit<
  JSX.HTMLAttributes<HTMLElement>,
  "ref"
> {
  blur?: boolean;
  children?: JSX.Element;
}

export const LoongArkDialogOverlay: Component<LoongArkDialogOverlayProps> = (
  props,
) => {
  const [local, rest] = splitProps(mergeProps({ blur: true }, props), [
    "blur",
    "children",
  ]);
  return ArkDialog.Backdrop(
    dataProps(
      mergeProps(rest, {
        get children() {
          return local.children;
        },
        "data-scope": "dialog",
        "data-part": "backdrop",
        get "data-blur"() {
          return boolAttr(local.blur);
        },
      }),
    ),
  );
};

interface DialogContentProps
  extends
    Partial<DialogPrimitiveProps>,
    Omit<JSX.HTMLAttributes<HTMLElement>, "ref"> {
  overlayBlur?: boolean;
  children?: JSX.Element;
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
  const [local, rest] = splitProps(mergeProps(dialogContentDefaults, props), [
    "children",
    "size",
    "motion",
    "placement",
    "overlayBlur",
  ]);

  return ArkDialog.Content(
    dataProps(
      mergeProps(rest, {
        get children() {
          return local.children;
        },
        "data-scope": "dialog",
        "data-part": "content",
        get "data-size"() {
          return local.size;
        },
        get "data-motion"() {
          return local.motion;
        },
        get "data-placement"() {
          return local.placement;
        },
        get "data-overlay-blur"() {
          return boolAttr(local.overlayBlur);
        },
      }),
    ),
  );
};

interface DialogTextProps extends Omit<JSX.HTMLAttributes<HTMLElement>, "ref"> {
  children?: JSX.Element;
}

export const LoongArkDialogTitle: Component<DialogTextProps> = (props) => {
  const [local, rest] = splitProps(props, ["children"]);
  return ArkDialog.Title(
    dataProps(
      mergeProps(rest, {
        get children() {
          return local.children;
        },
        "data-scope": "dialog",
        "data-part": "title",
      }),
    ),
  );
};

export const LoongArkDialogDescription: Component<DialogTextProps> = (
  props,
) => {
  const [local, rest] = splitProps(props, ["children"]);
  return ArkDialog.Description(
    dataProps(
      mergeProps(rest, {
        get children() {
          return local.children;
        },
        "data-scope": "dialog",
        "data-part": "description",
      }),
    ),
  );
};

export const LoongArkDialogFooter: Component<DialogTextProps> = (props) => {
  const [local, rest] = splitProps(props, ["children"]);
  return ark.footer(
    dataProps(
      mergeProps(rest, {
        get children() {
          return local.children;
        },
        "data-scope": "dialog",
        "data-part": "footer",
      }),
    ),
  );
};

export const LoongArkDialogCloseTrigger: Component<DialogTextProps> = (
  props,
) => {
  const [local, rest] = splitProps(props, ["children"]);
  return ArkDialog.CloseTrigger(
    dataProps(
      mergeProps(rest, {
        get children() {
          return local.children;
        },
        "aria-label": rest["aria-label"] ?? "Close dialog",
        "data-scope": "dialog",
        "data-part": "close-trigger",
      }),
    ),
  );
};

export const LoongArkDialog = {
  Root: ArkDialog.Root,
  Trigger: ArkDialog.Trigger,
  Positioner: ArkDialog.Positioner,
  Portal: LoongArkPortal,
  Overlay: LoongArkDialogOverlay,
  Content: LoongArkDialogContent,
  Title: LoongArkDialogTitle,
  Description: LoongArkDialogDescription,
  Footer: LoongArkDialogFooter,
  CloseTrigger: LoongArkDialogCloseTrigger,
};

export const LoongArkDialogRoot = ArkDialog.Root;
export const LoongArkDialogTrigger = ArkDialog.Trigger;

export const LoongArkDialogPositioner = ArkDialog.Positioner;
export const LoongArkDialogPortal = LoongArkPortal;
