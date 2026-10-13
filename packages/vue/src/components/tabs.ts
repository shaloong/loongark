
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticTabsStyles } from "@loongark/primitives/automatic-styles/tabs";
import { renderPart } from "../render-part";
/**
 * Tabs 组件 - Vue 实现
 * 基于 Ark UI Tabs 的标签页
 */
import { defineComponent, h, type PropType } from "vue";
import { Tabs as ArkTabs } from "@ark-ui/vue/tabs";
import type { TabsOrientation, TabsSize } from "@loongark/primitives";

export interface TabsValueChangeDetails {
  value: string;
}

export const LoongArkTabsRoot = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkTabsRoot",
  props: {
    size: {
      type: String as PropType<TabsSize>,
      default: "md",
    },
    orientation: {
      type: String as PropType<TabsOrientation>,
      default: "horizontal",
    },
    value: {
      type: String as PropType<string>,
    },
    defaultValue: {
      type: String as PropType<string>,
    },
    activationMode: {
      type: String as PropType<"automatic" | "manual">,
    },
    loopFocus: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    composite: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    id: {
      type: String as PropType<string>,
    },
    lazyMount: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    unmountOnExit: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    present: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    skipAnimationOnMount: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    onValueChange: {
      type: Function as PropType<(details: TabsValueChangeDetails) => void>,
    },
    onFocusChange: {
      type: Function as PropType<(details: TabsValueChangeDetails) => void>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTabs.Root,
        {
          ...attrs,
          ...props,
          "data-scope": "tabs",
          "data-part": "root",
          "data-size": props.size,
          "data-orientation": props.orientation,
        },
        slots,
      );
  },
}), lkAutomaticTabsStyles);

export const LoongArkTabsList = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkTabsList",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTabs.List,
        {
          ...attrs,
          "data-scope": "tabs",
          "data-part": "list",
        },
        slots,
      );
  },
}), lkAutomaticTabsStyles);

export const LoongArkTabsTrigger = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkTabsTrigger",
  props: {
    value: {
      type: String as PropType<string>,
      required: true,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTabs.Trigger,
        {
          ...attrs,
          value: props.value,
          disabled: props.disabled,
          "data-scope": "tabs",
          "data-part": "trigger",
        },
        slots,
      );
  },
}), lkAutomaticTabsStyles);

export const LoongArkTabsContent = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkTabsContent",
  props: {
    value: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTabs.Content,
        {
          ...attrs,
          value: props.value,
          "data-scope": "tabs",
          "data-part": "content",
        },
        slots,
      );
  },
}), lkAutomaticTabsStyles);

export const LoongArkTabsIndicator = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkTabsIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTabs.Indicator,
        {
          ...attrs,
          "data-scope": "tabs",
          "data-part": "indicator",
        },
        slots,
      );
  },
}), lkAutomaticTabsStyles);
