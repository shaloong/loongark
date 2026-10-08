import { useForwardExpose } from "@ark-ui/vue/utils";
import type { MenuContextTriggerProps } from "@ark-ui/vue/menu";
import { ark } from "@ark-ui/vue/factory";
import { contextMenuPointerHandler } from "@loongark/kit";
import type { MenuRootEmits as NativeMenuRootEmits } from "@ark-ui/vue/menu";
import type { MenuRootProps as NativeMenuRootProps } from "@ark-ui/vue/menu";
import { renderPart } from "../render-part";
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
  mergeProps,
  type PropType,
} from "vue";
import {
  MenuRoot as ArkMenuRoot,
  MenuTrigger as ArkMenuTrigger,
  useMenuContext,
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
      type: Object as PropType<NativeMenuRootProps["ids"]>,
    },
    open: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    defaultOpen: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    onOpenChange: {
      type: Function as PropType<
        (...args: NativeMenuRootEmits["openChange"]) => void
      >,
    },
    onSelect: {
      type: Function as PropType<
        (...args: NativeMenuRootEmits["select"]) => void
      >,
    },
    highlightedValue: {
      type: String as PropType<string>,
    },
    defaultHighlightedValue: {
      type: String as PropType<string>,
    },
    onHighlightChange: {
      type: Function as PropType<
        (...args: NativeMenuRootEmits["highlightChange"]) => void
      >,
    },
    anchorPoint: {
      type: Object as PropType<NativeMenuRootProps["anchorPoint"]>,
    },
    positioning: {
      type: Object as PropType<NativeMenuRootProps["positioning"]>,
    },
    closeOnSelect: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    loopFocus: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    typeahead: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    composite: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    navigate: {
      type: Function as PropType<NativeMenuRootProps["navigate"]>,
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
  },
  setup(props, { slots, attrs }) {
    provide(menuSizeKey, toRef(props, "size"));
    return () =>
      renderPart(
        ArkMenuRoot,
        {
          ...attrs,
          ...props,
          "data-scope": "menu",
          "data-part": "root",
          "data-size": props.size,
        },
        slots,
      );
  },
});

export const LoongArkMenuTrigger = defineComponent({
  name: "LoongArkMenuTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkMenuTrigger,
        {
          ...attrs,
          asChild: true,
          "data-scope": "menu",
          "data-part": "trigger",
        },
        slots,
      );
  },
});

export const createMenuContextTrigger = (defaultAsChild = true) =>
  defineComponent(
    (props: MenuContextTriggerProps, { slots, attrs }) => {
      const menu = useMenuContext();
      useForwardExpose();
      return () => {
        const native = menu.value.getContextTriggerProps();
        return renderPart(
          ark.button,
          mergeProps(
            {
              ...native,
              onPointerdown: contextMenuPointerHandler(native.onPointerdown),
              onPointerup: contextMenuPointerHandler(native.onPointerup),
              onPointermove: contextMenuPointerHandler(native.onPointermove),
              onPointercancel: contextMenuPointerHandler(
                native.onPointercancel,
              ),
            },
            { ...props },
            attrs,
            {
              asChild: props.asChild ?? defaultAsChild,
              "data-scope": "menu",
              "data-part": "context-trigger",
            },
          ),
          slots,
        );
      };
    },
    {
      name: "LoongArkMenuContextTrigger",
      props: { asChild: { type: Boolean, default: undefined } },
      inheritAttrs: false,
    },
  );

export const LoongArkMenuContextTrigger = createMenuContextTrigger();

export const LoongArkMenuPositioner = defineComponent({
  name: "LoongArkMenuPositioner",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkMenuPositioner,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "positioner",
        },
        slots,
      );
  },
});

export const LoongArkMenuContent = defineComponent({
  name: "LoongArkMenuContent",
  setup(_, { slots, attrs }) {
    const size = inject(menuSizeKey, { value: "md" as MenuSize });
    return () =>
      renderPart(
        ArkMenuContent,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "content",
          "data-size": size.value,
        },
        slots,
      );
  },
});

export const LoongArkMenuArrow = defineComponent({
  name: "LoongArkMenuArrow",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkMenuArrow,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "arrow",
        },
        slots,
      );
  },
});

export const LoongArkMenuArrowTip = defineComponent({
  name: "LoongArkMenuArrowTip",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkMenuArrowTip,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "arrow-tip",
        },
        slots,
      );
  },
});

export const LoongArkMenuItem = defineComponent({
  name: "LoongArkMenuItem",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkMenuItem,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "item",
        },
        slots,
      );
  },
});

export const LoongArkMenuTriggerItem = defineComponent({
  name: "LoongArkMenuTriggerItem",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkMenuTriggerItem,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "trigger-item",
        },
        slots,
      );
  },
});

export const LoongArkMenuCheckboxItem = defineComponent({
  name: "LoongArkMenuCheckboxItem",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkMenuCheckboxItem,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "item",
        },
        slots,
      );
  },
});

export const LoongArkMenuRadioItem = defineComponent({
  name: "LoongArkMenuRadioItem",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkMenuRadioItem,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "item",
        },
        slots,
      );
  },
});

export const LoongArkMenuRadioItemGroup = defineComponent({
  name: "LoongArkMenuRadioItemGroup",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkMenuRadioItemGroup,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "item-group",
        },
        slots,
      );
  },
});

export const LoongArkMenuItemGroup = defineComponent({
  name: "LoongArkMenuItemGroup",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkMenuItemGroup,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "item-group",
        },
        slots,
      );
  },
});

export const LoongArkMenuItemGroupLabel = defineComponent({
  name: "LoongArkMenuItemGroupLabel",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkMenuItemGroupLabel,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "item-group-label",
        },
        slots,
      );
  },
});

export const LoongArkMenuItemText = defineComponent({
  name: "LoongArkMenuItemText",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkMenuItemText,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "item-text",
        },
        slots,
      );
  },
});

export const LoongArkMenuItemIndicator = defineComponent({
  name: "LoongArkMenuItemIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkMenuItemIndicator,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "item-indicator",
        },
        slots,
      );
  },
});

export const LoongArkMenuIndicator = defineComponent({
  name: "LoongArkMenuIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkMenuIndicator,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "indicator",
        },
        slots,
      );
  },
});

export const LoongArkMenuSeparator = defineComponent({
  name: "LoongArkMenuSeparator",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkMenuSeparator,
        {
          ...attrs,
          "data-scope": "menu",
          "data-part": "separator",
        },
        slots,
      );
  },
});
