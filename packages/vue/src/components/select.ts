/**
 * Select 组件 - Vue 实现
 * 基于 Ark UI Select 的下拉选择器
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
  SelectRoot as ArkSelectRoot,
  SelectLabel as ArkSelectLabel,
  SelectControl as ArkSelectControl,
  SelectTrigger as ArkSelectTrigger,
  SelectValueText as ArkSelectValueText,
  SelectIndicator as ArkSelectIndicator,
  SelectClearTrigger as ArkSelectClearTrigger,
  SelectPositioner as ArkSelectPositioner,
  SelectContent as ArkSelectContent,
  SelectList as ArkSelectList,
  SelectItemGroup as ArkSelectItemGroup,
  SelectItemGroupLabel as ArkSelectItemGroupLabel,
  SelectItem as ArkSelectItem,
  SelectItemText as ArkSelectItemText,
  SelectItemIndicator as ArkSelectItemIndicator,
  SelectHiddenSelect as ArkSelectHiddenSelect,
} from "@ark-ui/vue/select";
import type { SelectSize } from "@loongark/primitives";

const selectSizeKey = Symbol("loongark-select-size");

/**
 * Select Root 组件
 */
export const LoongArkSelectRoot = defineComponent({
  name: "LoongArkSelectRoot",
  props: {
    size: {
      type: String as PropType<SelectSize>,
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
    scrollToIndexFn: {
      type: Function as PropType<any>,
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
    provide(selectSizeKey, toRef(props, "size"));
    return () =>
      h(
        ArkSelectRoot,
        {
          ...attrs,
          ...props,
          "data-scope": "select",
          "data-part": "root",
          "data-size": props.size,
        },
        slots
      );
  },
});

/**
 * Select Label 组件
 */
export const LoongArkSelectLabel = defineComponent({
  name: "LoongArkSelectLabel",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSelectLabel,
        {
          ...attrs,
          "data-scope": "select",
          "data-part": "label",
        },
        slots
      );
  },
});

/**
 * Select Control 组件
 */
export const LoongArkSelectControl = defineComponent({
  name: "LoongArkSelectControl",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSelectControl,
        {
          ...attrs,
          "data-scope": "select",
          "data-part": "control",
        },
        slots
      );
  },
});

/**
 * Select Trigger 组件
 */
export const LoongArkSelectTrigger = defineComponent({
  name: "LoongArkSelectTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSelectTrigger,
        {
          ...attrs,
          "data-scope": "select",
          "data-part": "trigger",
        },
        slots
      );
  },
});

/**
 * Select ValueText 组件
 */
export const LoongArkSelectValueText = defineComponent({
  name: "LoongArkSelectValueText",
  props: {
    placeholder: {
      type: String as PropType<string>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ArkSelectValueText,
        {
          ...attrs,
          placeholder: props.placeholder,
          "data-scope": "select",
          "data-part": "value-text",
        },
        slots
      );
  },
});

/**
 * Select Indicator 组件
 */
export const LoongArkSelectIndicator = defineComponent({
  name: "LoongArkSelectIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSelectIndicator,
        {
          ...attrs,
          "data-scope": "select",
          "data-part": "indicator",
        },
        slots
      );
  },
});

/**
 * Select ClearTrigger 组件
 */
export const LoongArkSelectClearTrigger = defineComponent({
  name: "LoongArkSelectClearTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSelectClearTrigger,
        {
          ...attrs,
          "data-scope": "select",
          "data-part": "clear-trigger",
        },
        slots
      );
  },
});

/**
 * Select Positioner 组件
 */
export const LoongArkSelectPositioner = defineComponent({
  name: "LoongArkSelectPositioner",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSelectPositioner,
        {
          ...attrs,
          "data-scope": "select",
          "data-part": "positioner",
        },
        slots
      );
  },
});

/**
 * Select Content 组件
 */
export const LoongArkSelectContent = defineComponent({
  name: "LoongArkSelectContent",
  setup(_, { slots, attrs }) {
    const size = inject(selectSizeKey, { value: "md" as SelectSize });
    return () =>
      h(
        ArkSelectContent,
        {
          ...attrs,
          "data-scope": "select",
          "data-part": "content",
          "data-size": size.value,
        },
        slots
      );
  },
});

/**
 * Select List 组件
 */
export const LoongArkSelectList = defineComponent({
  name: "LoongArkSelectList",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSelectList,
        {
          ...attrs,
          "data-scope": "select",
          "data-part": "list",
        },
        slots
      );
  },
});

/**
 * Select ItemGroup 组件
 */
export const LoongArkSelectItemGroup = defineComponent({
  name: "LoongArkSelectItemGroup",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSelectItemGroup,
        {
          ...attrs,
          "data-scope": "select",
          "data-part": "item-group",
        },
        slots
      );
  },
});

/**
 * Select ItemGroupLabel 组件
 */
export const LoongArkSelectItemGroupLabel = defineComponent({
  name: "LoongArkSelectItemGroupLabel",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSelectItemGroupLabel,
        {
          ...attrs,
          "data-scope": "select",
          "data-part": "item-group-label",
        },
        slots
      );
  },
});

/**
 * Select Item 组件
 */
export const LoongArkSelectItem = defineComponent({
  name: "LoongArkSelectItem",
  props: {
    item: {
      type: Object as PropType<any>,
    },
    persistFocus: {
      type: Boolean as PropType<boolean>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ArkSelectItem,
        {
          ...attrs,
          item: props.item,
          persistFocus: props.persistFocus,
          "data-scope": "select",
          "data-part": "item",
        },
        slots
      );
  },
});

/**
 * Select ItemText 组件
 */
export const LoongArkSelectItemText = defineComponent({
  name: "LoongArkSelectItemText",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSelectItemText,
        {
          ...attrs,
          "data-scope": "select",
          "data-part": "item-text",
        },
        slots
      );
  },
});

/**
 * Select ItemIndicator 组件
 */
export const LoongArkSelectItemIndicator = defineComponent({
  name: "LoongArkSelectItemIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSelectItemIndicator,
        {
          ...attrs,
          "data-scope": "select",
          "data-part": "item-indicator",
        },
        slots
      );
  },
});

/**
 * Select HiddenSelect 组件
 */
export const LoongArkSelectHiddenSelect = defineComponent({
  name: "LoongArkSelectHiddenSelect",
  setup(_, { attrs }) {
    return () =>
      h(ArkSelectHiddenSelect, {
        ...attrs,
        "data-scope": "select",
        "data-part": "hidden-select",
      });
  },
});
