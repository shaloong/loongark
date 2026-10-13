
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticMenuStyles } from "@loongark/primitives/automatic-styles/menu";
import { ark } from "@ark-ui/solid/factory";
import { mergeProps as mergeMenuProps } from "@zag-js/solid";
import { contextMenuPointerHandler, recoverClosedMenuFocus } from "@loongark/kit";
/**
 * Menu component - Solid wrapper
 * Based on Ark UI Menu, injects data-scope/data-part attributes.
 */
import {
  type Component,
  type JSX,
  createContext,
  mergeProps,
  useContext,
} from "solid-js";
import {
  Menu as ArkMenu,
  useMenuContext,
  type MenuRootProps as ArkMenuRootProps,
  type MenuTriggerProps as ArkMenuTriggerProps,
  type MenuContextTriggerProps as ArkMenuContextTriggerProps,
  type MenuPositionerProps as ArkMenuPositionerProps,
  type MenuContentProps as ArkMenuContentProps,
  type MenuArrowProps as ArkMenuArrowProps,
  type MenuArrowTipProps as ArkMenuArrowTipProps,
  type MenuItemProps as ArkMenuItemProps,
  type MenuTriggerItemProps as ArkMenuTriggerItemProps,
  type MenuCheckboxItemProps as ArkMenuCheckboxItemProps,
  type MenuRadioItemProps as ArkMenuRadioItemProps,
  type MenuRadioItemGroupProps as ArkMenuRadioItemGroupProps,
  type MenuItemGroupProps as ArkMenuItemGroupProps,
  type MenuItemGroupLabelProps as ArkMenuItemGroupLabelProps,
  type MenuItemTextProps as ArkMenuItemTextProps,
  type MenuItemIndicatorProps as ArkMenuItemIndicatorProps,
  type MenuIndicatorProps as ArkMenuIndicatorProps,
  type MenuSeparatorProps as ArkMenuSeparatorProps,
} from "@ark-ui/solid/menu";
import type { MenuSize } from "@loongark/primitives";

const MenuContext = createContext<{ size: MenuSize }>({ size: "md" });

export interface LoongArkMenuRootProps extends Omit<
  ArkMenuRootProps,
  "asChild"
> {
  size?: MenuSize;
  children?: JSX.Element;
}

export const LoongArkMenuRoot: Component<LoongArkMenuRootProps> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const merged = mergeProps({ size: "md" as MenuSize }, props);
  return (
    <MenuContext.Provider value={{ size: merged.size }}>
      <ArkMenu.Root
        {...props}
        data-scope="menu"
        data-part="root"
        data-size={merged.size}
      >
        {props.children}
      </ArkMenu.Root>
    </MenuContext.Provider>
  );
}, lkAutomaticMenuStyles);

export const LoongArkMenuTrigger: Component<
  ArkMenuTriggerProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const merged = mergeProps({}, props);
  return (
    <ArkMenu.Trigger {...merged} data-scope="menu" data-part="trigger">
      {props.children}
    </ArkMenu.Trigger>
  );
}, lkAutomaticMenuStyles);

export const LoongArkMenuContextTrigger: Component<
  ArkMenuContextTriggerProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const menu = useMenuContext();
  const merged = () => {
    const native = menu().getContextTriggerProps();
    return mergeMenuProps(
      {
        ...native,
        onPointerDown:
          typeof native.onPointerDown === "function"
            ? contextMenuPointerHandler(native.onPointerDown)
            : native.onPointerDown,
        onPointerUp:
          typeof native.onPointerUp === "function"
            ? contextMenuPointerHandler(native.onPointerUp)
            : native.onPointerUp,
        onPointerMove:
          typeof native.onPointerMove === "function"
            ? contextMenuPointerHandler(native.onPointerMove)
            : native.onPointerMove,
        onPointerCancel:
          typeof native.onPointerCancel === "function"
            ? contextMenuPointerHandler(native.onPointerCancel)
            : native.onPointerCancel,
      },
      props,
    );
  };
  return (
    <ark.button {...merged()} data-scope="menu" data-part="context-trigger">
      {props.children}
    </ark.button>
  );
}, lkAutomaticMenuStyles);

export const LoongArkMenuPositioner: Component<
  ArkMenuPositionerProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => (
  <ArkMenu.Positioner {...props} data-scope="menu" data-part="positioner">
    {props.children}
  </ArkMenu.Positioner>
), lkAutomaticMenuStyles);

