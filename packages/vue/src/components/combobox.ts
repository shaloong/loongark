
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticComboboxStyles } from "@loongark/primitives/automatic-styles/combobox";
import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "./icon";
import type { CollectionItem } from "@ark-ui/vue/collection";
import type { ComboboxRootProps as NativeComboboxRootProps } from "@ark-ui/vue/combobox";
import type { ComboboxItemProps as NativeComboboxItemProps } from "@ark-ui/vue/combobox";
import { renderPart } from "../render-part";
/**
 * Combobox component - Vue wrapper.
 * Based on Ark UI Combobox with data attributes for styling.
 */
import {
  resolveDynamicComponent,
  defineComponent,
  h,
  provide,
  inject,
  toRef,
  type PropType,
} from "vue";
import {
  ComboboxRoot as ArkComboboxRoot,
  ComboboxLabel as ArkComboboxLabel,
  ComboboxControl as ArkComboboxControl,
  ComboboxInput as ArkComboboxInput,
  ComboboxTrigger as ArkComboboxTrigger,
  ComboboxClearTrigger as ArkComboboxClearTrigger,
  ComboboxPositioner as ArkComboboxPositioner,
  ComboboxContent as ArkComboboxContent,
  ComboboxList as ArkComboboxList,
  ComboboxItemGroup as ArkComboboxItemGroup,
  ComboboxItemGroupLabel as ArkComboboxItemGroupLabel,
  ComboboxItem as ArkComboboxItem,
  ComboboxItemText as ArkComboboxItemText,
  ComboboxItemIndicator as ArkComboboxItemIndicator,
} from "@ark-ui/vue/combobox";
import type { ComboboxSize } from "@loongark/primitives";

const comboboxSizeKey = Symbol("loongark-combobox-size");

export const LoongArkComboboxRoot = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkComboboxRoot",
  props: {
    size: {
      type: String as PropType<ComboboxSize>,
      default: "md",
    },
    collection: {
      type: Object as PropType<
        NativeComboboxRootProps<CollectionItem>["collection"]
      >,
    },
    closeOnSelect: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    composite: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    defaultHighlightedValue: {
      type: String as PropType<string>,
    },
    defaultOpen: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    defaultValue: {
      type: Array as PropType<string[]>,
    },
    defaultInputValue: {
      type: String as PropType<string>,
    },
    deselectable: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    form: {
      type: String as PropType<string>,
    },
    highlightedValue: {
      type: String as PropType<string>,
    },
    id: {
      type: String as PropType<string>,
    },
    ids: {
      type: Object as PropType<NativeComboboxRootProps<CollectionItem>["ids"]>,
    },
    immediate: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    inputValue: {
      type: String as PropType<string>,
    },
    invalid: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    lazyMount: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    loopFocus: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    multiple: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    name: {
      type: String as PropType<string>,
    },
    onInputValueChange: {
      type: Function as PropType<(details: { inputValue: string }) => void>,
    },
    onValueChange: {
      type: Function as PropType<(details: { value: string[] }) => void>,
    },
    open: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    positioning: {
      type: Object as PropType<
        NativeComboboxRootProps<CollectionItem>["positioning"]
      >,
    },
    present: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    readOnly: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    required: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    skipAnimationOnMount: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    unmountOnExit: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    value: {
      type: Array as PropType<string[]>,
    },
  },
  setup(props, { slots, attrs }) {
    provide(comboboxSizeKey, toRef(props, "size"));
    return () =>
      renderPart(
        ArkComboboxRoot,
        {
          ...attrs,
          ...props,
          "data-scope": "combobox",
          "data-part": "root",
          "data-size": props.size,
        },
        slots,
      );
  },
}), lkAutomaticComboboxStyles);

export const LoongArkComboboxLabel = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkComboboxLabel",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkComboboxLabel,
        {
          ...attrs,
          "data-scope": "combobox",
          "data-part": "label",
        },
        slots,
      );
  },
}), lkAutomaticComboboxStyles);

