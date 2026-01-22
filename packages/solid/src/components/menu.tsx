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

export interface LoongArkMenuRootProps extends Omit<ArkMenuRootProps, "asChild"> {
  size?: MenuSize;
  children?: JSX.Element;
}

export const LoongArkMenuRoot: Component<LoongArkMenuRootProps> = (props) => {
  const merged = mergeProps({ size: "md" as MenuSize }, props);
  return (
    <MenuContext.Provider value={{ size: merged.size }}>
      <ArkMenu.Root
        {...(props as any)}
        data-scope="menu"
        data-part="root"
        data-size={merged.size}
      >
        {props.children}
      </ArkMenu.Root>
    </MenuContext.Provider>
  );
};

export const LoongArkMenuTrigger: Component<
  ArkMenuTriggerProps & { children?: JSX.Element }
> = (props) => {
  const merged = mergeProps({ asChild: true }, props);
  return (
    <ArkMenu.Trigger {...merged} data-scope="menu" data-part="trigger">
      {props.children}
    </ArkMenu.Trigger>
  );
};

export const LoongArkMenuContextTrigger: Component<
  ArkMenuContextTriggerProps & { children?: JSX.Element }
> = (props) => {
  const merged = mergeProps({ asChild: true }, props);
  return (
    <ArkMenu.ContextTrigger
      {...merged}
      data-scope="menu"
      data-part="context-trigger"
    >
      {props.children}
    </ArkMenu.ContextTrigger>
  );
};

export const LoongArkMenuPositioner: Component<
  ArkMenuPositionerProps & { children?: JSX.Element }
> = (props) => (
  <ArkMenu.Positioner {...props} data-scope="menu" data-part="positioner">
    {props.children}
  </ArkMenu.Positioner>
);

export const LoongArkMenuContent: Component<
  ArkMenuContentProps & { children?: JSX.Element }
> = (props) => {
  const { size } = useContext(MenuContext);
  return (
    <ArkMenu.Content
      {...props}
      data-scope="menu"
      data-part="content"
      data-size={size}
    >
      {props.children}
    </ArkMenu.Content>
  );
};

export const LoongArkMenuArrow: Component<ArkMenuArrowProps> = (props) => (
  <ArkMenu.Arrow {...props} data-scope="menu" data-part="arrow" />
);

export const LoongArkMenuArrowTip: Component<ArkMenuArrowTipProps> = (props) => (
  <ArkMenu.ArrowTip {...props} data-scope="menu" data-part="arrow-tip" />
);

export const LoongArkMenuItem: Component<
  ArkMenuItemProps & { children?: JSX.Element }
> = (props) => (
  <ArkMenu.Item {...props} data-scope="menu" data-part="item">
    {props.children}
  </ArkMenu.Item>
);

export const LoongArkMenuTriggerItem: Component<
  ArkMenuTriggerItemProps & { children?: JSX.Element }
> = (props) => (
  <ArkMenu.TriggerItem
    {...props}
    data-scope="menu"
    data-part="trigger-item"
  >
    {props.children}
  </ArkMenu.TriggerItem>
);

export const LoongArkMenuCheckboxItem: Component<
  ArkMenuCheckboxItemProps & { children?: JSX.Element }
> = (props) => (
  <ArkMenu.CheckboxItem {...props} data-scope="menu" data-part="item">
    {props.children}
  </ArkMenu.CheckboxItem>
);

export const LoongArkMenuRadioItem: Component<
  ArkMenuRadioItemProps & { children?: JSX.Element }
> = (props) => (
  <ArkMenu.RadioItem {...props} data-scope="menu" data-part="item">
    {props.children}
  </ArkMenu.RadioItem>
);

export const LoongArkMenuRadioItemGroup: Component<
  ArkMenuRadioItemGroupProps & { children?: JSX.Element }
> = (props) => (
  <ArkMenu.RadioItemGroup
    {...props}
    data-scope="menu"
    data-part="item-group"
  >
    {props.children}
  </ArkMenu.RadioItemGroup>
);

export const LoongArkMenuItemGroup: Component<
  ArkMenuItemGroupProps & { children?: JSX.Element }
> = (props) => (
  <ArkMenu.ItemGroup {...props} data-scope="menu" data-part="item-group">
    {props.children}
  </ArkMenu.ItemGroup>
);

export const LoongArkMenuItemGroupLabel: Component<
  ArkMenuItemGroupLabelProps & { children?: JSX.Element }
> = (props) => (
  <ArkMenu.ItemGroupLabel
    {...props}
    data-scope="menu"
    data-part="item-group-label"
  >
    {props.children}
  </ArkMenu.ItemGroupLabel>
);

export const LoongArkMenuItemText: Component<
  ArkMenuItemTextProps & { children?: JSX.Element }
> = (props) => (
  <ArkMenu.ItemText {...props} data-scope="menu" data-part="item-text">
    {props.children}
  </ArkMenu.ItemText>
);

export const LoongArkMenuItemIndicator: Component<
  ArkMenuItemIndicatorProps & { children?: JSX.Element }
> = (props) => (
  <ArkMenu.ItemIndicator
    {...props}
    data-scope="menu"
    data-part="item-indicator"
  >
    {props.children}
  </ArkMenu.ItemIndicator>
);

export const LoongArkMenuIndicator: Component<
  ArkMenuIndicatorProps & { children?: JSX.Element }
> = (props) => (
  <ArkMenu.Indicator {...props} data-scope="menu" data-part="indicator">
    {props.children}
  </ArkMenu.Indicator>
);

export const LoongArkMenuSeparator: Component<
  ArkMenuSeparatorProps & { children?: JSX.Element }
> = (props) => (
  <ArkMenu.Separator {...props} data-scope="menu" data-part="separator">
    {props.children}
  </ArkMenu.Separator>
);
