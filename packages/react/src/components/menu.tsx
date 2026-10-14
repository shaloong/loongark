"use client";
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticMenuStyles } from "@shaloong/loongark-primitives/automatic-styles/menu";


import { ark } from "@ark-ui/react/factory";
import { mergeProps as mergeMenuProps } from "@zag-js/react";
import { contextMenuPointerHandler, recoverClosedMenuFocus } from "@shaloong/loongark-kit";
/**
 * Menu component - React wrapper
 * Based on Ark UI Menu, injects data-scope/data-part attributes.
 */
import React, {
  createContext,
  createElement,
  forwardRef,
  useContext,
  type FC,
  type ReactNode,
} from "react";
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
} from "@ark-ui/react/menu";
import { Portal as ArkPortal } from "./portal";
import type { MenuSize } from "@shaloong/loongark-primitives";

const SafePortal: FC<{ children?: ReactNode }> = ({ children }) =>
  createElement(ArkPortal, null, children);

const MenuContext = createContext<{ size: MenuSize }>({ size: "md" });

export interface LoongArkMenuRootProps extends Omit<
  ArkMenuRootProps,
  "asChild"
> {
  size?: MenuSize;
}

export const LoongArkMenuRoot = /*#__PURE__*/ withAutomaticStyles((props: LoongArkMenuRootProps) => {
  const { size = "md", ...rest } = props;
  return (
    <MenuContext.Provider value={{ size }}>
      <ArkMenu.Root
        {...rest}
        data-scope="menu"
        data-part="root"
        data-size={size}
      />
    </MenuContext.Provider>
  );
}, lkAutomaticMenuStyles);

type TriggerProps = ArkMenuTriggerProps & { children?: ReactNode };

export const LoongArkMenuTrigger = /*#__PURE__*/ withAutomaticStyles(forwardRef<HTMLButtonElement, TriggerProps>(
  ({ asChild = true, children, ...rest }, ref) => (
    <ArkMenu.Trigger
      {...rest}
      asChild={asChild}
      ref={ref}
      data-scope="menu"
      data-part="trigger"
    >
      {children}
    </ArkMenu.Trigger>
  ),
), lkAutomaticMenuStyles);
LoongArkMenuTrigger.displayName = "LoongArkMenuTrigger";

type ContextTriggerProps = ArkMenuContextTriggerProps & {
  children?: ReactNode;
};

export const createMenuContextTrigger = (defaultAsChild = true) =>
  forwardRef<HTMLButtonElement, ContextTriggerProps>(
    ({ asChild = defaultAsChild, children, ...rest }, ref) => {
      const menu = useMenuContext();
      const native = menu.getContextTriggerProps();
      const merged = mergeMenuProps(
        {
          ...native,
          onPointerDown: contextMenuPointerHandler(native.onPointerDown),
          onPointerUp: contextMenuPointerHandler(native.onPointerUp),
          onPointerMove: contextMenuPointerHandler(native.onPointerMove),
          onPointerCancel: contextMenuPointerHandler(native.onPointerCancel),
        },
        rest,
      );
      return (
        <ark.button
          {...merged}
          asChild={asChild}
          ref={ref}
          data-scope="menu"
          data-part="context-trigger"
        >
          {children}
        </ark.button>
      );
    },
  );
export const LoongArkMenuContextTrigger = /*#__PURE__*/ withAutomaticStyles(createMenuContextTrigger(), lkAutomaticMenuStyles);
LoongArkMenuContextTrigger.displayName = "LoongArkMenuContextTrigger";

export const LoongArkMenuPositioner = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkMenuPositionerProps
>((props, ref) => (
  <SafePortal>
    <ArkMenu.Positioner
      {...props}
      ref={ref}
      data-scope="menu"
      data-part="positioner"
    />
  </SafePortal>
)), lkAutomaticMenuStyles);
LoongArkMenuPositioner.displayName = "LoongArkMenuPositioner";

export const LoongArkMenuContent = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkMenuContentProps
>((props, ref) => {
  const { size } = useContext(MenuContext);
  return (
    <ArkMenu.Content
      {...props}
      ref={ref}
      onFocus={(event) => {
        props.onFocus?.(event);
        recoverClosedMenuFocus(event.currentTarget, event.relatedTarget);
      }}
      data-scope="menu"
      data-part="content"
      data-size={size}
    />
  );
}), lkAutomaticMenuStyles);
LoongArkMenuContent.displayName = "LoongArkMenuContent";

