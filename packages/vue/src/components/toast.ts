
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticToastStyles } from "@loongark/primitives/automatic-styles/toast";
import { renderPart } from "../render-part";
/**
 * Toast component - Vue wrapper
 * Based on Ark UI Toast, injects data-scope/data-part.
 */
import { h, defineComponent } from "vue";
import {
  Toast as ArkToast,
  Toaster as ArkToaster,
  createToaster,
} from "@ark-ui/vue/toast";

export const LoongArkToaster = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkToaster",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkToaster,
        {
          ...attrs,
          "data-scope": "toast",
          "data-part": "group",
        },
        slots,
      );
  },
}), lkAutomaticToastStyles);

export const LoongArkToastRoot = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkToastRoot",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkToast.Root,
        {
          ...attrs,
          "data-scope": "toast",
          "data-part": "root",
        },
        slots,
      );
  },
}), lkAutomaticToastStyles);

export const LoongArkToastTitle = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkToastTitle",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkToast.Title,
        {
          ...attrs,
          "data-scope": "toast",
          "data-part": "title",
        },
        slots,
      );
  },
}), lkAutomaticToastStyles);

export const LoongArkToastDescription = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkToastDescription",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkToast.Description,
        {
          ...attrs,
          "data-scope": "toast",
          "data-part": "description",
        },
        slots,
      );
  },
}), lkAutomaticToastStyles);

export const LoongArkToastActionTrigger = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkToastActionTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkToast.ActionTrigger,
        {
          ...attrs,
          "data-scope": "toast",
          "data-part": "action-trigger",
        },
        slots,
      );
  },
}), lkAutomaticToastStyles);

export const LoongArkToastCloseTrigger = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkToastCloseTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkToast.CloseTrigger,
        {
          ...attrs,
          "data-scope": "toast",
          "data-part": "close-trigger",
        },
        slots,
      );
  },
}), lkAutomaticToastStyles);

export { createToaster };
