/**
 * Combobox component - Vue wrapper.
 * Based on Ark UI Combobox with data attributes for styling.
 */
import {
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

export const LoongArkComboboxRoot = defineComponent({
  name: "LoongArkComboboxRoot",
  props: {
    size: {
      type: String as PropType<ComboboxSize>,
      default: "md",
    },
    collection: {
      type: Object as PropType<any>,
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
    },
    defaultValue: {
      type: Array as PropType<string[]>,
    },
    defaultInputValue: {
      type: String as PropType<string>,
    },
    deselectable: {
      type: Boolean as PropType<boolean>,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
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
      type: Object as PropType<any>,
    },
    immediate: {
      type: Boolean as PropType<boolean>,
    },
    inputValue: {
      type: String as PropType<string>,
    },
    invalid: {
      type: Boolean as PropType<boolean>,
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
    },
    positioning: {
      type: Object as PropType<any>,
    },
    present: {
      type: Boolean as PropType<boolean>,
    },
    readOnly: {
      type: Boolean as PropType<boolean>,
    },
    required: {
      type: Boolean as PropType<boolean>,
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
      h(
        ArkComboboxRoot,
        {
          ...attrs,
          ...props,
          "data-scope": "combobox",
          "data-part": "root",
          "data-size": props.size,
        },
        slots
      );
  },
});

export const LoongArkComboboxLabel = defineComponent({
  name: "LoongArkComboboxLabel",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkComboboxLabel,
        {
          ...attrs,
          "data-scope": "combobox",
          "data-part": "label",
        },
        slots
      );
  },
});

export const LoongArkComboboxControl = defineComponent({
  name: "LoongArkComboboxControl",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkComboboxControl,
        {
          ...attrs,
          "data-scope": "combobox",
          "data-part": "control",
        },
        slots
      );
  },
});

export const LoongArkComboboxInput = defineComponent({
  name: "LoongArkComboboxInput",
  setup(_, { attrs }) {
    return () =>
      h(ArkComboboxInput, {
        ...attrs,
        "data-scope": "combobox",
        "data-part": "input",
      });
  },
});

export const LoongArkComboboxTrigger = defineComponent({
  name: "LoongArkComboboxTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkComboboxTrigger,
        {
          ...attrs,
          "data-scope": "combobox",
          "data-part": "trigger",
        },
        slots
      );
  },
});

export const LoongArkComboboxClearTrigger = defineComponent({
  name: "LoongArkComboboxClearTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkComboboxClearTrigger,
        {
          ...attrs,
          "data-scope": "combobox",
          "data-part": "clear-trigger",
        },
        slots
      );
  },
});

export const LoongArkComboboxPositioner = defineComponent({
  name: "LoongArkComboboxPositioner",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkComboboxPositioner,
        {
          ...attrs,
          "data-scope": "combobox",
          "data-part": "positioner",
        },
        slots
      );
  },
});

export const LoongArkComboboxContent = defineComponent({
  name: "LoongArkComboboxContent",
  setup(_, { slots, attrs }) {
    const size = inject(comboboxSizeKey, { value: "md" as ComboboxSize });
    return () =>
      h(
        ArkComboboxContent,
        {
          ...attrs,
          "data-scope": "combobox",
          "data-part": "content",
          "data-size": size.value,
        },
        slots
      );
  },
});

export const LoongArkComboboxList = defineComponent({
  name: "LoongArkComboboxList",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkComboboxList,
        {
          ...attrs,
          "data-scope": "combobox",
          "data-part": "list",
        },
        slots
      );
  },
});

export const LoongArkComboboxItemGroup = defineComponent({
  name: "LoongArkComboboxItemGroup",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkComboboxItemGroup,
        {
          ...attrs,
          "data-scope": "combobox",
          "data-part": "item-group",
        },
        slots
      );
  },
});

export const LoongArkComboboxItemGroupLabel = defineComponent({
  name: "LoongArkComboboxItemGroupLabel",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkComboboxItemGroupLabel,
        {
          ...attrs,
          "data-scope": "combobox",
          "data-part": "item-group-label",
        },
        slots
      );
  },
});

export const LoongArkComboboxItem = defineComponent({
  name: "LoongArkComboboxItem",
  props: {
    item: {
      type: Object as PropType<any>,
    },
    persistFocus: {
      type: Boolean as PropType<boolean>,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ArkComboboxItem,
        {
          ...attrs,
          item: props.item,
          persistFocus: props.persistFocus,
          disabled: props.disabled,
          "data-scope": "combobox",
          "data-part": "item",
        },
        slots
      );
  },
});

export const LoongArkComboboxItemText = defineComponent({
  name: "LoongArkComboboxItemText",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkComboboxItemText,
        {
          ...attrs,
          "data-scope": "combobox",
          "data-part": "item-text",
        },
        slots
      );
  },
});

export const LoongArkComboboxItemIndicator = defineComponent({
  name: "LoongArkComboboxItemIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkComboboxItemIndicator,
        {
          ...attrs,
          "data-scope": "combobox",
          "data-part": "item-indicator",
        },
        slots
      );
  },
});
