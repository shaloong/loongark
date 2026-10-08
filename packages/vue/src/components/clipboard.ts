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

export const LoongArkClipboardRoot = defineComponent({
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
});

export const LoongArkClipboardLabel = defineComponent({
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
});

export const LoongArkClipboardControl = defineComponent({
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
});

export const LoongArkClipboardInput = defineComponent({
  name: "LoongArkClipboardInput",
  setup(_, { attrs }) {
    return () =>
      renderPart(resolveDynamicComponent(ArkClipboard.Input), {
        ...attrs,
        "data-scope": "clipboard",
        "data-part": "input",
      });
  },
});

export const LoongArkClipboardTrigger = defineComponent({
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
});

export const LoongArkClipboardIndicator = defineComponent({
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
});

export const LoongArkClipboardValueText = defineComponent({
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
});