export const LoongArkComboboxControl = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkComboboxControl",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkComboboxControl,
        {
          ...attrs,
          "data-scope": "combobox",
          "data-part": "control",
        },
        slots,
      );
  },
}), lkAutomaticComboboxStyles);

export const LoongArkComboboxInput = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkComboboxInput",
  setup(_, { attrs }) {
    return () =>
      renderPart(resolveDynamicComponent(ArkComboboxInput), {
        ...attrs,
        "data-scope": "combobox",
        "data-part": "input",
      });
  },
}), lkAutomaticComboboxStyles);

export const LoongArkComboboxTrigger = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkComboboxTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkComboboxTrigger,
        {
          ...attrs,
          "data-scope": "combobox",
          "data-part": "trigger",
        },
        {
          default:
            slots.default ??
            (() => [
              h(LoongArkIcon, { icon: controlIcons.chevronDown, size: "sm" }),
            ]),
        },
      );
  },
}), lkAutomaticComboboxStyles);

export const LoongArkComboboxClearTrigger = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkComboboxClearTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkComboboxClearTrigger,
        {
          ...attrs,
          "data-scope": "combobox",
          "data-part": "clear-trigger",
        },
        slots,
      );
  },
}), lkAutomaticComboboxStyles);

export const LoongArkComboboxPositioner = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkComboboxPositioner",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkComboboxPositioner,
        {
          ...attrs,
          "data-scope": "combobox",
          "data-part": "positioner",
        },
        slots,
      );
  },
}), lkAutomaticComboboxStyles);

export const LoongArkComboboxContent = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkComboboxContent",
  setup(_, { slots, attrs }) {
    const size = inject(comboboxSizeKey, { value: "md" as ComboboxSize });
    return () =>
      renderPart(
        ArkComboboxContent,
        {
          ...attrs,
          "data-scope": "combobox",
          "data-part": "content",
          "data-size": size.value,
        },
        slots,
      );
  },
}), lkAutomaticComboboxStyles);

export const LoongArkComboboxList = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkComboboxList",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkComboboxList,
        {
          ...attrs,
          "data-scope": "combobox",
          "data-part": "list",
        },
        slots,
      );
  },
}), lkAutomaticComboboxStyles);

export const LoongArkComboboxItemGroup = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkComboboxItemGroup",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkComboboxItemGroup,
        {
          ...attrs,
          "data-scope": "combobox",
          "data-part": "item-group",
        },
        slots,
      );
  },
}), lkAutomaticComboboxStyles);

export const LoongArkComboboxItemGroupLabel = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkComboboxItemGroupLabel",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkComboboxItemGroupLabel,
        {
          ...attrs,
          "data-scope": "combobox",
          "data-part": "item-group-label",
        },
        slots,
      );
  },
}), lkAutomaticComboboxStyles);

export const LoongArkComboboxItem = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkComboboxItem",
  props: {
    item: {
      type: Object as PropType<NativeComboboxItemProps["item"]>,
    },
    persistFocus: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkComboboxItem,
        {
          ...attrs,
          item: props.item,
          persistFocus: props.persistFocus,
          disabled: props.disabled,
          "data-scope": "combobox",
          "data-part": "item",
        },
        slots,
      );
  },
}), lkAutomaticComboboxStyles);

export const LoongArkComboboxItemText = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkComboboxItemText",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkComboboxItemText,
        {
          ...attrs,
          "data-scope": "combobox",
          "data-part": "item-text",
        },
        slots,
      );
  },
}), lkAutomaticComboboxStyles);

export const LoongArkComboboxItemIndicator = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkComboboxItemIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkComboboxItemIndicator,
        {
          ...attrs,
          "data-scope": "combobox",
          "data-part": "item-indicator",
        },
        {
          default:
            slots.default ??
            (() => [h(LoongArkIcon, { icon: controlIcons.check, size: "sm" })]),
        },
      );
  },
}), lkAutomaticComboboxStyles);
