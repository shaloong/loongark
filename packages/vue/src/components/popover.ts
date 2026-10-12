
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticPopoverStyles } from "@loongark/primitives/automatic-styles/popover";
import { renderPart } from "../render-part";
/**
 * Popover 组件 - Vue 封装
 * 基于 Ark UI Popover，注入 data-scope/data-part，并默认使用 asChild 避免嵌套
 */
import { h, defineComponent } from "vue";
import { Popover as ArkPopover } from "@ark-ui/vue/popover";

export const LoongArkPopoverRoot = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkPopoverRoot",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkPopover.Root,
        {
          ...attrs,
          "data-scope": "popover",
          "data-part": "root",
        },
        slots,
      );
  },
}), lkAutomaticPopoverStyles);

export const LoongArkPopoverTrigger = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkPopoverTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkPopover.Trigger,
        {
          ...attrs,
          asChild: attrs.asChild ?? true,
          "data-scope": "popover",
          "data-part": "trigger",
        },
        slots,
      );
  },
}), lkAutomaticPopoverStyles);

export const LoongArkPopoverPositioner = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkPopoverPositioner",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkPopover.Positioner,
        {
          ...attrs,
          "data-scope": "popover",
          "data-part": "positioner",
        },
        slots,
      );
  },
}), lkAutomaticPopoverStyles);

export const LoongArkPopoverContent = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkPopoverContent",
  props: {
    showArrow: { type: Boolean, default: false },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkPopover.Content,
        {
          ...attrs,
          "data-scope": "popover",
          "data-part": "content",
          "data-arrow": props.showArrow ? "true" : undefined,
        },
        slots,
      );
  },
}), lkAutomaticPopoverStyles);

export const LoongArkPopoverArrow = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkPopoverArrow",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkPopover.Arrow,
        {
          ...attrs,
          "data-scope": "popover",
          "data-part": "arrow",
        },
        slots,
      );
  },
}), lkAutomaticPopoverStyles);

export const LoongArkPopoverTitle = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkPopoverTitle",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkPopover.Title,
        {
          ...attrs,
          "data-scope": "popover",
          "data-part": "title",
        },
        slots,
      );
  },
}), lkAutomaticPopoverStyles);

export const LoongArkPopoverDescription = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkPopoverDescription",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkPopover.Description,
        {
          ...attrs,
          "data-scope": "popover",
          "data-part": "description",
        },
        slots,
      );
  },
}), lkAutomaticPopoverStyles);

export const LoongArkPopoverCloseTrigger = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkPopoverCloseTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkPopover.CloseTrigger,
        {
          ...attrs,
          "data-scope": "popover",
          "data-part": "close-trigger",
        },
        slots,
      );
  },
}), lkAutomaticPopoverStyles);
