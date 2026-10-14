
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticListboxStyles } from "@shaloong/loongark-primitives/automatic-styles/listbox";
import type { CollectionItem } from "@ark-ui/vue/collection";
import type { ListboxRootProps as NativeListboxRootProps } from "@ark-ui/vue/listbox";
import type { ListboxItemProps as NativeListboxItemProps } from "@ark-ui/vue/listbox";
import { renderPart } from "../render-part";
/**
 * Listbox component - Vue wrapper.
 * Uses Ark UI Listbox with data attributes for styling.
 */
import { defineComponent, h, type PropType } from "vue";
import { Listbox as ArkListbox } from "@ark-ui/vue/listbox";
import type { ListboxOrientation, ListboxSize } from "@shaloong/loongark-primitives";

export const LoongArkListboxRoot = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkListboxRoot",
  props: {
    size: {
      type: String as PropType<ListboxSize>,
      default: "md",
    },
    orientation: {
      type: String as PropType<ListboxOrientation>,
      default: "vertical",
    },
    collection: {
      type: Object as PropType<
        NativeListboxRootProps<CollectionItem>["collection"]
      >,
    },
    defaultValue: {
      type: Array as PropType<string[]>,
    },
    value: {
      type: Array as PropType<string[]>,
    },
    multiple: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    loopFocus: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    id: {
      type: String as PropType<string>,
    },
    onValueChange: {
      type: Function as PropType<(details: { value: string[] }) => void>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkListbox.Root,
        {
          ...attrs,
          ...props,
          "data-scope": "listbox",
          "data-part": "root",
          "data-size": props.size,
          "data-orientation": props.orientation,
        },
        slots,
      );
  },
}), lkAutomaticListboxStyles);

export const LoongArkListboxLabel = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkListboxLabel",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkListbox.Label,
        {
          ...attrs,
          "data-scope": "listbox",
          "data-part": "label",
        },
        slots,
      );
  },
}), lkAutomaticListboxStyles);

export const LoongArkListboxList = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkListboxList",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkListbox.Content,
        {
          ...attrs,
          "data-scope": "listbox",
          "data-part": "list",
        },
        slots,
      );
  },
}), lkAutomaticListboxStyles);

export const LoongArkListboxItemGroup = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkListboxItemGroup",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkListbox.ItemGroup,
        {
          ...attrs,
          "data-scope": "listbox",
          "data-part": "item-group",
        },
        slots,
      );
  },
}), lkAutomaticListboxStyles);

export const LoongArkListboxItemGroupLabel = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkListboxItemGroupLabel",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkListbox.ItemGroupLabel,
        {
          ...attrs,
          "data-scope": "listbox",
          "data-part": "item-group-label",
        },
        slots,
      );
  },
}), lkAutomaticListboxStyles);

export const LoongArkListboxItem = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkListboxItem",
  props: {
    item: {
      type: Object as PropType<NativeListboxItemProps["item"]>,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkListbox.Item,
        {
          ...attrs,
          ...props,
          "data-scope": "listbox",
          "data-part": "item",
        },
        slots,
      );
  },
}), lkAutomaticListboxStyles);

export const LoongArkListboxItemText = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkListboxItemText",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkListbox.ItemText,
        {
          ...attrs,
          "data-scope": "listbox",
          "data-part": "item-text",
        },
        slots,
      );
  },
}), lkAutomaticListboxStyles);

export const LoongArkListboxItemIndicator = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkListboxItemIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkListbox.ItemIndicator,
        {
          ...attrs,
          "data-scope": "listbox",
          "data-part": "item-indicator",
        },
        slots,
      );
  },
}), lkAutomaticListboxStyles);
