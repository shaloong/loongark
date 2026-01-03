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
      h(
        ArkDialog.Backdrop,
        {
          ...attrs,
          "data-lk-dialog-overlay": "",
          "data-blur": boolAttr(props.blur),
        },
        slots.default ? slots.default() : undefined
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
      h(
        ArkDialog.Content,
        {
          ...attrs,
          "data-lk-dialog-content": "",
          "data-size": props.size,
          "data-motion": props.motion,
          "data-placement": props.placement,
          "data-overlay-blur": boolAttr(props.overlayBlur),
        },
        slots.default ? slots.default() : undefined
      );
  },
});

export const LoongArkDialogTitle = defineComponent({
  name: "LoongArkDialogTitle",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkDialog.Title,
        {
          ...attrs,
          "data-lk-dialog-title": "",
        },
        slots.default ? slots.default() : undefined
      );
  },
});

export const LoongArkDialogDescription = defineComponent({
  name: "LoongArkDialogDescription",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkDialog.Description,
        {
          ...attrs,
          "data-lk-dialog-description": "",
        },
        slots.default ? slots.default() : undefined
      );
  },
});

export const LoongArkDialogFooter = defineComponent({
  name: "LoongArkDialogFooter",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ark.footer,
        {
          ...attrs,
          "data-lk-dialog-footer": "",
        },
        slots.default ? slots.default() : undefined
      );
  },
});

export const LoongArkDialogCloseTrigger = defineComponent({
  name: "LoongArkDialogCloseTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkDialog.CloseTrigger,
        {
          ...attrs,
          "data-lk-dialog-close": "",
        },
        slots.default ? slots.default() : undefined
      );
  },
});

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