export const LoongArkMenuArrow = /*#__PURE__*/ withAutomaticStyles(forwardRef<HTMLDivElement, ArkMenuArrowProps>(
  (props, ref) => (
    <ArkMenu.Arrow {...props} ref={ref} data-scope="menu" data-part="arrow" />
  ),
), lkAutomaticMenuStyles);
LoongArkMenuArrow.displayName = "LoongArkMenuArrow";

export const LoongArkMenuArrowTip = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkMenuArrowTipProps
>((props, ref) => (
  <ArkMenu.ArrowTip
    {...props}
    ref={ref}
    data-scope="menu"
    data-part="arrow-tip"
  />
)), lkAutomaticMenuStyles);
LoongArkMenuArrowTip.displayName = "LoongArkMenuArrowTip";

export const LoongArkMenuItem = /*#__PURE__*/ withAutomaticStyles(forwardRef<HTMLDivElement, ArkMenuItemProps>(
  (props, ref) => (
    <ArkMenu.Item {...props} ref={ref} data-scope="menu" data-part="item" />
  ),
), lkAutomaticMenuStyles);
LoongArkMenuItem.displayName = "LoongArkMenuItem";

export const LoongArkMenuTriggerItem = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkMenuTriggerItemProps
>((props, ref) => (
  <ArkMenu.TriggerItem
    {...props}
    ref={ref}
    data-scope="menu"
    data-part="trigger-item"
  />
)), lkAutomaticMenuStyles);
LoongArkMenuTriggerItem.displayName = "LoongArkMenuTriggerItem";

export const LoongArkMenuCheckboxItem = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkMenuCheckboxItemProps
>((props, ref) => (
  <ArkMenu.CheckboxItem
    {...props}
    ref={ref}
    data-scope="menu"
    data-part="item"
  />
)), lkAutomaticMenuStyles);
LoongArkMenuCheckboxItem.displayName = "LoongArkMenuCheckboxItem";

export const LoongArkMenuRadioItem = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkMenuRadioItemProps
>((props, ref) => (
  <ArkMenu.RadioItem {...props} ref={ref} data-scope="menu" data-part="item" />
)), lkAutomaticMenuStyles);
LoongArkMenuRadioItem.displayName = "LoongArkMenuRadioItem";

export const LoongArkMenuRadioItemGroup = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkMenuRadioItemGroupProps
>((props, ref) => (
  <ArkMenu.RadioItemGroup
    {...props}
    ref={ref}
    data-scope="menu"
    data-part="item-group"
  />
)), lkAutomaticMenuStyles);
LoongArkMenuRadioItemGroup.displayName = "LoongArkMenuRadioItemGroup";

export const LoongArkMenuItemGroup = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkMenuItemGroupProps
>((props, ref) => (
  <ArkMenu.ItemGroup
    {...props}
    ref={ref}
    data-scope="menu"
    data-part="item-group"
  />
)), lkAutomaticMenuStyles);
LoongArkMenuItemGroup.displayName = "LoongArkMenuItemGroup";

export const LoongArkMenuItemGroupLabel = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkMenuItemGroupLabelProps
>((props, ref) => (
  <ArkMenu.ItemGroupLabel
    {...props}
    ref={ref}
    data-scope="menu"
    data-part="item-group-label"
  />
)), lkAutomaticMenuStyles);
LoongArkMenuItemGroupLabel.displayName = "LoongArkMenuItemGroupLabel";

export const LoongArkMenuItemText = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkMenuItemTextProps
>((props, ref) => (
  <ArkMenu.ItemText
    {...props}
    ref={ref}
    data-scope="menu"
    data-part="item-text"
  />
)), lkAutomaticMenuStyles);
LoongArkMenuItemText.displayName = "LoongArkMenuItemText";

export const LoongArkMenuItemIndicator = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkMenuItemIndicatorProps
>((props, ref) => (
  <ArkMenu.ItemIndicator
    {...props}
    ref={ref}
    data-scope="menu"
    data-part="item-indicator"
  />
)), lkAutomaticMenuStyles);
LoongArkMenuItemIndicator.displayName = "LoongArkMenuItemIndicator";

export const LoongArkMenuIndicator = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkMenuIndicatorProps
>((props, ref) => (
  <ArkMenu.Indicator
    {...props}
    ref={ref}
    data-scope="menu"
    data-part="indicator"
  />
)), lkAutomaticMenuStyles);
LoongArkMenuIndicator.displayName = "LoongArkMenuIndicator";

export const LoongArkMenuSeparator = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLHRElement,
  ArkMenuSeparatorProps
>((props, ref) => (
  <ArkMenu.Separator
    {...props}
    ref={ref}
    data-scope="menu"
    data-part="separator"
  />
)), lkAutomaticMenuStyles);
LoongArkMenuSeparator.displayName = "LoongArkMenuSeparator";