export const LoongArkMenuContent: Component<
  ArkMenuContentProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const { size } = useContext(MenuContext);
  return (
    <ArkMenu.Content
      {...mergeMenuProps(props, {
        onFocus: (event: FocusEvent) => recoverClosedMenuFocus(event.currentTarget, event.relatedTarget),
      })}
      data-scope="menu"
      data-part="content"
      data-size={size}
    >
      {props.children}
    </ArkMenu.Content>
  );
}, lkAutomaticMenuStyles);

export const LoongArkMenuArrow: Component<ArkMenuArrowProps> = /*#__PURE__*/ withAutomaticStyles((props) => (
  <ArkMenu.Arrow {...props} data-scope="menu" data-part="arrow" />
), lkAutomaticMenuStyles);

export const LoongArkMenuArrowTip: Component<ArkMenuArrowTipProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => <ArkMenu.ArrowTip {...props} data-scope="menu" data-part="arrow-tip" />, lkAutomaticMenuStyles);

export const LoongArkMenuItem: Component<
  ArkMenuItemProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => (
  <ArkMenu.Item {...props} data-scope="menu" data-part="item">
    {props.children}
  </ArkMenu.Item>
), lkAutomaticMenuStyles);

export const LoongArkMenuTriggerItem: Component<
  ArkMenuTriggerItemProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => (
  <ArkMenu.TriggerItem {...props} data-scope="menu" data-part="trigger-item">
    {props.children}
  </ArkMenu.TriggerItem>
), lkAutomaticMenuStyles);

export const LoongArkMenuCheckboxItem: Component<
  ArkMenuCheckboxItemProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => (
  <ArkMenu.CheckboxItem {...props} data-scope="menu" data-part="item">
    {props.children}
  </ArkMenu.CheckboxItem>
), lkAutomaticMenuStyles);

export const LoongArkMenuRadioItem: Component<
  ArkMenuRadioItemProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => (
  <ArkMenu.RadioItem {...props} data-scope="menu" data-part="item">
    {props.children}
  </ArkMenu.RadioItem>
), lkAutomaticMenuStyles);

export const LoongArkMenuRadioItemGroup: Component<
  ArkMenuRadioItemGroupProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => (
  <ArkMenu.RadioItemGroup {...props} data-scope="menu" data-part="item-group">
    {props.children}
  </ArkMenu.RadioItemGroup>
), lkAutomaticMenuStyles);

export const LoongArkMenuItemGroup: Component<
  ArkMenuItemGroupProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => (
  <ArkMenu.ItemGroup {...props} data-scope="menu" data-part="item-group">
    {props.children}
  </ArkMenu.ItemGroup>
), lkAutomaticMenuStyles);

export const LoongArkMenuItemGroupLabel: Component<
  ArkMenuItemGroupLabelProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => (
  <ArkMenu.ItemGroupLabel
    {...props}
    data-scope="menu"
    data-part="item-group-label"
  >
    {props.children}
  </ArkMenu.ItemGroupLabel>
), lkAutomaticMenuStyles);

export const LoongArkMenuItemText: Component<
  ArkMenuItemTextProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => (
  <ArkMenu.ItemText {...props} data-scope="menu" data-part="item-text">
    {props.children}
  </ArkMenu.ItemText>
), lkAutomaticMenuStyles);

export const LoongArkMenuItemIndicator: Component<
  ArkMenuItemIndicatorProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => (
  <ArkMenu.ItemIndicator
    {...props}
    data-scope="menu"
    data-part="item-indicator"
  >
    {props.children}
  </ArkMenu.ItemIndicator>
), lkAutomaticMenuStyles);

export const LoongArkMenuIndicator: Component<
  ArkMenuIndicatorProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => (
  <ArkMenu.Indicator {...props} data-scope="menu" data-part="indicator">
    {props.children}
  </ArkMenu.Indicator>
), lkAutomaticMenuStyles);

export const LoongArkMenuSeparator: Component<
  ArkMenuSeparatorProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => (
  <ArkMenu.Separator {...props} data-scope="menu" data-part="separator">
    {props.children}
  </ArkMenu.Separator>
), lkAutomaticMenuStyles);
