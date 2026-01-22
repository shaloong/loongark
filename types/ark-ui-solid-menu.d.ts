declare module "@ark-ui/solid/menu" {
  import type { Component, JSX } from "solid-js";

  export interface MenuRootProps {
    id?: string;
    ids?: any;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (details: { open: boolean }) => void;
    onSelect?: (details: { value: string }) => void;
    highlightedValue?: string | null;
    defaultHighlightedValue?: string | null;
    onHighlightChange?: (details: { highlightedValue: string | null }) => void;
    positioning?: any;
    anchorPoint?: any;
    closeOnSelect?: boolean;
    loopFocus?: boolean;
    typeahead?: boolean;
    composite?: boolean;
    navigate?: (details: any) => void;
    lazyMount?: boolean;
    unmountOnExit?: boolean;
    present?: boolean;
    skipAnimationOnMount?: boolean;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface MenuTriggerProps {
    children?: JSX.Element;
    asChild?: boolean;
    disabled?: boolean;
  }

  export interface MenuContextTriggerProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface MenuPositionerProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface MenuContentProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface MenuArrowProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface MenuArrowTipProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface MenuItemProps {
    value?: string;
    disabled?: boolean;
    closeOnSelect?: boolean;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface MenuTriggerItemProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface MenuCheckboxItemProps {
    value?: string;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    closeOnSelect?: boolean;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface MenuRadioItemProps {
    value?: string;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    closeOnSelect?: boolean;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface MenuRadioItemGroupProps {
    value?: string;
    defaultValue?: string;
    onValueChange?: (details: { value: string }) => void;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface MenuItemGroupProps {
    id?: string;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface MenuItemGroupLabelProps {
    htmlFor?: string;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface MenuItemTextProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface MenuItemIndicatorProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface MenuIndicatorProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface MenuSeparatorProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export namespace Menu {
    export const Root: Component<MenuRootProps>;
    export const Trigger: Component<MenuTriggerProps>;
    export const ContextTrigger: Component<MenuContextTriggerProps>;
    export const Positioner: Component<MenuPositionerProps>;
    export const Content: Component<MenuContentProps>;
    export const Arrow: Component<MenuArrowProps>;
    export const ArrowTip: Component<MenuArrowTipProps>;
    export const Item: Component<MenuItemProps>;
    export const TriggerItem: Component<MenuTriggerItemProps>;
    export const CheckboxItem: Component<MenuCheckboxItemProps>;
    export const RadioItem: Component<MenuRadioItemProps>;
    export const RadioItemGroup: Component<MenuRadioItemGroupProps>;
    export const ItemGroup: Component<MenuItemGroupProps>;
    export const ItemGroupLabel: Component<MenuItemGroupLabelProps>;
    export const ItemText: Component<MenuItemTextProps>;
    export const ItemIndicator: Component<MenuItemIndicatorProps>;
    export const Indicator: Component<MenuIndicatorProps>;
    export const Separator: Component<MenuSeparatorProps>;
  }
}
