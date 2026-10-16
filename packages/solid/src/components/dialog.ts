
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticDialogStyles } from "@shaloong/loongark-primitives/automatic-styles/dialog";
import { createComponent } from "solid-js";
import { controlIcons } from "@shaloong/loongark-kit";
import { LoongArkIcon } from "./icon";
import { dataProps } from "../data-props";
import type { JSX } from "solid-js";
import { LoongArkPortal } from "./portal";
import { Dialog as ArkDialog, type DialogCloseTriggerProps } from "@ark-ui/solid/dialog";
import { ark } from "@ark-ui/solid";
import type { DialogPrimitiveProps } from "@shaloong/loongark-primitives";
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

export const LoongArkDialogOverlay: Component<LoongArkDialogOverlayProps> = /*#__PURE__*/ withAutomaticStyles((
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
}, lkAutomaticDialogStyles);

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

export const LoongArkDialogContent: Component<DialogContentProps> = /*#__PURE__*/ withAutomaticStyles((props) => {
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
}, lkAutomaticDialogStyles);

interface DialogTextProps extends Omit<JSX.HTMLAttributes<HTMLElement>, "ref"> {
  children?: JSX.Element;
}

export const LoongArkDialogTitle: Component<DialogTextProps> = /*#__PURE__*/ withAutomaticStyles((props) => {
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
}, lkAutomaticDialogStyles);

export const LoongArkDialogDescription: Component<DialogTextProps> = /*#__PURE__*/ withAutomaticStyles((
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
}, lkAutomaticDialogStyles);

export const LoongArkDialogFooter: Component<DialogTextProps> = /*#__PURE__*/ withAutomaticStyles((props) => {
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
}, lkAutomaticDialogStyles);

export const LoongArkDialogCloseTrigger: Component<DialogCloseTriggerProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const [local, rest] = splitProps(props, ["children"]);
  return ArkDialog.CloseTrigger(
    dataProps(
      mergeProps(rest, {
        get children() {
          return (
            local.children ??
            createComponent(LoongArkIcon, { icon: controlIcons.close })
          );
        },
        "aria-label": rest["aria-label"] ?? "Close dialog",
        "data-scope": "dialog",
        "data-part": "close-trigger",
      }),
    ),
  );
}, lkAutomaticDialogStyles);

export const LoongArkDialog = /*#__PURE__*/ withAutomaticStyles({
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
}, lkAutomaticDialogStyles);

export const LoongArkDialogRoot = /*#__PURE__*/ withAutomaticStyles(ArkDialog.Root, lkAutomaticDialogStyles);
export const LoongArkDialogTrigger = /*#__PURE__*/ withAutomaticStyles(ArkDialog.Trigger, lkAutomaticDialogStyles);

export const LoongArkDialogPositioner = /*#__PURE__*/ withAutomaticStyles(ArkDialog.Positioner, lkAutomaticDialogStyles);
export const LoongArkDialogPortal = /*#__PURE__*/ withAutomaticStyles(LoongArkPortal, lkAutomaticDialogStyles);
