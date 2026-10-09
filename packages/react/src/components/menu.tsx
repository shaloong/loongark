import { ark } from "@ark-ui/react/factory";
import { mergeProps as mergeMenuProps } from "@zag-js/react";
import { contextMenuPointerHandler, recoverClosedMenuFocus } from "@loongark/kit";
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
import type { MenuSize } from "@loongark/primitives";

const SafePortal: FC<{ children?: ReactNode }> = ({ children }) =>
  createElement(ArkPortal, null, children);

const MenuContext = createContext<{ size: MenuSize }>({ size: "md" });

export interface LoongArkMenuRootProps extends Omit<
  ArkMenuRootProps,
  "asChild"
> {
  size?: MenuSize;
}

export const LoongArkMenuRoot = (props: LoongArkMenuRootProps) => {
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
};

type TriggerProps = ArkMenuTriggerProps & { children?: ReactNode };

export const LoongArkMenuTrigger = forwardRef<HTMLButtonElement, TriggerProps>(
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
);
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
export const LoongArkMenuContextTrigger = createMenuContextTrigger();
LoongArkMenuContextTrigger.displayName = "LoongArkMenuContextTrigger";

export const LoongArkMenuPositioner = forwardRef<
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
));
LoongArkMenuPositioner.displayName = "LoongArkMenuPositioner";

export const LoongArkMenuContent = forwardRef<
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
});
LoongArkMenuContent.displayName = "LoongArkMenuContent";

export const LoongArkMenuArrow = forwardRef<HTMLDivElement, ArkMenuArrowProps>(
  (props, ref) => (
    <ArkMenu.Arrow {...props} ref={ref} data-scope="menu" data-part="arrow" />
  ),
);
LoongArkMenuArrow.displayName = "LoongArkMenuArrow";

export const LoongArkMenuArrowTip = forwardRef<
  HTMLDivElement,
  ArkMenuArrowTipProps
>((props, ref) => (
  <ArkMenu.ArrowTip
    {...props}
    ref={ref}
    data-scope="menu"
    data-part="arrow-tip"
  />
));
LoongArkMenuArrowTip.displayName = "LoongArkMenuArrowTip";

export const LoongArkMenuItem = forwardRef<HTMLDivElement, ArkMenuItemProps>(
  (props, ref) => (
    <ArkMenu.Item {...props} ref={ref} data-scope="menu" data-part="item" />
  ),
);
LoongArkMenuItem.displayName = "LoongArkMenuItem";

export const LoongArkMenuTriggerItem = forwardRef<
  HTMLDivElement,
  ArkMenuTriggerItemProps
>((props, ref) => (
  <ArkMenu.TriggerItem
    {...props}
    ref={ref}
    data-scope="menu"
    data-part="trigger-item"
  />
));
LoongArkMenuTriggerItem.displayName = "LoongArkMenuTriggerItem";

export const LoongArkMenuCheckboxItem = forwardRef<
  HTMLDivElement,
  ArkMenuCheckboxItemProps
>((props, ref) => (
  <ArkMenu.CheckboxItem
    {...props}
    ref={ref}
    data-scope="menu"
    data-part="item"
  />
));
LoongArkMenuCheckboxItem.displayName = "LoongArkMenuCheckboxItem";

export const LoongArkMenuRadioItem = forwardRef<
  HTMLDivElement,
  ArkMenuRadioItemProps
>((props, ref) => (
  <ArkMenu.RadioItem {...props} ref={ref} data-scope="menu" data-part="item" />
));
LoongArkMenuRadioItem.displayName = "LoongArkMenuRadioItem";

export const LoongArkMenuRadioItemGroup = forwardRef<
  HTMLDivElement,
  ArkMenuRadioItemGroupProps
>((props, ref) => (
  <ArkMenu.RadioItemGroup
    {...props}
    ref={ref}
    data-scope="menu"
    data-part="item-group"
  />
));
LoongArkMenuRadioItemGroup.displayName = "LoongArkMenuRadioItemGroup";

export const LoongArkMenuItemGroup = forwardRef<
  HTMLDivElement,
  ArkMenuItemGroupProps
>((props, ref) => (
  <ArkMenu.ItemGroup
    {...props}
    ref={ref}
    data-scope="menu"
    data-part="item-group"
  />
));
LoongArkMenuItemGroup.displayName = "LoongArkMenuItemGroup";

export const LoongArkMenuItemGroupLabel = forwardRef<
  HTMLDivElement,
  ArkMenuItemGroupLabelProps
>((props, ref) => (
  <ArkMenu.ItemGroupLabel
    {...props}
    ref={ref}
    data-scope="menu"
    data-part="item-group-label"
  />
));
LoongArkMenuItemGroupLabel.displayName = "LoongArkMenuItemGroupLabel";

export const LoongArkMenuItemText = forwardRef<
  HTMLDivElement,
  ArkMenuItemTextProps
>((props, ref) => (
  <ArkMenu.ItemText
    {...props}
    ref={ref}
    data-scope="menu"
    data-part="item-text"
  />
));
LoongArkMenuItemText.displayName = "LoongArkMenuItemText";

export const LoongArkMenuItemIndicator = forwardRef<
  HTMLDivElement,
  ArkMenuItemIndicatorProps
>((props, ref) => (
  <ArkMenu.ItemIndicator
    {...props}
    ref={ref}
    data-scope="menu"
    data-part="item-indicator"
  />
));
LoongArkMenuItemIndicator.displayName = "LoongArkMenuItemIndicator";

export const LoongArkMenuIndicator = forwardRef<
  HTMLDivElement,
  ArkMenuIndicatorProps
>((props, ref) => (
  <ArkMenu.Indicator
    {...props}
    ref={ref}
    data-scope="menu"
    data-part="indicator"
  />
));
LoongArkMenuIndicator.displayName = "LoongArkMenuIndicator";

export const LoongArkMenuSeparator = forwardRef<
  HTMLHRElement,
  ArkMenuSeparatorProps
>((props, ref) => (
  <ArkMenu.Separator
    {...props}
    ref={ref}
    data-scope="menu"
    data-part="separator"
  />
));
LoongArkMenuSeparator.displayName = "LoongArkMenuSeparator";
