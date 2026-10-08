import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "./icon";
import { renderPart } from "../render-part";
import { LoongArkPortal } from "./portal";
import { defineComponent, h } from "vue";
import type { PropType } from "vue";
import { Dialog as ArkDialog } from "@ark-ui/vue/dialog";
import { ark } from "@ark-ui/vue";
import type { DialogPrimitiveProps } from "@loongark/primitives";

export type DialogSize = NonNullable<DialogPrimitiveProps["size"]>;
export type DialogPlacement = NonNullable<DialogPrimitiveProps["placement"]>;
export type DialogMotion = NonNullable<DialogPrimitiveProps["motion"]>;

const boolAttr = (value: boolean) => (value ? "true" : undefined);

export const LoongArkDialogOverlay = defineComponent({
  name: "LoongArkDialogOverlay",
  props: {
    blur: {
      type: {} as PropType<boolean>,
      default: true,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkDialog.Backdrop,
        {
          ...attrs,
          "data-scope": "dialog",
          "data-part": "backdrop",
          "data-blur": boolAttr(props.blur),
        },
        slots.default ? slots.default() : undefined,
      );
  },
});

const sizeProp = {
  type: {} as PropType<DialogSize>,
  default: "md" as DialogSize,
};

const placementProp = {
  type: {} as PropType<DialogPlacement>,
  default: "center" as DialogPlacement,
};

const motionProp = {
  type: {} as PropType<DialogMotion>,
  default: "scale" as DialogMotion,
};

export const LoongArkDialogContent = defineComponent({
  name: "LoongArkDialogContent",
  props: {
    size: sizeProp,
    placement: placementProp,
    motion: motionProp,
    overlayBlur: {
      type: {} as PropType<boolean>,
      default: true,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkDialog.Content,
        {
          ...attrs,
          "data-scope": "dialog",
          "data-part": "content",
          "data-size": props.size,
          "data-motion": props.motion,
          "data-placement": props.placement,
          "data-overlay-blur": boolAttr(props.overlayBlur),
        },
        slots.default ? slots.default() : undefined,
      );
  },
});

export const LoongArkDialogTitle = defineComponent({
  name: "LoongArkDialogTitle",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkDialog.Title,
        {
          ...attrs,
          "data-scope": "dialog",
          "data-part": "title",
        },
        slots.default ? slots.default() : undefined,
      );
  },
});

export const LoongArkDialogDescription = defineComponent({
  name: "LoongArkDialogDescription",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkDialog.Description,
        {
          ...attrs,
          "data-scope": "dialog",
          "data-part": "description",
        },
        slots.default ? slots.default() : undefined,
      );
  },
});

export const LoongArkDialogFooter = defineComponent({
  name: "LoongArkDialogFooter",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ark.footer,
        {
          ...attrs,
          "data-scope": "dialog",
          "data-part": "footer",
        },
        slots.default ? slots.default() : undefined,
      );
  },
});

export const LoongArkDialogCloseTrigger = defineComponent({
  name: "LoongArkDialogCloseTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkDialog.CloseTrigger,
        {
          ...attrs,
          "aria-label": attrs["aria-label"] ?? "Close dialog",
          "data-scope": "dialog",
          "data-part": "close-trigger",
        },
        slots.default
          ? slots.default()
          : [h(LoongArkIcon, { icon: controlIcons.close })],
      );
  },
});

export const LoongArkDialog: {
  Root: typeof ArkDialog.Root;
  Trigger: typeof ArkDialog.Trigger;
  Positioner: typeof ArkDialog.Positioner;
  Portal: typeof LoongArkPortal;
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
  Portal: LoongArkPortal,
  Overlay: LoongArkDialogOverlay,
  Content: LoongArkDialogContent,
  Title: LoongArkDialogTitle,
  Description: LoongArkDialogDescription,
  Footer: LoongArkDialogFooter,
  CloseTrigger: LoongArkDialogCloseTrigger,
};

export const LoongArkDialogRoot: typeof ArkDialog.Root = ArkDialog.Root;
export const LoongArkDialogTrigger: typeof ArkDialog.Trigger =
  ArkDialog.Trigger;

export const LoongArkDialogPositioner: typeof ArkDialog.Positioner =
  ArkDialog.Positioner;
export const LoongArkDialogPortal = LoongArkPortal;
