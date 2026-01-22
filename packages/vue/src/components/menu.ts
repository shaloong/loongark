/**
 * Menu component - Vue wrapper
 * Based on Ark UI Menu, injects data-scope/data-part attributes.
 */
import {
  defineComponent,
  h,
  inject,
  provide,
  toRef,
  type PropType,
} from "vue";
import {
  MenuRoot as ArkMenuRoot,
  MenuTrigger as ArkMenuTrigger,
  MenuContextTrigger as ArkMenuContextTrigger,
  MenuPositioner as ArkMenuPositioner,
  MenuContent as ArkMenuContent,
  MenuArrow as ArkMenuArrow,
  MenuArrowTip as ArkMenuArrowTip,
  MenuItem as ArkMenuItem,
  MenuTriggerItem as ArkMenuTriggerItem,
  MenuCheckboxItem as ArkMenuCheckboxItem,
  MenuRadioItem as ArkMenuRadioItem,
  MenuRadioItemGroup as ArkMenuRadioItemGroup,
  MenuItemGroup as ArkMenuItemGroup,
  MenuItemGroupLabel as ArkMenuItemGroupLabel,
  MenuItemText as ArkMenuItemText,
  MenuItemIndicator as ArkMenuItemIndicator,
  MenuIndicator as ArkMenuIndicator,
  MenuSeparator as ArkMenuSeparator,
} from "@ark-ui/vue/menu";
import type { MenuSize } from "@loongark/primitives";

const menuSizeKey = Symbol("loongark-menu-size");

export const LoongArkMenuRoot = defineComponent({
  name: "LoongArkMenuRoot",
  props: {
    size: {
      type: String as PropType<MenuSize>,
      default: "md",
    },
    id: {
      type: String as PropType<string>,
    },
    ids: {
      type: Object as PropType<any>,
    },
    open: {
      type: Boolean as PropType<boolean>,
    },
    defaultOpen: {
      type: Boolean as PropType<boolean>,
    },
    onOpenChange: {
      type: Function as PropType<any>,
    },
    onSelect: {
      type: Function as PropType<any>,
    },
    highlightedValue: {
      type: String as PropType<string>,
    },
    defaultHighlightedValue: {
      type: String as PropType<string>,
    },
    onHighlightChange: {
      type: Function as PropType<any>,
    },
    anchorPoint: {
      type: Object as PropType<any>,
    },
    positioning: {
      type: Object as PropType<any>,
    },
    closeOnSelect: {
      type: Boolean as PropType<boolean>,
    },
    loopFocus: {
      type: Boolean as PropType<boolean>,
    },
    typeahead: {
      type: Boolean as PropType<boolean>,
    },
    composite: {
      type: Boolean as PropType<boolean>,
    },
    navigate: {
      type: Function as PropType<any>,
    },
    lazyMount: {
      type: Boolean as PropType<boolean>,
    },
    unmountOnExit: {
      type: Boolean as PropType<boolean>,
    },
    present: {
      type: Boolean as PropType<boolean>,
    },
    skipAnimationOnMount: {
      type: Boolean as PropType<boolean>,
    },
  },
  setup(props, { slots, attrs }) {
    provide(menuSizeKey, toRef(props, "size"));
    return () =>
      h(
        ArkMenuRoot,
        {
          ...attrs,
          ...props,
          "data-scope": "menu",
          "data-part": "root",
          "data-size": props.size,
        },
        slots
      );
  },
});

export const LoongArkMenuTrigger = defineComponent({
  name: "LoongArkMenuTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkMenuTrigger,
        {
          ...attrs,
          asChild: true,
          "data-scope": "menu",
          "data-part": "trigger",
        },
        slots
      );
  },
});

export const LoongArkMenuContextTrigger = defineComponent({
  name: "LoongArkMenuContextTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkMenuContextTrigger,
        {
          ...attrs,
          asChild: true,
          "data-scope": "menu",
          "data-part": "context-trigger",
        },
        slots
      );
  },
});

export const LoongArkMenuPositioner = defineComponent({
  name: "LoongArkMenuPositioner",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkMenuPositioner,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "positioner",
        },
        slots
      );
  },
});

export const LoongArkMenuContent = defineComponent({
  name: "LoongArkMenuContent",
  setup(_, { slots, attrs }) {
    const size = inject(menuSizeKey, { value: "md" as MenuSize });
    return () =>
      h(
        ArkMenuContent,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "content",
          "data-size": size.value,
        },
        slots
      );
  },
});

export const LoongArkMenuArrow = defineComponent({
  name: "LoongArkMenuArrow",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkMenuArrow,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "arrow",
        },
        slots
      );
  },
});

export const LoongArkMenuArrowTip = defineComponent({
  name: "LoongArkMenuArrowTip",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkMenuArrowTip,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "arrow-tip",
        },
        slots
      );
  },
});

export const LoongArkMenuItem = defineComponent({
  name: "LoongArkMenuItem",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkMenuItem,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "item",
        },
        slots
      );
  },
});

export const LoongArkMenuTriggerItem = defineComponent({
  name: "LoongArkMenuTriggerItem",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkMenuTriggerItem,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "trigger-item",
        },
        slots
      );
  },
});

export const LoongArkMenuCheckboxItem = defineComponent({
  name: "LoongArkMenuCheckboxItem",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkMenuCheckboxItem,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "item",
        },
        slots
      );
  },
});

export const LoongArkMenuRadioItem = defineComponent({
  name: "LoongArkMenuRadioItem",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkMenuRadioItem,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "item",
        },
        slots
      );
  },
});

export const LoongArkMenuRadioItemGroup = defineComponent({
  name: "LoongArkMenuRadioItemGroup",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkMenuRadioItemGroup,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "item-group",
        },
        slots
      );
  },
});

export const LoongArkMenuItemGroup = defineComponent({
  name: "LoongArkMenuItemGroup",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkMenuItemGroup,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "item-group",
        },
        slots
      );
  },
});

export const LoongArkMenuItemGroupLabel = defineComponent({
  name: "LoongArkMenuItemGroupLabel",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkMenuItemGroupLabel,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "item-group-label",
        },
        slots
      );
  },
});

export const LoongArkMenuItemText = defineComponent({
  name: "LoongArkMenuItemText",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkMenuItemText,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "item-text",
        },
        slots
      );
  },
});

export const LoongArkMenuItemIndicator = defineComponent({
  name: "LoongArkMenuItemIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkMenuItemIndicator,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "item-indicator",
        },
        slots
      );
  },
});

export const LoongArkMenuIndicator = defineComponent({
  name: "LoongArkMenuIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkMenuIndicator,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "indicator",
        },
        slots
      );
  },
});

export const LoongArkMenuSeparator = defineComponent({
  name: "LoongArkMenuSeparator",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkMenuSeparator,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "separator",
        },
        slots
      );
  },
});
