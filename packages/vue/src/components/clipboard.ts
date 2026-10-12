
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticClipboardStyles } from "@loongark/primitives/automatic-styles/clipboard";
import { renderPart } from "../render-part";
/**
 * Clipboard component - Vue wrapper.
 * Uses Ark UI Clipboard with data attributes for styling.
 */
import {
  resolveDynamicComponent,
  defineComponent,
  h,
  type PropType,
} from "vue";
import { Clipboard as ArkClipboard } from "@ark-ui/vue/clipboard";
import type { ClipboardSize } from "@loongark/primitives";

export const LoongArkClipboardRoot = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkClipboardRoot",
  props: {
    size: {
      type: String as PropType<ClipboardSize>,
      default: "md",
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkClipboard.Root,
        {
          ...attrs,
          ...props,
          "data-scope": "clipboard",
          "data-part": "root",
          "data-size": props.size,
          "data-disabled": props.disabled ? "true" : undefined,
        },
        slots,
      );
  },
}), lkAutomaticClipboardStyles);

export const LoongArkClipboardLabel = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkClipboardLabel",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkClipboard.Label,
        {
          ...attrs,
          "data-scope": "clipboard",
          "data-part": "label",
        },
        slots,
      );
  },
}), lkAutomaticClipboardStyles);

export const LoongArkClipboardControl = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkClipboardControl",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkClipboard.Control,
        {
          ...attrs,
          "data-scope": "clipboard",
          "data-part": "control",
        },
        slots,
      );
  },
}), lkAutomaticClipboardStyles);

export const LoongArkClipboardInput = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkClipboardInput",
  setup(_, { attrs }) {
    return () =>
      renderPart(resolveDynamicComponent(ArkClipboard.Input), {
        ...attrs,
        "data-scope": "clipboard",
        "data-part": "input",
      });
  },
}), lkAutomaticClipboardStyles);

export const LoongArkClipboardTrigger = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkClipboardTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkClipboard.Trigger,
        {
          ...attrs,
          "data-scope": "clipboard",
          "data-part": "trigger",
        },
        slots,
      );
  },
}), lkAutomaticClipboardStyles);

export const LoongArkClipboardIndicator = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkClipboardIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkClipboard.Indicator,
        {
          ...attrs,
          "data-scope": "clipboard",
          "data-part": "indicator",
        },
        slots,
      );
  },
}), lkAutomaticClipboardStyles);

export const LoongArkClipboardValueText = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkClipboardValueText",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkClipboard.ValueText,
        {
          ...attrs,
          "data-scope": "clipboard",
          "data-part": "value-text",
        },
        slots,
      );
  },
}), lkAutomaticClipboardStyles);
