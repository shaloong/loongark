/**
 * Listbox component - Vue wrapper.
 * Uses Ark UI Listbox with data attributes for styling.
 */
import { defineComponent, h, type PropType } from "vue";
import { Listbox as ArkListbox } from "@ark-ui/vue/listbox";
import type { ListboxOrientation, ListboxSize } from "@loongark/primitives";

export const LoongArkListboxRoot = defineComponent({
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
      type: Object as PropType<any>,
    },
    defaultValue: {
      type: Array as PropType<string[]>,
    },
    value: {
      type: Array as PropType<string[]>,
    },
    multiple: {
      type: Boolean as PropType<boolean>,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
    },
    loopFocus: {
      type: Boolean as PropType<boolean>,
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
      h(
        ArkListbox.Root,
        {
          ...attrs,
          ...props,
          "data-scope": "listbox",
          "data-part": "root",
          "data-size": props.size,
          "data-orientation": props.orientation,
        },
        slots
      );
  },
});

export const LoongArkListboxLabel = defineComponent({
  name: "LoongArkListboxLabel",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkListbox.Label,
        {
          ...attrs,
          "data-scope": "listbox",
          "data-part": "label",
        },
        slots
      );
  },
});

export const LoongArkListboxList = defineComponent({
  name: "LoongArkListboxList",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkListbox.List,
        {
          ...attrs,
          "data-scope": "listbox",
          "data-part": "list",
        },
        slots
      );
  },
});

export const LoongArkListboxItemGroup = defineComponent({
  name: "LoongArkListboxItemGroup",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkListbox.ItemGroup,
        {
          ...attrs,
          "data-scope": "listbox",
          "data-part": "item-group",
        },
        slots
      );
  },
});

export const LoongArkListboxItemGroupLabel = defineComponent({
  name: "LoongArkListboxItemGroupLabel",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkListbox.ItemGroupLabel,
        {
          ...attrs,
          "data-scope": "listbox",
          "data-part": "item-group-label",
        },
        slots
      );
  },
});

export const LoongArkListboxItem = defineComponent({
  name: "LoongArkListboxItem",
  props: {
    item: {
      type: Object as PropType<any>,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ArkListbox.Item,
        {
          ...attrs,
          ...props,
          "data-scope": "listbox",
          "data-part": "item",
        },
        slots
      );
  },
});

export const LoongArkListboxItemText = defineComponent({
  name: "LoongArkListboxItemText",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkListbox.ItemText,
        {
          ...attrs,
          "data-scope": "listbox",
          "data-part": "item-text",
        },
        slots
      );
  },
});

export const LoongArkListboxItemIndicator = defineComponent({
  name: "LoongArkListboxItemIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkListbox.ItemIndicator,
        {
          ...attrs,
          "data-scope": "listbox",
          "data-part": "item-indicator",
        },
        slots
      );
  },
});
