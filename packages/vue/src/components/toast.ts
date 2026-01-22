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

export const LoongArkToaster = defineComponent({
  name: "LoongArkToaster",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkToaster,
        {
          ...attrs,
          "data-scope": "toast",
          "data-part": "group",
        },
        slots
      );
  },
});

export const LoongArkToastRoot = defineComponent({
  name: "LoongArkToastRoot",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkToast.Root,
        {
          ...attrs,
          "data-scope": "toast",
          "data-part": "root",
        },
        slots
      );
  },
});

export const LoongArkToastTitle = defineComponent({
  name: "LoongArkToastTitle",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkToast.Title,
        {
          ...attrs,
          "data-scope": "toast",
          "data-part": "title",
        },
        slots
      );
  },
});

export const LoongArkToastDescription = defineComponent({
  name: "LoongArkToastDescription",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkToast.Description,
        {
          ...attrs,
          "data-scope": "toast",
          "data-part": "description",
        },
        slots
      );
  },
});

export const LoongArkToastActionTrigger = defineComponent({
  name: "LoongArkToastActionTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkToast.ActionTrigger,
        {
          ...attrs,
          "data-scope": "toast",
          "data-part": "action-trigger",
        },
        slots
      );
  },
});

export const LoongArkToastCloseTrigger = defineComponent({
  name: "LoongArkToastCloseTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkToast.CloseTrigger,
        {
          ...attrs,
          "data-scope": "toast",
          "data-part": "close-trigger",
        },
        slots
      );
  },
});

export { createToaster };
